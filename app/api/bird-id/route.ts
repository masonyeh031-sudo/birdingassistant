import { NextResponse } from "next/server";

import {
  getBirdSizeBucket,
  getBirdSizeDistance,
  getBirdSizeLabel,
  getBirdSizeScore,
} from "@/lib/bird-size";
import { birdCards } from "@/lib/home-data";

type BirdIdRequest = {
  imageDataUrl?: string;
  habitat?: string;
  environmentKey?: string;
  selectedEnvironment?: string;
  environmentLabel?: string;
  observationSpot?: string;
  size?: string;
  autoDetectedSize?: string;
  autoDetectedSizeConfidence?: string;
  autoDetectedSizeReason?: string;
  userSelectedSize?: string;
  finalSelectedSize?: string;
  photoFocus?: string;
  traits?: string[];
  autoDetectedColors?: string[];
  userAdjustedColors?: string[];
  finalSelectedColors?: string[];
  colorDetectionConfidence?: string;
  colorDetectionReason?: string;
  location?: string;
  habitatDescription?: string;
  notes?: string;
};

type Confidence = "高" | "中" | "低";

type Candidate = {
  name: string;
  confidence: Confidence;
  reason: string;
};

type VisionAnalysis = {
  summary: string;
  likelyGroup: string;
  uncertaintyFactors: string[];
  initialCandidates: Candidate[];
  rerankSummary: string;
  eliminatedCandidates: Array<{
    name: string;
    reason: string;
  }>;
  photoClues: string[];
  photoQuality: "clear" | "limited";
  photoIssues: string[];
  bestFocusArea: string;
  photoHelp: string;
  detectedHabitat: "urban" | "park" | "water" | "forest-edge" | "unknown";
  detectedSize: "small" | "small-medium" | "medium" | "medium-large" | "large" | "unknown";
  detectedTraits: string[];
  candidates: Candidate[];
};

function lowerConfidence(confidence: Confidence): Confidence {
  if (confidence === "高") return "中";
  if (confidence === "中") return "低";
  return "低";
}

const traitLabelMap: Record<string, string> = {
  black: "黑色",
  green: "偏綠色",
  brown: "偏褐色",
  tan: "棕色",
  white: "白色很明顯",
  gray: "灰色區塊",
  dark: "黑灰色明顯",
  yellow: "有黃色區塊",
  orange: "有橘黃或栗色",
  red: "有紅色或栗紅色",
  blue: "有藍色區塊",
  "eye-ring": "有白色眼圈",
  "head-pattern": "頭部花紋明顯",
  "white-cheek": "臉頰偏白",
  crest: "有冠羽或頭頂特別突起",
  "thick-bill": "嘴喙粗厚",
  "long-bill": "嘴喙細長",
  "long-neck": "脖子明顯偏長",
  "long-leg": "腿很長",
  waterbird: "水鳥輪廓",
  swallow: "燕科飛行輪廓",
  "swallow-summer": "燕科夏候鳥",
  "taiwan-endemic": "台灣特有種",
  "taiwan-endemic-subspecies": "台灣特有亞種",
  shorebird: "鴴鷸或濱鳥輪廓",
  plover: "鴴科小型濱鳥輪廓",
  sandpiper: "鷸科濱鳥輪廓",
  "winter-migrant": "冬候鳥常見族群",
  "summer-migrant": "夏候鳥常見族群",
  "tail-up": "尾巴常翹起",
  "ground-walking": "常在地上走動",
  "perch-open": "喜歡停在明顯高處",
  flock: "常成群出現",
  "near-water": "總是在水邊附近",
  small: "麻雀大小",
  "small-medium": "白頭翁 / 紅嘴黑鵯大小",
  medium: "鴿子 / 斑鳩 / 八哥大小",
  "medium-large": "烏鴉 / 喜鵲 / 夜鷺大小",
  large: "大冠鷲 / 蒼鷺 / 黑鳶大小",
  urban: "生活圈綠地",
  park: "樹叢公園",
  water: "水邊濕地",
  "forest-edge": "林緣步道",
};

const relatedTraitsMap: Record<string, string[]> = {
  yellow: ["green", "white"],
  orange: ["brown", "white"],
  blue: ["dark"],
  "white-cheek": ["white", "head-pattern"],
  crest: ["head-pattern"],
  "long-bill": ["waterbird"],
  "long-neck": ["waterbird"],
  "long-leg": ["waterbird"],
  "ground-walking": ["brown", "waterbird"],
  "perch-open": ["tail-up", "dark"],
  flock: ["small", "brown"],
  "near-water": ["waterbird", "white"],
};

const contradictoryTraitsMap: Record<string, string[]> = {
  green: ["white", "dark"],
  white: ["green", "orange"],
  blue: ["green", "orange"],
  "eye-ring": ["long-neck", "long-leg"],
  "white-cheek": ["long-neck", "long-leg"],
  crest: ["long-neck", "long-leg"],
  "thick-bill": ["long-bill"],
  "long-bill": ["thick-bill", "eye-ring"],
  "long-neck": ["eye-ring", "tail-up"],
  "long-leg": ["eye-ring", "tail-up"],
  "tail-up": ["long-neck", "long-leg", "near-water"],
  "ground-walking": ["perch-open"],
  "perch-open": ["ground-walking", "near-water"],
  flock: ["perch-open"],
  "near-water": ["tail-up", "perch-open"],
};

