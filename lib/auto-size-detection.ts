import type { BirdSizeValue } from "@/lib/assistant-types";

export type AutoSizeDetectionResult = {
  size: BirdSizeValue;
  confidence: "高" | "中" | "低";
  reason: string;
};

const sizeOrder: BirdSizeValue[] = ["small", "small-medium", "medium", "medium-large", "large"];

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

function colorDistance(
  redA: number,
  greenA: number,
  blueA: number,
  redB: number,
  greenB: number,
  blueB: number
) {
  const red = redA - redB;
  const green = greenA - greenB;
  const blue = blueA - blueB;

  return Math.sqrt(red * red + green * green + blue * blue);
}

function estimateForegroundRatio(pixels: Uint8ClampedArray, width: number, height: number) {
  let edgeRed = 0;
  let edgeGreen = 0;
  let edgeBlue = 0;
  let edgeCount = 0;

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const nearEdge = x < width * 0.12 || x > width * 0.88 || y < height * 0.12 || y > height * 0.88;
      if (!nearEdge) continue;

      const index = (y * width + x) * 4;
      if (pixels[index + 3] < 220) continue;

      edgeRed += pixels[index];
      edgeGreen += pixels[index + 1];
      edgeBlue += pixels[index + 2];
      edgeCount += 1;
    }
  }

  if (edgeCount === 0) {
    return { ratio: 0.16, contrast: 0, sampled: 0 };
  }

  const backgroundRed = edgeRed / edgeCount;
  const backgroundGreen = edgeGreen / edgeCount;
  const backgroundBlue = edgeBlue / edgeCount;
  const centerX = width / 2;
  const centerY = height * 0.52;
  const radiusX = width * 0.44;
  const radiusY = height * 0.44;
  let foregroundScore = 0;
  let possibleScore = 0;
  let contrastTotal = 0;
  let sampled = 0;

  for (let y = 0; y < height; y += 3) {
    for (let x = 0; x < width; x += 3) {
      const normalizedX = (x - centerX) / radiusX;
      const normalizedY = (y - centerY) / radiusY;
      const ellipseDistance = normalizedX * normalizedX + normalizedY * normalizedY;
      if (ellipseDistance > 1.1) continue;

      const index = (y * width + x) * 4;
      if (pixels[index + 3] < 220) continue;

      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      const chroma = max - min;
      const lightness = (max + min) / 510;
      const distance = colorDistance(red, green, blue, backgroundRed, backgroundGreen, backgroundBlue);
      const centerWeight = Math.max(0.25, 1 - Math.sqrt(Math.max(0, ellipseDistance)));
      const foreground = distance > 42 || chroma > 34 || lightness < 0.22 || lightness > 0.82;

      possibleScore += centerWeight;
      if (foreground) {
        foregroundScore += centerWeight;
        contrastTotal += distance;
      }
      sampled += 1;
    }
  }

  return {
    ratio: possibleScore > 0 ? foregroundScore / possibleScore : 0,
    contrast: foregroundScore > 0 ? contrastTotal / foregroundScore : 0,
    sampled,
  };
}

function pickSizeFromRatio(ratio: number, imageRatio: number): BirdSizeValue {
  let index = 2;

  if (ratio < 0.12) index = 0;
  else if (ratio < 0.2) index = 1;
  else if (ratio < 0.31) index = 2;
  else if (ratio < 0.45) index = 3;
  else index = 4;

  if (imageRatio > 1.65 && ratio > 0.23) {
    index += 1;
  }

  if (imageRatio < 0.72 && ratio < 0.2) {
    index -= 1;
  }

  return sizeOrder[Math.max(0, Math.min(sizeOrder.length - 1, index))];
}

export async function detectBirdSizeFromImage(file: File): Promise<AutoSizeDetectionResult> {
  const image = await loadImageFromFile(file);
  const canvas = document.createElement("canvas");
  const maxSize = 190;
  const imageRatio = image.width / image.height;

  canvas.width = imageRatio >= 1 ? maxSize : Math.max(1, Math.round(maxSize * imageRatio));
  canvas.height = imageRatio >= 1 ? Math.max(1, Math.round(maxSize / imageRatio)) : maxSize;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    throw new Error("瀏覽器暫時無法分析鳥類大小。");
  }

  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const estimate = estimateForegroundRatio(pixels, canvas.width, canvas.height);
  const size = pickSizeFromRatio(estimate.ratio, imageRatio);
  const confidence: AutoSizeDetectionResult["confidence"] =
    estimate.sampled < 260 || estimate.contrast < 24 || estimate.ratio < 0.08
      ? "低"
      : estimate.contrast > 68 && estimate.ratio >= 0.18 && estimate.ratio <= 0.58
        ? "高"
        : estimate.contrast > 52 && estimate.ratio >= 0.14
        ? "中"
        : "低";

  return {
    size,
    confidence,
    reason:
      confidence === "低"
        ? "賞鳥助手以照片中央鳥體輪廓與前景佔比做初步估計，但這張照片主體可能偏小、背景干擾或對比不足，所以只是低信心建議，請手動確認。"
        : "賞鳥助手以照片中央鳥體輪廓、前景佔比與整體比例做初步估計，已先幫你預設大小；你仍可依現場印象手動修正。",
  };
}
