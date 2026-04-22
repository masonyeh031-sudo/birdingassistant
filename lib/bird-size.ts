import type { BirdSizeOption, BirdSizeValue } from "@/lib/assistant-types";

export const birdSizeOptions: BirdSizeOption[] = [
  {
    value: "small",
    label: "小型鳥",
    description: "體型很小，輕巧。",
    example: "麻雀、綠繡眼",
    silhouetteScale: 0.55,
  },
  {
    value: "small-medium",
    label: "中小型鳥",
    description: "比麻雀大，但仍偏輕巧。",
    example: "白頭翁、紅嘴黑鵯",
    silhouetteScale: 0.88,
  },
  {
    value: "medium",
    label: "中型鳥",
    description: "中等大小，常見輪廓。",
    example: "鴿子、斑鳩、八哥",
    silhouetteScale: 1.18,
  },
  {
    value: "medium-large",
    label: "中大型鳥",
    description: "明顯比鴿子大。",
    example: "烏鴉、喜鵲、夜鷺",
    silhouetteScale: 1.52,
  },
  {
    value: "large",
    label: "大型鳥",
    description: "體型大，輪廓明顯。",
    example: "大冠鷲、蒼鷺、黑鳶",
    silhouetteScale: 1.95,
  },
];

const sizeOrder: BirdSizeValue[] = [
  "small",
  "small-medium",
  "medium",
  "medium-large",
  "large",
];

const birdSizeByName: Record<string, BirdSizeValue> = {
  "白頭翁": "small-medium",
  "綠繡眼": "small",
  "麻雀": "small",
  "紅嘴黑鵯": "small-medium",
  "夜鷺": "medium-large",
  "小白鷺": "medium-large",
  "珠頸斑鳩": "medium",
  "五色鳥": "small-medium",
  "鵲鴝": "small-medium",
  "樹鵲": "medium-large",
  "黑冠麻鷺": "medium-large",
  "白鶺鴒": "small-medium",
  "黃頭鷺": "medium",
  "牛背鷺": "medium",
  "蒼鷺": "large",
  "大白鷺": "large",
  "翠鳥": "small",
  "紅冠水雞": "medium",
  "白腹秧雞": "medium",
  "小彎嘴": "small",
  "灰頭鷦鶯": "small",
  "褐頭鷦鶯": "small",
  "家燕": "small",
  "赤腰燕": "small",
  "洋燕": "small",
  "棕沙燕": "small",
  "大卷尾": "medium-large",
  "斑文鳥": "small",
  "白腰文鳥": "small",
  "紅鳩": "medium",
  "山紅頭": "small-medium",
  "台灣藍鵲": "medium-large",
  "喜鵲": "medium-large",
  "鳳頭蒼鷹": "medium-large",
  "大冠鷲": "large",
  "小環頸鴴": "small",
  "磯鷸": "medium",
  "黃小鷺": "medium",
  "小水鴨": "medium",
  "綠頭鴨": "medium-large",
  "赤腹鶇": "small-medium",
  "白腹鶇": "small-medium",
  "灰椋鳥": "small-medium",
  "八哥": "medium",
  "白尾八哥": "medium",
  "家八哥": "medium",
  "黑翅鳶": "medium-large",
  "黑鳶": "large",
  "黑面琵鷺": "large",
  "冠羽畫眉": "small-medium",
  "白耳畫眉": "small-medium",
  "棕背伯勞": "small-medium",
  "東方環頸鴴": "small",
  "蒙古鴴": "small-medium",
  "鐵嘴鴴": "medium",
  "灰斑鴴": "medium",
  "太平洋金斑鴴": "medium",
  "高蹺鴴": "medium",
  "反嘴鴴": "medium",
  "大杓鷸": "medium-large",
  "中杓鷸": "medium-large",
  "青足鷸": "medium",
  "赤足鷸": "medium",
  "鷹斑鷸": "small-medium",
  "田鷸": "medium",
  "尖尾濱鷸": "small",
  "紅胸濱鷸": "small",
  "寬嘴鷸": "small",
  "三趾濱鷸": "small",
  "翻石鷸": "medium",
  "黑腹濱鷸": "small-medium",
  "黑尾鷸": "medium-large",
  "琵嘴鴨": "medium-large",
  "赤頸鴨": "medium-large",
  "尖尾鴨": "medium-large",
  "白眉鴨": "medium",
  "花嘴鴨": "medium-large",
  "彩鷸": "medium",
  "燕鴴": "medium",
  "小燕鷗": "small",
  "黑枕燕鷗": "medium",
  "栗喉蜂虎": "small-medium",
};

export function getBirdSizeLabel(value?: string) {
  return birdSizeOptions.find((option) => option.value === value)?.label ?? "尚未選擇";
}

export function getBirdSizeExample(value?: string) {
  return birdSizeOptions.find((option) => option.value === value)?.example ?? "";
}

export function getBirdSizeBucket(name: string, matcherTraits: string[] = []): BirdSizeValue {
  const mapped = birdSizeByName[name];
  if (mapped) return mapped;

  if (matcherTraits.includes("waterbird")) return "large";
  if (matcherTraits.includes("small")) return "small";
  if (matcherTraits.includes("medium")) return "medium";
  return "medium";
}

export function getBirdSizeRank(size?: string) {
  return size ? sizeOrder.indexOf(size as BirdSizeValue) : -1;
}

export function getBirdSizeDistance(
  selected?: string,
  candidate?: string
) {
  if (!selected || !candidate) return null;
  const selectedIndex = getBirdSizeRank(selected);
  const candidateIndex = getBirdSizeRank(candidate);
  if (selectedIndex < 0 || candidateIndex < 0) return null;
  return Math.abs(selectedIndex - candidateIndex);
}

export function getBirdSizeScore(
  selected?: string,
  candidate?: string
) {
  const distance = getBirdSizeDistance(selected, candidate);
  if (distance === null) return 0;
  if (distance === 0) return 10;
  if (distance === 1) return 4;
  if (distance === 2) return -4;
  return -10;
}

export function isBirdSizeConflict(
  selected?: string,
  candidate?: string
) {
  const distance = getBirdSizeDistance(selected, candidate);
  return distance !== null && distance >= 2;
}