const traitEnum = [
  "green",
  "brown",
  "white",
  "dark",
  "yellow",
  "orange",
  "blue",
  "eye-ring",
  "head-pattern",
  "white-cheek",
  "crest",
  "thick-bill",
  "long-bill",
  "long-neck",
  "long-leg",
  "waterbird",
  "swallow",
  "swallow-summer",
  "shorebird",
  "plover",
  "sandpiper",
  "winter-migrant",
  "summer-migrant",
  "tail-up",
  "ground-walking",
  "perch-open",
  "flock",
  "near-water",
] as const;

const habitatEnum = ["urban", "park", "water", "forest-edge", "unknown"] as const;
const sizeEnum = ["small", "small-medium", "medium", "medium-large", "large", "unknown"] as const;

const colorTraitAliases: Record<string, string[]> = {
  black: ["dark"],
  white: ["white"],
  gray: ["dark", "white"],
  brown: ["brown"],
  tan: ["brown", "orange"],
  yellow: ["yellow", "green"],
  orange: ["orange"],
  red: ["orange", "brown"],
  blue: ["blue"],
  green: ["green"],
};

function colorListLabel(values?: string[]) {
  if (!values || values.length === 0) return "無";
  return values.map((trait) => labelForValue(trait)).join("、");
}

const genericGroupNames = [
  "某種猛禽",
  "某種水鳥",
  "某種鷺科",
  "某種鷸鴴",
  "某種鳩鴿類",
  "某種鴉科",
  "某種啄木鳥",
  "某種繡眼或小型樹棲鳥",
  "某種鶯鶲或小型雀形目",
  "某種八哥椋鳥",
  "某種秧雞或水雞類",
] as const;

const exactEnvironmentRules: Record<
  string,
  {
    label: string;
    habitats: string[];
    supportTraits: string[];
    conflictHabitats: string[];
    conflictTraits: string[];
  }
> = {
  urban: {
    label: "都市",
    habitats: ["urban"],
    supportTraits: ["perch-open", "ground-walking", "flock"],
    conflictHabitats: ["water", "forest-edge"],
    conflictTraits: ["waterbird", "shorebird", "long-leg", "long-neck"],
  },
  park: {
    label: "公園",
    habitats: ["park", "urban"],
    supportTraits: ["perch-open", "ground-walking", "flock"],
    conflictHabitats: [],
    conflictTraits: [],
  },
  mountain: {
    label: "山區",
    habitats: ["forest-edge"],
    supportTraits: ["perch-open", "tail-up", "head-pattern"],
    conflictHabitats: ["urban", "water"],
    conflictTraits: ["waterbird", "shorebird", "near-water"],
  },
  grassland: {
    label: "草地",
    habitats: ["park", "forest-edge"],
    supportTraits: ["ground-walking", "flock", "perch-open"],
    conflictHabitats: [],
    conflictTraits: [],
  },
  shrubland: {
    label: "灌叢",
    habitats: ["forest-edge", "park"],
    supportTraits: ["tail-up", "head-pattern", "ground-walking"],
    conflictHabitats: ["water"],
    conflictTraits: ["shorebird", "long-neck"],
  },
  farmland: {
    label: "農田",
    habitats: ["park", "water", "forest-edge"],
    supportTraits: ["ground-walking", "flock", "waterbird"],
    conflictHabitats: [],
    conflictTraits: [],
  },
  pond_lake: {
    label: "池塘 / 湖泊",
    habitats: ["water", "park"],
    supportTraits: ["waterbird", "near-water", "long-leg"],
    conflictHabitats: ["forest-edge"],
    conflictTraits: [],
  },
  river_stream: {
    label: "河川 / 溪流",
    habitats: ["water"],
    supportTraits: ["waterbird", "near-water", "long-bill", "long-leg"],
    conflictHabitats: ["urban"],
    conflictTraits: [],
  },
  estuary_mudflat: {
    label: "河口 / 灘地",
    habitats: ["water"],
    supportTraits: ["waterbird", "shorebird", "winter-migrant", "long-leg", "long-bill"],
    conflictHabitats: ["urban", "forest-edge"],
    conflictTraits: [],
  },
  coast: {
    label: "海岸",
    habitats: ["water"],
    supportTraits: ["waterbird", "shorebird", "long-leg", "long-bill"],
    conflictHabitats: ["urban", "forest-edge"],
    conflictTraits: [],
  },
  ocean: {
    label: "海洋",
    habitats: ["water"],
    supportTraits: ["waterbird", "shorebird", "long-bill"],
    conflictHabitats: ["urban", "forest-edge"],
    conflictTraits: ["tail-up", "eye-ring"],
  },
  "urban-park": {
    label: "都市公園",
    habitats: ["park", "urban"],
    supportTraits: ["perch-open", "ground-walking"],
    conflictHabitats: [],
    conflictTraits: [],
  },
  campus: {
    label: "校園",
    habitats: ["urban", "park"],
    supportTraits: ["perch-open", "ground-walking"],
    conflictHabitats: [],
    conflictTraits: [],
  },
  residential: {
    label: "住宅區 / 都市",
    habitats: ["urban", "park"],
    supportTraits: ["perch-open", "ground-walking"],
    conflictHabitats: ["water"],
    conflictTraits: ["waterbird", "long-leg", "long-neck"],
  },
  forest: {
    label: "森林",
    habitats: ["forest-edge"],
    supportTraits: ["perch-open", "tail-up", "head-pattern"],
    conflictHabitats: ["urban", "water"],
    conflictTraits: ["waterbird", "near-water"],
  },
  "mountain-trail": {
    label: "山區步道",
    habitats: ["forest-edge"],
    supportTraits: ["perch-open", "tail-up", "head-pattern"],
    conflictHabitats: ["urban", "water"],
    conflictTraits: ["waterbird", "near-water"],
  },
  wetland: {
    label: "濕地",
    habitats: ["water"],
    supportTraits: ["waterbird", "near-water", "long-leg", "long-bill"],
    conflictHabitats: ["urban"],
    conflictTraits: [],
  },
  "pond-lake": {
    label: "池塘 / 湖泊",
    habitats: ["water", "park"],
    supportTraits: ["waterbird", "near-water"],
    conflictHabitats: [],
    conflictTraits: [],
  },
  "river-stream": {
    label: "河川 / 溪流",
    habitats: ["water"],
    supportTraits: ["waterbird", "near-water", "long-bill"],
    conflictHabitats: ["urban"],
    conflictTraits: [],
  },
  "farmland-grassland": {
    label: "農田 / 草地",
    habitats: ["park", "water", "forest-edge"],
    supportTraits: ["ground-walking", "waterbird", "flock"],
    conflictHabitats: [],
    conflictTraits: [],
  },
  seaside: {
    label: "海邊",
    habitats: ["water"],
    supportTraits: ["waterbird", "shorebird", "long-leg", "long-bill"],
    conflictHabitats: ["urban", "forest-edge"],
    conflictTraits: [],
  },
  "estuary-flat": {
    label: "河口 / 灘地",
    habitats: ["water"],
    supportTraits: ["waterbird", "shorebird", "winter-migrant", "long-leg", "long-bill"],
    conflictHabitats: ["urban", "forest-edge"],
    conflictTraits: [],
  },
};

