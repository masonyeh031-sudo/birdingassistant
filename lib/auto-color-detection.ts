type ColorKey =
  | "black"
  | "white"
  | "gray"
  | "brown"
  | "tan"
  | "yellow"
  | "orange"
  | "red"
  | "blue"
  | "green";

export type AutoColorDetectionResult = {
  colors: ColorKey[];
  confidence: "高" | "中" | "低";
  reason: string;
};

const colorLabels: Record<ColorKey, string> = {
  black: "黑",
  white: "白",
  gray: "灰",
  brown: "褐",
  tan: "棕",
  yellow: "黃",
  orange: "橙",
  red: "紅",
  blue: "藍",
  green: "綠",
};

function rgbToHsl(red: number, green: number, blue: number) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { hue: 0, saturation: 0, lightness };
  }

  const delta = max - min;
  const saturation =
    lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;

  if (max === r) {
    hue = (g - b) / delta + (g < b ? 6 : 0);
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }

  return { hue: hue * 60, saturation, lightness };
}

function classifyPixel(red: number, green: number, blue: number): ColorKey | null {
  const { hue, saturation, lightness } = rgbToHsl(red, green, blue);

  if (lightness < 0.14) return "black";
  if (lightness > 0.84 && saturation < 0.24) return "white";
  if (saturation < 0.16) return "gray";
  if (hue >= 345 || hue < 10) return "red";
  if (hue >= 10 && hue < 28) return lightness > 0.48 ? "orange" : "brown";
  if (hue >= 28 && hue < 46) return lightness > 0.5 ? "tan" : "brown";
  if (hue >= 46 && hue < 72) return saturation > 0.42 ? "yellow" : "tan";
  if (hue >= 72 && hue < 170) return "green";
  if (hue >= 185 && hue < 260) return "blue";
  if (hue >= 260 && hue < 345) return saturation > 0.35 ? "blue" : "gray";

  return null;
}

function loadImageFromFile(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("無法讀取照片。"));
    };
    image.src = objectUrl;
  });
}

export async function detectBirdBodyColors(file: File): Promise<AutoColorDetectionResult> {
  const image = await loadImageFromFile(file);
  const canvas = document.createElement("canvas");
  const size = 180;
  const ratio = image.width / image.height;

  canvas.width = ratio >= 1 ? size : Math.max(1, Math.round(size * ratio));
  canvas.height = ratio >= 1 ? Math.max(1, Math.round(size / ratio)) : size;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("瀏覽器暫時無法分析照片顏色。");
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const centerX = canvas.width / 2;
  const centerY = canvas.height * 0.52;
  const radiusX = canvas.width * 0.44;
  const radiusY = canvas.height * 0.44;
  const scores: Partial<Record<ColorKey, number>> = {};
  const edgeScores: Partial<Record<ColorKey, number>> = {};
  let totalScore = 0;
  let sampled = 0;

  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) {
      const index = (y * canvas.width + x) * 4;
      const alpha = pixels[index + 3];
      if (alpha < 220) continue;

      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const { saturation, lightness } = rgbToHsl(red, green, blue);

      if (lightness > 0.96 || lightness < 0.04) continue;

      const color = classifyPixel(red, green, blue);
      if (!color) continue;

      const normalizedX = (x - centerX) / radiusX;
      const normalizedY = (y - centerY) / radiusY;
      const distance = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
      const centerWeight = Math.max(0, 1 - distance);
      const saturationWeight = 0.65 + Math.min(0.55, saturation);
      const weight = centerWeight > 0 ? centerWeight * saturationWeight : 0.08;

      if (centerWeight > 0) {
        scores[color] = (scores[color] ?? 0) + weight;
        totalScore += weight;
        sampled += 1;
      } else {
        edgeScores[color] = (edgeScores[color] ?? 0) + weight;
      }
    }
  }

  if (sampled < 80 || totalScore <= 0) {
    return {
      colors: [],
      confidence: "低",
      reason: "照片主體太小、過暗或可取樣區域不足，系統沒有自動勾選太多顏色，請手動確認。",
    };
  }

  const ranked = Object.entries(scores)
    .map(([color, score]) => {
      const edgeScore = edgeScores[color as ColorKey] ?? 0;
      const edgePenalty = edgeScore > score * 1.8 ? 0.52 : 1;
      return {
        color: color as ColorKey,
        score: score * edgePenalty,
        rawScore: score,
      };
    })
    .sort((a, b) => b.score - a.score);

  const topScore = ranked[0]?.score ?? 0;
  const selected = ranked
    .filter((item) => item.score >= Math.max(topScore * 0.34, totalScore * 0.045))
    .slice(0, topScore / totalScore > 0.34 ? 3 : 2)
    .map((item) => item.color);

  const colors = Array.from(new Set(selected));
  const dominance = topScore / totalScore;
  const confidence: AutoColorDetectionResult["confidence"] =
    colors.length === 0 || dominance < 0.12 ? "低" : dominance > 0.26 ? "高" : "中";

  if (confidence === "低") {
    return {
      colors: colors.slice(0, 1),
      confidence,
      reason:
        "鳥體可見顏色比例不夠集中，系統只保守建議少量主色，請以手動確認後的色塊為準。",
    };
  }

  return {
    colors,
    confidence,
    reason: `系統以照片中央偏前景區域估算鳥體主色，優先排除邊緣背景干擾，預設 ${colors.map((color) => colorLabels[color]).join("、")}。`,
  };
}