function labelForValue(value: string) {
  return traitLabelMap[value] ?? value;
}

function normalizeUserTraits(traits?: string[]) {
  return Array.from(
    new Set(
      (traits ?? []).flatMap((trait) => colorTraitAliases[trait] ?? [trait])
    )
  );
}

function normalizeFocusTraits(photoFocus?: string) {
  switch (photoFocus) {
    case "head":
      return ["head-pattern", "eye-ring"];
    case "bill":
      return ["thick-bill", "long-bill"];
    case "legs":
      return ["long-leg", "long-neck"];
    case "body":
      return ["perch-open"];
    default:
      return [];
  }
}

function normalizeObservationTraits(observationSpot?: string) {
  switch (observationSpot) {
    case "ground":
      return ["ground-walking"];
    case "tree":
    case "wire":
    case "flight":
      return ["perch-open"];
    case "water":
      return ["near-water", "long-leg"];
    default:
      return [];
  }
}

function toConfidence(score: number): Confidence {
  if (score >= 17) return "高";
  if (score >= 10) return "中";
  return "低";
}

function buildFallbackResult(body: BirdIdRequest, engineNote?: string) {
  const selectedTraits = Array.from(
    new Set([
      ...normalizeUserTraits(body.traits).slice(0, 4),
      ...normalizeFocusTraits(body.photoFocus),
      ...normalizeObservationTraits(body.observationSpot),
    ])
  );

  const ranked = birdCards
    .map((bird) => {
      let score = 0;
      const reasons: string[] = [];
      const candidateSize = getBirdSizeBucket(bird.name, bird.matcherTraits);
      const environmentScore = scoreEnvironmentMatch(body, bird);

      score += environmentScore.score;
      reasons.push(...environmentScore.reasons);

      if (body.size) {
        const { score: sizeScore, reason } = scoreSizeMatch(body.size, candidateSize);
        score += sizeScore;
        if (reason) {
          reasons.push(reason);
        }
      }

      selectedTraits.forEach((trait) => {
        if (bird.matcherTraits.includes(trait)) {
          score += 3;
          reasons.push(`符合${labelForValue(trait)}`);
          return;
        }

        const related = relatedTraitsMap[trait] ?? [];
        const contradictory = contradictoryTraitsMap[trait] ?? [];

        if (related.some((item) => bird.matcherTraits.includes(item))) {
          score += 1;
          return;
        }

        if (contradictory.some((item) => bird.matcherTraits.includes(item))) {
          score -= 3;
        }
      });

      return {
        bird,
        score,
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > -8)
    .slice(0, 5);

  const rankedCandidates: Candidate[] = ranked.map((item) => ({
    name: item.bird.name,
    confidence: toConfidence(item.score),
    reason:
      item.reasons.length > 0
        ? `目前先依你選的環境、體型與特徵做條件比對，${item.reasons.slice(0, 3).join("、")}。`
        : "目前先用保守條件比對放進候選，建議再用照片回頭確認頭部、嘴型與站姿。",
  }));
  const candidates = rankedCandidates.slice(0, 3);

  const focusText =
    body.photoFocus === "head"
      ? "頭部花紋、眼圈或臉頰對比"
      : body.photoFocus === "bill"
        ? "嘴型粗細與嘴長比例"
        : body.photoFocus === "legs"
          ? "腿長、脖子與站姿"
          : "全身比例、尾巴與停棲姿態";

  const first = candidates[0];
  const second = candidates[1];

  return {
    mode: "fallback",
    engineNote:
      engineNote ?? "目前未設定 OPENAI_API_KEY，已自動改用站內輔助辨識模式。",
    likelyGroup:
      first?.name.includes("鷺") ? "鷺鷥 / 鷺科" : first?.name.includes("鳩") ? "鳩鴿類" : undefined,
    uncertaintyFactors: ["目前沒有啟用影像模型，所以這次只能先用條件做保守排序。"],
    initialCandidates: rankedCandidates.slice(0, 5),
    rerankSummary: "目前沒有啟用影像模型，所以這次無法真的根據照片初判後再重排，只能先以條件比對做保守排序。",
    eliminatedCandidates: rankedCandidates.slice(3, 5).map((candidate) => ({
      name: candidate.name,
      reason: "加入環境與特徵條件後，這個候選相較前 3 名的整體吻合度較低。",
    })),
    summary: first
      ? `目前先用站內條件比對輔助判斷，最接近的是 ${first.name}。這份結果適合當第一輪方向，建議再回頭對照照片細節。`
      : "目前可用線索還不夠，我先保守保留，建議再補一兩個關鍵特徵或換更清楚的照片。",
    photoClues:
      selectedTraits.length > 0
        ? selectedTraits.slice(0, 4).map((trait) => `已納入「${labelForValue(trait)}」這類條件線索`)
        : ["目前主要依環境與體型做第一輪縮小", "建議再補一到兩個明顯特徵", "照片可用來人工回看頭部與站姿"],
    photoQuality: "limited",
    photoIssues: ["角度不足"],
    bestFocusArea: `這張照片目前最適合回頭確認 ${focusText}。`,
    photoHelp:
      "因為這個環境尚未啟用雲端影像模型，所以我先改用你填的條件做輔助辨識；若照片主體太小、模糊或角度不足，請優先補拍，不要只靠這次結果決定答案。",
    comparisonReason:
      first && second
        ? `${first.name} 目前排在 ${second.name} 前面，主要是因為它對上更多環境、體型或特徵條件；不過仍建議再看照片中的頭部與嘴型差異。`
        : "目前候選差距還不大，建議先看照片裡最清楚的部位，再和常見鳥類卡片交叉確認。",
    candidates,
  };
}

function cleanModelCandidates(rawCandidates: Candidate[], limit = 3) {
  const allowed = new Set([...birdCards.map((bird) => bird.name), ...genericGroupNames]);

  return rawCandidates.filter((candidate) => allowed.has(candidate.name)).slice(0, limit);
}

function buildBirdCatalog() {
  return birdCards
    .map(
      (bird) =>
        `${bird.name}｜棲地:${bird.habitat}｜簡介:${bird.summary}｜辨識重點:${bird.clue}｜體型提示:${bird.size}｜行為:${bird.behavior}｜內部標記:${bird.matcherTraits.join(",")}｜常見環境:${bird.matcherHabitats.join(",")}`
    )
    .join("\n");
}

function hasHabitatFamilyOverlap(
  candidateHabitats: string[],
  targetHabitat: string
) {
  const habitatFamilies: Record<string, string[]> = {
    urban: ["urban", "park"],
    park: ["park", "urban"],
    water: ["water"],
    "forest-edge": ["forest-edge"],
  };

  const allowed = habitatFamilies[targetHabitat] ?? [targetHabitat];
  return candidateHabitats.some((habitat) => allowed.includes(habitat));
}

function scoreEnvironmentMatch(
  body: BirdIdRequest,
  bird: (typeof birdCards)[number]
) {
  const reasons: string[] = [];
  const selectedEnvironment = body.selectedEnvironment || body.environmentKey;
  const rule = selectedEnvironment ? exactEnvironmentRules[selectedEnvironment] : undefined;

  if (rule) {
    let score = 0;
    const habitatMatched = rule.habitats.some((habitat) =>
      bird.matcherHabitats.includes(habitat)
    );
    const supportTraits = rule.supportTraits.filter((trait) =>
      bird.matcherTraits.includes(trait)
    );
    const habitatConflict = rule.conflictHabitats.some((habitat) =>
      bird.matcherHabitats.includes(habitat)
    );
    const traitConflict = rule.conflictTraits.some((trait) =>
      bird.matcherTraits.includes(trait)
    );

    if (habitatMatched) {
      score += 10;
      reasons.push(`環境「${rule.label}」和此鳥常見棲地相符`);
    } else {
      score -= 14;
      reasons.push(`環境「${rule.label}」和此鳥常見棲地不吻合`);
    }

    if (supportTraits.length > 0) {
      score += 5;
      reasons.push(`環境線索支持「${supportTraits.slice(0, 2).map(labelForValue).join("、")}」`);
    }

    if (habitatConflict || traitConflict) {
      score -= 12;
      reasons.push(`和「${rule.label}」常見鳥類條件有明顯衝突`);
    }

    return { score, reasons };
  }

  if (!body.habitat) {
    return { score: 0, reasons };
  }

  if (bird.matcherHabitats.includes(body.habitat)) {
    return {
      score: 5,
      reasons: ["出現環境相符"],
    };
  }

  if (!hasHabitatFamilyOverlap(bird.matcherHabitats, body.habitat)) {
    return {
      score: -9,
      reasons: ["和使用者提供的環境 / 棲地明顯衝突"],
    };
  }

  return { score: 0, reasons };
}

function scoreSizeMatch(selectedSize: string | undefined, candidateSize: string) {
  if (!selectedSize) {
    return { score: 0, distance: null, reason: "" };
  }

  const distance = getBirdSizeDistance(selectedSize, candidateSize);
  const baseScore = getBirdSizeScore(selectedSize, candidateSize);

  if (distance === null) {
    return { score: 0, distance, reason: "" };
  }

  if (distance === 0) {
    return {
      score: baseScore,
      distance,
      reason: `體型比例接近「${getBirdSizeLabel(selectedSize)}」`,
    };
  }

  if (distance === 1) {
    return {
      score: baseScore,
      distance,
      reason: `體型和「${getBirdSizeLabel(selectedSize)}」相近但仍需照片確認`,
    };
  }

  return {
    score: baseScore - 12,
    distance,
    reason: `和使用者提供的「${getBirdSizeLabel(selectedSize)}」明顯衝突，必須降權`,
  };
}

function observationConflictPenalty(observationSpot: string | undefined, birdTraits: string[]) {
  if (!observationSpot) return 0;

  if (observationSpot === "water" && !birdTraits.includes("near-water") && !birdTraits.includes("long-leg")) {
    return -8;
  }

  if (observationSpot === "ground" && birdTraits.includes("perch-open") && !birdTraits.includes("ground-walking")) {
    return -5;
  }

  if ((observationSpot === "tree" || observationSpot === "wire") && birdTraits.includes("ground-walking") && !birdTraits.includes("perch-open")) {
    return -4;
  }

  return 0;
}

function rerankWithVision(body: BirdIdRequest, vision: VisionAnalysis) {
  const directCandidates = cleanModelCandidates(vision.candidates);
  const directCandidateMap = new Map(directCandidates.map((candidate) => [candidate.name, candidate]));
  const limitedPhoto = vision.photoQuality === "limited" || vision.photoIssues.length > 0;
  const userTraits = Array.from(
    new Set([
      ...normalizeUserTraits(body.traits).slice(0, 4),
      ...normalizeObservationTraits(body.observationSpot),
      ...normalizeFocusTraits(body.photoFocus),
    ])
  );
  const visionTraits = Array.from(new Set(vision.detectedTraits.filter((trait) => traitEnum.includes(trait as never))));

  const ranked = birdCards
    .map((bird) => {
      let score = 0;
      const reasons: string[] = [];
      const direct = directCandidateMap.get(bird.name);
      const candidateSize = getBirdSizeBucket(bird.name, bird.matcherTraits);

      if (direct) {
        score += direct.confidence === "高" ? 12 : direct.confidence === "中" ? 8 : 5;
        reasons.push(`影像模型先把 ${bird.name} 放進候選`);
      }

      if (vision.detectedHabitat !== "unknown") {
        if (bird.matcherHabitats.includes(vision.detectedHabitat)) {
          score += 6;
          reasons.push(`照片環境像「${labelForValue(vision.detectedHabitat)}」`);
        } else {
          score -= 4;
        }
      }

      const environmentScore = scoreEnvironmentMatch(body, bird);
      score += environmentScore.score;
      reasons.push(...environmentScore.reasons);

      if (vision.detectedSize && vision.detectedSize !== "unknown") {
        const visionSizeScore = getBirdSizeScore(vision.detectedSize, candidateSize);
        score += visionSizeScore;
        if (visionSizeScore > 0) {
          reasons.push(`照片中的體型接近「${labelForValue(vision.detectedSize)}」`);
        } else if (visionSizeScore < 0) {
          reasons.push("照片輪廓推測的大小和這個候選不合");
        }
      }

      if (body.size) {
        const { score: bodySizeScore, reason: bodySizeReason } = scoreSizeMatch(body.size, candidateSize);
        score += bodySizeScore;
        if (bodySizeReason) {
          reasons.push(bodySizeReason);
        }
      }

      visionTraits.forEach((trait) => {
        if (bird.matcherTraits.includes(trait)) {
          score += 4;
          reasons.push(`照片看得到「${labelForValue(trait)}」`);
          return;
        }

        const related = relatedTraitsMap[trait] ?? [];
        const contradictory = contradictoryTraitsMap[trait] ?? [];

        if (related.some((item) => bird.matcherTraits.includes(item))) {
          score += 1;
          return;
        }

        if (contradictory.some((item) => bird.matcherTraits.includes(item))) {
          score -= 4;
        }
      });

      userTraits.forEach((trait) => {
        if (bird.matcherTraits.includes(trait)) {
          score += 2;
          reasons.push(`使用者條件也支持「${labelForValue(trait)}」`);
          return;
        }

        const related = relatedTraitsMap[trait] ?? [];
        const contradictory = contradictoryTraitsMap[trait] ?? [];

        if (related.some((item) => bird.matcherTraits.includes(item))) {
          score += 1;
          return;
        }

        if (contradictory.some((item) => bird.matcherTraits.includes(item))) {
          score -= 2;
        }
      });

      const observationPenalty = observationConflictPenalty(body.observationSpot, bird.matcherTraits);
      if (observationPenalty < 0) {
        score += observationPenalty;
        reasons.push("和使用者提供的停棲位置 / 行為線索衝突");
      }

      return {
        bird,
        score,
        direct,
        reasons: Array.from(new Set(reasons)),
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const candidates: Candidate[] = ranked.map((item) => {
    const baseConfidence = item.direct?.confidence ?? toConfidence(item.score);
    const confidence = limitedPhoto ? lowerConfidence(baseConfidence) : baseConfidence;
    const detailReason = item.direct
      ? `${item.direct.reason} 再和站內鳥種資料交叉比對後，${item.reasons.slice(0, 2).join("、")}。`
      : `我先根據照片線索與站內資料交叉比對，${item.reasons.slice(0, 3).join("、")}。`;

    return {
      name: item.bird.name,
      confidence,
      reason: limitedPhoto
        ? `${detailReason} 但這張照片有${vision.photoIssues.join("、")}等限制，所以信心已主動下修。`
        : detailReason,
    };
  });

  const first = candidates[0];
  const second = candidates[1];
  const finalNames = new Set(candidates.map((candidate) => candidate.name));
  const backendEliminated = cleanModelCandidates(vision.initialCandidates, 5)
    .filter((candidate) => !finalNames.has(candidate.name))
    .map((candidate) => {
      const bird = birdCards.find((item) => item.name === candidate.name);
      const candidateSize = bird ? getBirdSizeBucket(bird.name, bird.matcherTraits) : undefined;
      const sizeDistance = body.size && candidateSize ? getBirdSizeDistance(body.size, candidateSize) : null;
      const environmentScore = bird ? scoreEnvironmentMatch(body, bird) : { score: 0, reasons: [] };

      return {
        name: candidate.name,
        reason:
          sizeDistance !== null && sizeDistance >= 2
            ? `加入使用者選擇的「${getBirdSizeLabel(body.size)}」後，${candidate.name} 的體型級距差距太大，因此被降權。`
            : environmentScore.score < 0
              ? environmentScore.reasons.join("、")
              : "加入環境、大小與顏色色塊重排後，整體吻合度低於前 3 名。",
      };
    });

  return {
    mode: "api",
    engineNote: limitedPhoto
      ? `已使用影像模型先抽出照片線索，再和站內鳥種資料交叉比對；但這張照片有${vision.photoIssues.join("、")}等限制，所以這次結果會保守很多。`
      : "已使用影像模型先抽出照片線索，再和站內鳥種資料交叉比對，會比單純看你手動勾選的條件更嚴格。",
    summary: limitedPhoto
      ? `${vision.summary} 不過這張照片目前有 ${vision.photoIssues.join("、")} 的問題，所以我會優先建議補拍，再把這份結果當成保守候選清單。`
      : vision.summary,
    likelyGroup: vision.likelyGroup,
    uncertaintyFactors: vision.uncertaintyFactors,
    initialCandidates: cleanModelCandidates(vision.initialCandidates, 5),
    rerankSummary: vision.rerankSummary,
    eliminatedCandidates:
      backendEliminated.length > 0 ? backendEliminated : vision.eliminatedCandidates,
    photoClues: Array.from(
      new Set([
        ...vision.photoClues,
        ...visionTraits.slice(0, 3).map((trait) => `照片特徵：${labelForValue(trait)}`),
      ])
    ).slice(0, 6),
    photoQuality: vision.photoQuality,
    photoIssues: vision.photoIssues,
    bestFocusArea: vision.bestFocusArea,
    photoHelp: limitedPhoto
      ? `這次照片因為 ${vision.photoIssues.join("、")} ，建議優先補拍更清楚的全身或側面照，再回來比對。`
      : vision.photoHelp,
    comparisonReason:
      first && second
        ? limitedPhoto
          ? `${first.name} 和 ${second.name} 目前都只能算保守候選，因為照片限制讓可用特徵不足。建議先補拍，再優先比對頭部花紋、嘴型和整體比例。`
          : `${first.name} 目前排在 ${second.name} 前面，因為它更符合照片裡實際看到的外觀與站姿線索；若還想再確認，建議優先比對兩者的頭部花紋、嘴型和整體比例。`
        : limitedPhoto
          ? "這張照片目前可用特徵不足，建議先補拍正面、側面或更接近主體的照片，再重新分析。"
          : vision.summary,
    candidates,
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const body = (await request.json()) as BirdIdRequest;

  if (!body.imageDataUrl) {
    return NextResponse.json({ error: "缺少照片資料。" }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json(
      buildFallbackResult(
        body,
        "目前未設定 OPENAI_API_KEY，已自動改用站內輔助辨識模式。"
      )
    );
  }

  const birdCatalog = buildBirdCatalog();

  const prompt = `
你是一個專業的台灣鳥類照片辨識助手。你的任務不是一次就武斷猜出唯一鳥種，而是依照「先照片初判，再依使用者條件逐步修正」的流程，提高鳥類辨識正確率。

請只從下列固定鳥種資料與可接受的保守類群名稱中挑選候選，不要發明新的鳥名，也不要優先猜測國外稀有種：
${birdCatalog}
可接受的保守類群名稱：${genericGroupNames.join("、")}

【核心辨識流程】
你必須分兩個階段進行辨識：

第一階段：照片初步辨識
- 先根據照片本身判斷，不要一開始就被使用者條件綁死。
- 先從照片中提取可見特徵：體型大小、嘴型、腿長、尾巴長短、翅膀型態、頭部花紋、是否有眼圈 / 眉斑 / 冠羽、主色分布、停棲姿態、最可能類群。
- 先給出 Top 5 候選鳥種，不可只給 1 個答案。
- 每個候選都要指出為什麼符合照片、哪些特徵支持、以及哪些地方還不確定。
- 若照片模糊、過遠、逆光、遮擋，必須主動降低信心。

第二階段：使用者條件修正與重排序
- 當使用者提供顏色、環境、棲地、體型大小、行為 / 停棲位置、地區、日期 / 季節等條件後，你必須重新評估並重排候選。
- 條件不可只是參考文字，而必須真正影響最後排序。
- 重新排序時，請嚴格依下列優先順序修正：照片中的體型與輪廓 > 類群判斷 > 環境篩選 > 嘴型與腿長 > 顏色 > 行為 / 停棲位置 > 地區 / 季節。
- 你必須檢查原本候選是否與新增條件衝突；若衝突明顯，請降低排名或淘汰。
- 若有更符合條件的鳥種，請補入新的候選。
- 當使用者條件與原始照片候選發生衝突時，你不可固守原答案，也不可替原本答案辯護，必須真的重排。
- 若原本候選屬於小型都市鳥類，但使用者後續提供的大小、棲地、環境明顯指向大型森林鳥或猛禽，必須大幅降低都市小型鳥的排名。

【辨識流程：必須照順序執行】
Step 1｜影像品質檢查
- 先判斷鳥體是否清楚、是否佔畫面足夠比例、是否逆光、模糊、遮擋、太遠、只拍到背面、或有多隻鳥混淆。
- 若照片品質不足，先降低信心，並說明缺點。

Step 2｜先判斷大類群，不要直接猜到種
- 請先判斷最可能屬於哪個大類群：
猛禽、水鳥 / 雁鴨、鷺鷥 / 鷺科、鷸鴴 / 濱鳥、鳩鴿類、鴉科、啄木鳥、繡眼 / 小型樹棲鳥、鶯 / 鶲 / 小型雀形目、八哥 / 椋鳥、鷺鶴 / 秧雞 / 水雞類、其他
- 這一步優先看體型與輪廓、嘴型、腿長、頭部比例、翅膀與尾巴形狀、停棲姿態 / 飛行輪廓。

Step 3｜納入地理與季節限制
- 優先以台灣鳥類為主。
- 根據地點、日期、環境縮小候選。
- 若某鳥在該地該季屬少見、迷鳥或非常態紀錄，需降低信心。

Step 4｜使用四大辨識關鍵做比對
1. Size & Shape（最優先）
2. Overall Color Pattern
3. Behavior / posture
4. Habitat
- 先用這四項縮到幾個候選，之後才看眼圈、眉斑、翼斑、尾端、喉部斑紋等 field marks。
- 不可一開始就只靠顏色猜。

Step 5｜先在內部思考 Top 5 候選，再輸出 Top 3
- 第一階段請輸出初步 Top 5。
- 第二階段請輸出重新排序後的 Top 3。
- 若無法準確到種，可以停在類群，例如「某種鷺科」、「某種猛禽」。
- 若前兩名很接近，也可以輸出「A 或 B 的可能性最高」。

【重要判讀規則】
1. 照片優先於文字敘述。
2. 地點與日期是強限制條件。
3. 顏色只能作為輔助，不可凌駕體型與輪廓。
4. 當體型、棲地、環境與原候選高衝突時，應優先修正答案，而不是維持照片初判。
5. 行為只能分成照片明確可見的姿態，或根據姿態推測的可能行為，不可把推測當成既定事實。
6. 若只拍到背面、剪影、飛行輪廓，請特別依賴 silhouette 和 wing/tail shape。
7. 若照片中鳥體很小，請主動降低信心。
8. 不可捏造照片中看不到的特徵。
9. 面對幼鳥、亞成鳥、雌鳥、換羽個體，要主動考慮羽色變異。

【使用者提供資料】
- 國家：台灣
- 環境篩選：${body.environmentLabel ?? body.habitat ?? "未知"}${(body.selectedEnvironment || body.environmentKey) ? `（環境代碼：${body.selectedEnvironment || body.environmentKey}）` : ""}
- 地點補充：${body.location ?? "未提供"}
- 日期：未提供
- 停留位置 / 姿態：${body.observationSpot ?? "未知"}
- AI 自動預設大小：${body.autoDetectedSize ? `${getBirdSizeLabel(body.autoDetectedSize)}（${body.autoDetectedSize}，信心：${body.autoDetectedSizeConfidence ?? "未知"}）` : "未知"}
- AI 大小預設原因：${body.autoDetectedSizeReason ?? "未提供"}
- 使用者目前選擇大小：${body.userSelectedSize ? `${getBirdSizeLabel(body.userSelectedSize)}（${body.userSelectedSize}）` : "未知"}
- 最終用於辨識大小：${body.finalSelectedSize || body.size ? `${getBirdSizeLabel(body.finalSelectedSize ?? body.size)}（${body.finalSelectedSize ?? body.size}）` : "未知"}
- AI 自動預設顏色：${colorListLabel(body.autoDetectedColors)}
- AI 預設顏色原因：${body.colorDetectionReason ?? "未提供"}
- AI 顏色信心：${body.colorDetectionConfidence ?? "未知"}
- 使用者手動調整顏色：${colorListLabel(body.userAdjustedColors)}
- 使用者最終確認顏色：${colorListLabel(body.finalSelectedColors ?? body.traits)}
- 其他備註：${body.notes ?? "未提供"}

【本工具這次必須特別遵守的重點】
- 你的任務是根據鳥類照片，再結合使用者後續選擇的環境、鳥的大小、顏色區塊，找出最符合照片中的鳥類。
- 照片是主要依據，但環境、大小、顏色是重要篩選條件，不可忽略。
- AI 自動預設大小只是建議；如果使用者手動改選大小，最後必須以「最終用於辨識大小」為準。
- 環境篩選不可只是參考文字，而必須真的影響排序；與環境高度吻合的候選要提高排名，與環境明顯衝突的候選要降低排名或淘汰。
- 辨識鳥種時，請以照片中的體型輪廓、整體比例、嘴型、腿長為主，再結合鳥類大小、環境與使用者最終確認的顏色區塊重新排序候選。
- 不可只看顏色猜鳥，也不可只看照片初步印象就固定答案。
- 系統自動預設顏色只是建議；如果使用者手動調整顏色，最終顏色必須以「使用者最終確認顏色」為準。
- 請在 reasoning 或 rerankSummary 中說明 AI 為什麼預設這些顏色，以及使用者手動調整後是否改變候選排序。
- 不要把天空、樹葉、水面、籠子、室內物件或其他背景顏色當成鳥體顏色；如果照片背景干擾很強，請降低顏色信心。
- 最終輸出 Top 3 候選時，請說明自動預設顏色是否真的影響排序；如果沒有影響，請明確說明主要仍是輪廓、大小、嘴型或腿長。
- 如果使用者選的是大型鳥，請不要優先輸出白頭翁、麻雀、綠繡眼等小型鳥類。
- 如果使用者選的是森林或山區棲地，請不要優先輸出典型都市小型鳥類，除非照片特徵非常明確。
- 如果使用者選的是海洋、海岸或河口 / 灘地，請不要優先輸出內陸森林鳥類，除非照片特徵非常明確。
- 如果使用者選的是濕地、池塘 / 湖泊或河川 / 溪流，請不要優先輸出純陸域樹棲小型鳥類，除非照片特徵非常明確。
- 如果大小與環境明顯不符合某候選，請降低排名或直接淘汰，並在 eliminatedCandidates 說明。
- 顏色只可用來幫助縮小範圍，不可單獨決定鳥種。
- 若資訊不足，不可假裝非常確定，必須保守輸出候選清單。

【輸出原則】
- 請在 initialCandidates 中輸出第一階段的 Top 5。
- 請在 candidates 中輸出第二階段加入條件後重新排序的 Top 3。
- 每個候選都要有簡短理由。
- 用高 / 中 / 低表示信心。
- 若照片品質不足或資訊不足，請明確表達「目前無法高信心辨識」。
- 若主體太小、模糊、逆光、遮擋、太遠、只拍到背面或角度不足，請將 photoQuality 設為 limited，並在 photoIssues 中列出對應項目。
- 請額外輸出 likelyGroup，代表目前最可能的大類群。
- 請額外輸出 uncertaintyFactors，列出造成不確定的主因。
- 請額外輸出 rerankSummary，說明為什麼新的排序比原本更合理。
- 請額外輸出 eliminatedCandidates，列出哪些原候選被淘汰，以及淘汰原因；原因中請明確提到是否因環境不符而被降權。

請以結構化 JSON 回覆，重點放在照片實際可見線索與條件重排後的保守判斷。
`.trim();

  const responseFormat = {
    type: "json_schema",
    name: "bird_photo_analysis",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        summary: { type: "string" },
        likelyGroup: { type: "string" },
        uncertaintyFactors: {
          type: "array",
          items: { type: "string" },
        },
        initialCandidates: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              confidence: {
                type: "string",
                enum: ["高", "中", "低"],
              },
              reason: { type: "string" },
            },
            required: ["name", "confidence", "reason"],
          },
        },
        rerankSummary: { type: "string" },
        eliminatedCandidates: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              reason: { type: "string" },
            },
            required: ["name", "reason"],
          },
        },
        photoClues: {
          type: "array",
          items: { type: "string" },
        },
        photoQuality: {
          type: "string",
          enum: ["clear", "limited"],
        },
        photoIssues: {
          type: "array",
          items: {
            type: "string",
            enum: ["主體太小", "模糊", "逆光", "遮擋", "角度不足"],
          },
        },
        bestFocusArea: { type: "string" },
        photoHelp: { type: "string" },
        detectedHabitat: {
          type: "string",
          enum: [...habitatEnum],
        },
        detectedSize: {
          type: "string",
          enum: [...sizeEnum],
        },
        detectedTraits: {
          type: "array",
          items: {
            type: "string",
            enum: [...traitEnum],
          },
        },
        candidates: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: { type: "string" },
              confidence: {
                type: "string",
                enum: ["高", "中", "低"],
              },
              reason: { type: "string" },
            },
            required: ["name", "confidence", "reason"],
          },
        },
      },
      required: [
        "summary",
        "likelyGroup",
        "uncertaintyFactors",
        "initialCandidates",
        "rerankSummary",
        "eliminatedCandidates",
        "photoClues",
        "photoQuality",
        "photoIssues",
        "bestFocusArea",
        "photoHelp",
        "detectedHabitat",
        "detectedSize",
        "detectedTraits",
        "candidates",
      ],
    },
  } as const;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_BIRD_ID_MODEL || "gpt-4.1",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: prompt,
            },
            {
              type: "input_image",
              image_url: body.imageDataUrl,
              detail: "high",
            },
          ],
        },
      ],
      text: {
        format: responseFormat,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    if (response.status === 429) {
      return NextResponse.json(
        buildFallbackResult(
          body,
          "影像辨識服務目前忙碌中，所以先改用站內輔助辨識模式。你仍可以先看候選結果，晚一點再重新上傳同一張照片做 AI 辨識。"
        )
      );
    }

    if (response.status >= 500) {
      return NextResponse.json(
        buildFallbackResult(
          body,
          "影像辨識服務暫時不穩定，所以先改用站內輔助辨識模式。你可以先參考這份候選結果，之後再回來重試 AI 照片辨識。"
        )
      );
    }

    return NextResponse.json(
      {
        error:
          response.status === 401
            ? "影像辨識 API 驗證失敗，請確認 OPENAI_API_KEY 是否正確。"
            : `照片分析暫時失敗，服務回傳：${errorText.slice(0, 200)}`,
      },
      { status: 502 }
    );
  }

  const payload = (await response.json()) as {
    output_text?: string;
  };

  const rawText = payload.output_text?.trim();

  if (!rawText) {
    return NextResponse.json(
      buildFallbackResult(
        body,
        "影像模型這次沒有回傳可解析內容，所以先改用站內輔助辨識模式。建議之後再試一次，或換一張主體更清楚的照片。"
      )
    );
  }

  try {
    const parsed = JSON.parse(rawText) as VisionAnalysis;
    return NextResponse.json(rerankWithVision(body, parsed));
  } catch {
    return NextResponse.json(
      buildFallbackResult(
        body,
        "影像模型回傳格式這次無法解析，所以先改用站內輔助辨識模式。你可以先參考候選結果，晚點再重新試一次。"
      )
    );
  }
}
