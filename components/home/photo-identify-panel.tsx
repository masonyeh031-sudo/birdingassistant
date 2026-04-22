"use client";

import { ChangeEvent, DragEvent, useEffect, useId, useMemo, useState } from "react";

import { birdCards } from "@/lib/home-data";

const stepItems = [
  { key: 1, label: "加入照片", note: "先確認你要比對的是哪一隻鳥" },
  { key: 2, label: "看到哪裡", note: "先回答環境和牠停的位置" },
  { key: 3, label: "判斷大小", note: "用常見鳥當比例尺會更容易" },
  { key: 4, label: "勾選特徵", note: "先顏色，再補少量關鍵細節" },
  { key: 5, label: "查看候選", note: "看推薦理由與還要再確認的地方" },
] as const;

const habitatOptions = [
  {
    value: "urban",
    label: "生活圈綠地",
    note: "住家、公園、校園附近最常遇到的情境",
    badge: "最適合新手",
  },
  {
    value: "park",
    label: "樹叢公園",
    note: "樹多、花多，常聽得到鳥叫聲",
    badge: "都市公園",
  },
  {
    value: "water",
    label: "水邊濕地",
    note: "河岸、池塘、濕地與草澤邊",
    badge: "水鳥常見",
  },
  {
    value: "forest-edge",
    label: "林緣步道",
    note: "郊山、林邊、低海拔步道",
    badge: "林緣觀察",
  },
] as const;

const sizeOptions = [
  { value: "small", label: "麻雀大小", note: "像麻雀、綠繡眼這種小型鳥" },
  { value: "medium", label: "白頭翁 / 斑鳩大小", note: "生活圈最常見的中型比例" },
  { value: "crow", label: "八哥 / 喜鵲大小", note: "比斑鳩再大一點，輪廓更明顯" },
  { value: "waterbird", label: "鷺科 / 雁大小", note: "偏大、腳長或脖子長的水鳥" },
] as const;

const observationSpotOptions = [
  { value: "ground", label: "在地上", note: "草地、步道、泥地上走動", relatedTraits: ["ground-walking"] },
  { value: "tree", label: "在樹上或灌叢", note: "枝頭、樹冠、花叢附近", relatedTraits: ["perch-open"] },
  { value: "wire", label: "在電線或欄杆", note: "停在明顯高處很容易看見", relatedTraits: ["perch-open"] },
  { value: "water", label: "在水邊或水裡", note: "池塘、濕地、河岸、淺水處", relatedTraits: ["near-water", "long-leg"] },
  { value: "flight", label: "在飛行中", note: "只看到飛過或盤旋的樣子", relatedTraits: ["perch-open", "tail-up"] },
] as const;

const traitOptions = [
  { value: "green", label: "偏綠色", group: "color" },
  { value: "brown", label: "偏褐色", group: "color" },
  { value: "white", label: "白色很明顯", group: "color" },
  { value: "dark", label: "黑灰色明顯", group: "color" },
  { value: "yellow", label: "有黃色區塊", group: "color" },
  { value: "orange", label: "有橘黃或栗色", group: "color" },
  { value: "blue", label: "有藍色區塊", group: "color" },
  { value: "eye-ring", label: "有白色眼圈", group: "face" },
  { value: "head-pattern", label: "頭部花紋明顯", group: "face" },
  { value: "white-cheek", label: "臉頰偏白", group: "face" },
  { value: "crest", label: "有冠羽或頭頂特別突起", group: "face" },
  { value: "thick-bill", label: "嘴喙粗厚", group: "shape" },
  { value: "long-bill", label: "嘴喙細長", group: "shape" },
  { value: "long-neck", label: "脖子明顯偏長", group: "shape" },
  { value: "long-leg", label: "腿很長", group: "shape" },
  { value: "tail-up", label: "尾巴常翹起", group: "behavior" },
  { value: "ground-walking", label: "常在地上走動", group: "behavior" },
  { value: "perch-open", label: "喜歡停在明顯高處", group: "behavior" },
  { value: "flock", label: "常成群出現", group: "behavior" },
  { value: "near-water", label: "總是在水邊附近", group: "behavior" },
] as const;

const traitGroups = [
  { key: "color", label: "顏色印象", note: "先想最明顯的大色塊" },
  { key: "face", label: "頭部與臉部", note: "頭部花紋通常最有辨識力" },
  { key: "shape", label: "嘴型與身形", note: "嘴、脖子、腿長度很有用" },
  { key: "behavior", label: "動作與位置", note: "停哪裡、怎麼動常常比顏色更準" },
] as const;

const quickPresetOptions = [
  {
    label: "公園樹上小鳥",
    habitat: "park",
    size: "small",
    traits: ["green", "eye-ring"] as string[],
  },
  {
    label: "校園常見中型鳥",
    habitat: "urban",
    size: "medium",
    traits: ["head-pattern", "perch-open"] as string[],
  },
  {
    label: "水邊白色大鳥",
    habitat: "water",
    size: "waterbird",
    traits: ["white", "long-leg"] as string[],
  },
  {
    label: "地上走的褐色鳥",
    habitat: "park",
    size: "medium",
    traits: ["brown", "ground-walking"] as string[],
  },
] as const;

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

type MatchResult = {
  bird: (typeof birdCards)[number];
  score: number;
  confidence: "高" | "中" | "低";
  confidenceTone: string;
  matchedReasons: string[];
  checkNext: string[];
};

type HybridMatchResult = MatchResult & {
  photoReason?: string;
};

type PhotoAnalysisCandidate = {
  name: string;
  confidence: "高" | "中" | "低";
  reason: string;
};

type PhotoAnalysisResult = {
  mode?: "api" | "fallback";
  engineNote?: string;
  summary: string;
  photoClues: string[];
  bestFocusArea: string;
  photoHelp: string;
  comparisonReason: string;
  candidates: PhotoAnalysisCandidate[];
};

type PhotoQuality = {
  width: number;
  height: number;
  qualityLabel: "佳" | "普通" | "待加強";
  qualityNote: string;
};

const photoFocusOptions = [
  { value: "head", label: "頭部最清楚", note: "適合比對臉部花紋、眼圈或冠羽" },
  { value: "bill", label: "嘴型最清楚", note: "適合分粗嘴、細嘴、水鳥嘴型" },
  { value: "body", label: "全身輪廓清楚", note: "適合看站姿、尾巴和整體比例" },
  { value: "legs", label: "腿和脖子清楚", note: "對鷺科、水邊鳥特別有幫助" },
] as const;

function labelForTrait(value: string) {
  return (
    traitOptions.find((option) => option.value === value)?.label ??
    sizeOptions.find((option) => option.value === value)?.label ??
    habitatOptions.find((option) => option.value === value)?.label ??
    value
  );
}

function scoreBird(habitat: string, size: string, traits: string[]): MatchResult[] {
  const trimmedTraits = traits.slice(0, 4);

  return birdCards
    .map((bird) => {
      let score = 0;
      const matchedReasons: string[] = [];
      const checkNext: string[] = [];

      if (bird.matcherHabitats.includes(habitat)) {
        score += 5;
        matchedReasons.push(`常見於「${labelForTrait(habitat)}」`);
      } else {
        score -= 4;
        checkNext.push("出現環境和你描述的不太一樣");
      }

      if (size && bird.matcherTraits.includes(size)) {
        score += 4;
        matchedReasons.push(`體型接近「${labelForTrait(size)}」`);
      } else if (size) {
        score -= size === "waterbird" || bird.matcherTraits.includes("waterbird") ? 5 : 3;
        checkNext.push("體型印象可能不符合");
      }

      trimmedTraits.forEach((trait) => {
        if (bird.matcherTraits.includes(trait)) {
          score += 3;
          matchedReasons.push(`符合「${labelForTrait(trait)}」`);
          return;
        }

        const relatedTraits = relatedTraitsMap[trait] ?? [];
        const contradictionTraits = contradictoryTraitsMap[trait] ?? [];

        if (relatedTraits.some((relatedTrait) => bird.matcherTraits.includes(relatedTrait))) {
          score += 1;
          checkNext.push(`你勾的「${labelForTrait(trait)}」只算部分相近`);
          return;
        }

        if (contradictionTraits.some((conflictTrait) => bird.matcherTraits.includes(conflictTrait))) {
          score -= 3;
          checkNext.push(`和「${labelForTrait(trait)}」有明顯衝突`);
          return;
        }

        score -= 1;
      });

      const confidence: MatchResult["confidence"] =
        score >= 11 ? "高" : score >= 7 ? "中" : "低";
      const confidenceTone =
        confidence === "高"
          ? "bg-emerald-50 text-emerald-700"
          : confidence === "中"
            ? "bg-amber-50 text-amber-700"
            : "bg-rose-50 text-rose-700";

      return {
        bird,
        score,
        confidence,
        confidenceTone,
        matchedReasons: Array.from(new Set(matchedReasons)).slice(0, 3),
        checkNext: Array.from(new Set(checkNext)).slice(0, 2),
      };
    })
    .sort((a, b) => b.score - a.score)
    .filter((result) => result.score > 0)
    .slice(0, 3);
}

function spotLabel(value: (typeof observationSpotOptions)[number]["value"]) {
  return observationSpotOptions.find((option) => option.value === value)?.label ?? value;
}

function normalizeSizeTraits(size: string) {
  if (size === "crow") {
    return ["medium", "dark", "perch-open"];
  }

  return [size];
}

function analyzePhotoQuality(width: number, height: number): PhotoQuality {
  const longSide = Math.max(width, height);

  if (longSide >= 1800) {
    return {
      width,
      height,
      qualityLabel: "佳",
      qualityNote: "解析度夠高，通常比較容易看清楚頭部、嘴型與羽色細節。",
    };
  }

  if (longSide >= 1000) {
    return {
      width,
      height,
      qualityLabel: "普通",
      qualityNote: "可以先做比對，但如果鳥只佔畫面很小一部分，結果仍要保守看待。",
    };
  }

  return {
    width,
    height,
    qualityLabel: "待加強",
    qualityNote: "照片尺寸偏小，建議優先靠環境、大小和明顯輪廓來判斷。",
  };
}

function matchesSummary(traits: string[]) {
  if (traits.length === 0) {
    return "先從地點和體型做第一輪縮小，之後再回頭比對臉部和羽色。";
  }

  return `這一輪會優先比對：${traits
    .map((trait) => traitOptions.find((option) => option.value === trait)?.label)
    .filter(Boolean)
    .join("、")}。`;
}

function traitCountByGroup(group: (typeof traitGroups)[number]["key"], traits: string[]) {
  return traits.filter(
    (trait) => traitOptions.find((option) => option.value === trait)?.group === group
  ).length;
}

function describePhotoHelp(photoFocus: (typeof photoFocusOptions)[number]["value"], hasPhoto: boolean) {
  if (!hasPhoto) {
    return "目前沒有加入照片，所以這次比對主要還是根據你手動選的環境、大小和特徵。";
  }

  switch (photoFocus) {
    case "head":
      return "你標記的是頭部最清楚，所以這次比對會更重視頭部花紋、眼圈和冠羽這類線索。";
    case "bill":
      return "你標記的是嘴型最清楚，所以這次會優先參考粗嘴、細嘴和水鳥嘴型這種差異。";
    case "legs":
      return "你標記的是腿和脖子最清楚，所以對鷺科、水邊鳥或站姿明顯的鳥特別有幫助。";
    default:
      return "你標記的是全身輪廓最清楚，所以整體比例、尾巴和站姿在線索判斷裡會更有份量。";
  }
}

function describePhotoFocusArea(photoFocus: (typeof photoFocusOptions)[number]["value"]) {
  return photoFocusOptions.find((option) => option.value === photoFocus)?.note ?? "先看最清楚的身體部位。";
}

function compareTopMatches(
  first: MatchResult | undefined,
  second: MatchResult | undefined,
  hasPhoto: boolean
) {
  if (!first) {
    return "目前條件還不夠，這次沒有明顯第一名。";
  }

  if (!second) {
    return hasPhoto
      ? `目前 ${first.bird.name} 的線索最集中，還沒有第二個足夠接近的候選。`
      : `目前 ${first.bird.name} 明顯最接近，但還是建議再補一個更清楚的照片線索。`;
  }

  const scoreGap = first.score - second.score;

  if (scoreGap >= 4) {
    return `${first.bird.name} 比 ${second.bird.name} 更像，因為它同時更符合你選的環境、體型和關鍵特徵，差距已經拉開。`;
  }

  return `${first.bird.name} 暫時排在 ${second.bird.name} 前面，但兩者還算接近。建議優先比對它們的頭部花紋、嘴型或站姿差異。`;
}

function getAnalysisConfidenceTone(confidence: "高" | "中" | "低") {
  if (confidence === "高") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (confidence === "中") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-rose-50 text-rose-700";
}

function mergePhotoAndRuleMatches(
  topMatches: MatchResult[],
  analysisResult: PhotoAnalysisResult | null
): HybridMatchResult[] {
  if (!analysisResult || analysisResult.mode === "fallback") {
    return topMatches;
  }

  const candidateBoostByConfidence: Record<PhotoAnalysisCandidate["confidence"], number> = {
    高: 10,
    中: 7,
    低: 4,
  };
  const rankBoost = [4, 2, 1];
  const resultMap = new Map<string, HybridMatchResult>();

  topMatches.forEach((result) => {
    resultMap.set(result.bird.name, { ...result });
  });

  analysisResult.candidates.forEach((candidate, index) => {
    const bird = birdCards.find((item) => item.name === candidate.name);

    if (!bird) {
      return;
    }

    const current =
      resultMap.get(candidate.name) ??
      ({
        bird,
        score: 0,
        confidence: "低",
        confidenceTone: getAnalysisConfidenceTone("低"),
        matchedReasons: [],
        checkNext: [bird.watchTip],
      } satisfies HybridMatchResult);

    const nextScore =
      current.score + candidateBoostByConfidence[candidate.confidence] + (rankBoost[index] ?? 0);
    const nextConfidence: MatchResult["confidence"] =
      nextScore >= 17 ? "高" : nextScore >= 10 ? "中" : "低";

    resultMap.set(candidate.name, {
      ...current,
      score: nextScore,
      confidence: nextConfidence,
      confidenceTone: getAnalysisConfidenceTone(nextConfidence),
      matchedReasons: Array.from(
        new Set([`照片初判偏向「${candidate.name}」`, ...current.matchedReasons])
      ).slice(0, 3),
      checkNext: Array.from(new Set(current.checkNext.length > 0 ? current.checkNext : [bird.watchTip])).slice(
        0,
        2
      ),
      photoReason: candidate.reason,
    });
  });

  return Array.from(resultMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function PhotoIdentifyPanel() {
  const inputId = useId();
  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [photoQuality, setPhotoQuality] = useState<PhotoQuality | null>(null);
  const [photoFocus, setPhotoFocus] =
    useState<(typeof photoFocusOptions)[number]["value"]>("body");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PhotoAnalysisResult | null>(null);
  const [analysisAttemptKey, setAnalysisAttemptKey] = useState<string | null>(null);
  const [habitat, setHabitat] = useState<(typeof habitatOptions)[number]["value"]>("urban");
  const [observationSpot, setObservationSpot] =
    useState<(typeof observationSpotOptions)[number]["value"]>("tree");
  const [size, setSize] = useState<(typeof sizeOptions)[number]["value"]>("medium");
  const [traits, setTraits] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const mergedTraits = useMemo(
    () =>
      Array.from(
        new Set([
          ...traits,
          ...normalizeSizeTraits(size),
          ...(photoFocus === "head"
            ? ["head-pattern", "eye-ring"]
            : photoFocus === "bill"
              ? ["thick-bill", "long-bill"]
              : photoFocus === "legs"
                ? ["long-leg", "long-neck"]
                : ["perch-open"]),
          ...(observationSpotOptions.find((option) => option.value === observationSpot)
            ?.relatedTraits ?? []),
        ])
      ),
    [observationSpot, photoFocus, size, traits]
  );
  const topMatches = useMemo(
    () => scoreBird(habitat, size === "crow" ? "medium" : size, mergedTraits),
    [habitat, mergedTraits, size]
  );
  const hybridMatches = useMemo(
    () => mergePhotoAndRuleMatches(topMatches, analysisResult),
    [analysisResult, topMatches]
  );
  const canGoNext = true;
  const strongestMatch = previewUrl ? hybridMatches[0] : undefined;
  const totalSelectedTraits = traits.length;
  const photoAnalysisStatusLabel = !previewUrl
    ? "待加入照片"
    : analysisLoading
      ? "分析中"
      : analysisResult
        ? "已完成分析"
        : analysisError
          ? "分析失敗"
          : "準備分析";
  const currentStepLabel =
    step === 1 && previewUrl ? "照片已加入" : stepItems[step - 1]?.label;
  const currentLikelyBirdLabel = !previewUrl
    ? "待加入照片"
    : analysisLoading
      ? "分析中"
      : strongestMatch?.bird.name ?? (analysisError ? "分析失敗" : "準備分析");

  useEffect(() => {
    async function runPhotoAnalysis() {
      if (!fileDataUrl || analysisLoading || analysisResult || analysisAttemptKey === fileDataUrl) {
        return;
      }

      try {
        setAnalysisLoading(true);
        setAnalysisError(null);
        setAnalysisAttemptKey(fileDataUrl);

        const response = await fetch("/api/bird-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageDataUrl: fileDataUrl,
            habitat,
            observationSpot,
            size,
            photoFocus,
            traits,
          }),
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || "照片分析失敗");
        }

        setAnalysisResult(payload);
      } catch (error) {
        setAnalysisError(error instanceof Error ? error.message : "照片分析失敗");
      } finally {
        setAnalysisLoading(false);
      }
    }

    void runPhotoAnalysis();
  }, [
    analysisAttemptKey,
    analysisLoading,
    analysisResult,
    fileDataUrl,
    habitat,
    observationSpot,
    photoFocus,
    size,
    traits,
  ]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    processFile(file);
  }

  function processFile(file: File) {
    if (!file.type.startsWith("image/")) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setFileName(file.name);
    setPreviewUrl(objectUrl);
    setAnalysisResult(null);
    setAnalysisError(null);
    setAnalysisAttemptKey(null);
    setStep((current) => (current === 1 ? 2 : current));

    const image = new Image();
    image.onload = () => {
      setPhotoQuality(analyzePhotoQuality(image.width, image.height));
      URL.revokeObjectURL(image.src);
    };
    image.src = objectUrl;

    const reader = new FileReader();
    reader.onload = () => {
      setFileDataUrl(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  }

  function clearPhoto() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setFileName("");
    setFileDataUrl(null);
    setPhotoQuality(null);
    setPhotoFocus("body");
    setAnalysisResult(null);
    setAnalysisError(null);
    setAnalysisAttemptKey(null);
  }

  function toggleTrait(value: string) {
    setTraits((current) =>
      current.includes(value)
        ? current.filter((trait) => trait !== value)
        : [...current, value].slice(-4)
    );
  }

  function applyQuickPreset(option: (typeof quickPresetOptions)[number]) {
    setHabitat(option.habitat);
    setSize(option.size);
    setTraits(option.traits.slice(0, 4));
    setStep(3);
  }

  function resetFlow() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setFileName("");
    setIsDragging(false);
    setFileDataUrl(null);
    setPhotoQuality(null);
    setPhotoFocus("body");
    setAnalysisResult(null);
    setAnalysisError(null);
    setAnalysisAttemptKey(null);
    setHabitat("urban");
    setObservationSpot("tree");
    setSize("medium");
    setTraits([]);
    setStep(1);
  }

  return (
    <div
      id="assistant"
      className="mt-5 rounded-[32px] border border-white/75 bg-white/90 p-5 shadow-card backdrop-blur sm:p-6"
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-4 rounded-[28px] bg-gradient-to-br from-pine via-moss-700 to-moss-600 p-5 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/70">Guided Bird ID</p>
            <h2 className="mt-3 text-3xl font-semibold">像 Merlin 一樣，一步一步縮小候選鳥種</h2>
            <p className="mt-3 text-sm leading-7 text-white/80">
              先加入照片，再補上觀察環境、體型與特徵。這個版本會把新手最常用的判斷節奏拆成四個清楚步驟。
            </p>
          </div>

          <div className="space-y-3">
            {stepItems.map((item) => {
              const active = item.key === step;
              const completed = item.key < step;

              return (
                <div
                  key={item.key}
                  className={
                    active
                      ? "rounded-[22px] border border-white/20 bg-white/16 p-4"
                      : completed
                        ? "rounded-[22px] border border-white/10 bg-white/10 p-4"
                        : "rounded-[22px] border border-white/10 bg-transparent p-4"
                  }
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={
                        active
                          ? "flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-pine"
                          : completed
                            ? "flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white"
                            : "flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-sm font-semibold text-white/80"
                      }
                    >
                      {item.key}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-xs leading-6 text-white/70">{item.note}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-[24px] bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">目前條件</p>
            <div className="mt-3 space-y-2 text-sm text-white/85">
              <p>照片：{fileName || "尚未加入，仍可先模擬辨識流程"}</p>
              <p>環境：{habitatOptions.find((item) => item.value === habitat)?.label}</p>
              <p>位置：{spotLabel(observationSpot)}</p>
              <p>體型：{sizeOptions.find((item) => item.value === size)?.label}</p>
              <p>{matchesSummary(traits)}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[22px] bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">目前步驟</p>
              <p className="mt-2 text-base font-semibold text-white">{currentStepLabel}</p>
            </div>
            <div className="rounded-[22px] bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">已選特徵</p>
                  <p className="mt-2 text-base font-semibold text-white">{totalSelectedTraits} / 4</p>
                </div>
            <div className="rounded-[22px] bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/60">目前最像</p>
              <p className="mt-2 text-base font-semibold text-white">{currentLikelyBirdLabel}</p>
            </div>
          </div>

          <div className="rounded-[24px] bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">這版怎麼判斷</p>
            <p className="mt-3 text-sm leading-7 text-white/80">
              {previewUrl
                ? `照片已加入，目前狀態是「${photoAnalysisStatusLabel}」。我會先用照片做第一輪初判，之後再把你填的環境、體型和特徵一起納入，持續微調「目前最像」的排序。`
                : "我現在先用「環境、體型、明確特徵」排除不合理候選，再把符合度最高的鳥放前面，同時提醒你還需要再確認哪些點。"}
            </p>
          </div>
        </aside>

        <div className="rounded-[30px] border border-moss-100 bg-moss-50/45 p-4 sm:p-5">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-moss-700">步驟 1</p>
                  <h3 className="mt-2 text-2xl font-semibold text-pine">先把鳥的照片放進來</h3>
                  <p className="mt-2 text-sm leading-7 text-moss-600">
                    如果你手上有照片，先加入畫面。沒有也沒關係，這一版仍可先用觀察條件模擬辨識。
                  </p>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-moss-700 shadow-sm">
                  先確認照片再比對
                </div>
              </div>

              <label
                htmlFor={inputId}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={
                  isDragging
                    ? "flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-pine bg-moss-50 p-5 text-center transition"
                    : "flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-moss-300 bg-white p-5 text-center transition hover:border-moss-500"
                }
              >
                {previewUrl ? (
                  <div className="w-full space-y-3">
                    <img
                      src={previewUrl}
                      alt="使用者上傳的鳥類預覽"
                      className="h-[280px] w-full rounded-[22px] bg-moss-50 object-contain shadow-sm"
                    />
                    <p className="text-sm text-moss-600">可直接拖曳另一張照片進來替換</p>
                  </div>
                ) : (
                  <div className="max-w-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-moss-50 text-3xl">
                      📷
                    </div>
                    <p className="mt-4 text-xl font-semibold text-pine">上傳一張鳥類照片</p>
                    <p className="mt-3 text-sm leading-7 text-moss-600">
                      可以點選或直接拖曳照片進來。越能清楚看到鳥的輪廓、頭部或站姿，後面的比對就越容易。
                    </p>
                  </div>
                )}
              </label>
              <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />

              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">照片狀態</p>
                  <p className="mt-2 text-sm font-medium text-moss-900">
                    {fileName || "尚未加入照片"}
                  </p>
                </div>
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">照片品質</p>
                  <p className="mt-2 text-sm font-medium text-moss-900">
                    {photoQuality ? photoQuality.qualityLabel : "尚未判讀"}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-moss-600">
                    {photoQuality ? `${photoQuality.width} × ${photoQuality.height}` : "加入照片後自動分析"}
                  </p>
                </div>
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">建議拍法</p>
                  <p className="mt-2 text-sm leading-6 text-moss-700">
                    盡量保留全身、嘴型與腳部位置。
                  </p>
                </div>
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">沒有照片也可</p>
                  <p className="mt-2 text-sm leading-6 text-moss-700">
                    直接下一步，用你記得的條件先找方向。
                  </p>
                </div>
              </div>

              {photoQuality ? (
                <div className="rounded-[26px] bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-pine">照片辨識輔助</p>
                      <p className="mt-2 text-sm leading-6 text-moss-600">{photoQuality.qualityNote}</p>
                    </div>
                    <button
                      type="button"
                      onClick={clearPhoto}
                      className="rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
                    >
                      移除照片
                    </button>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-pine">照片裡哪個部位最清楚？</p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {photoFocusOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPhotoFocus(option.value)}
                          className={
                            option.value === photoFocus
                              ? "rounded-[22px] border border-pine bg-pine px-4 py-4 text-left text-white"
                              : "rounded-[22px] border border-moss-200 bg-moss-50/35 px-4 py-4 text-left text-moss-700 transition hover:border-moss-400"
                          }
                        >
                          <p className="text-sm font-semibold">{option.label}</p>
                          <p className="mt-2 text-sm leading-6 opacity-80">{option.note}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="rounded-[26px] bg-moss-50/70 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-pine">快速套用常見情境</p>
                    <p className="mt-2 text-sm leading-6 text-moss-600">
                      如果你只是想先試看看，直接套用一個常見情境會更快進入比對。
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {quickPresetOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => applyQuickPreset(option)}
                      className="rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-moss-700">步驟 2</p>
                <h3 className="mt-2 text-2xl font-semibold text-pine">你是在哪裡看到牠的？牠停在哪裡？</h3>
                <p className="mt-2 text-sm leading-7 text-moss-600">
                  這一步參考 Merlin 和中華鳥會介紹的使用邏輯，先回答「出現環境」和「牠當時停在哪裡」，通常就能先排掉很多不可能的鳥。
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-pine">看到牠的環境</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {habitatOptions.map((option) => {
                    const active = option.value === habitat;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setHabitat(option.value)}
                        className={
                          active
                            ? "rounded-[24px] border border-moss-600 bg-white px-4 py-4 text-left shadow-sm"
                            : "rounded-[24px] border border-moss-200 bg-white/75 px-4 py-4 text-left"
                        }
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-base font-semibold text-moss-900">{option.label}</p>
                          <span className="rounded-full bg-moss-50 px-3 py-1 text-xs font-medium text-moss-600">
                            {option.badge}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-moss-600">{option.note}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-pine">牠當時停在哪裡？</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                  {observationSpotOptions.map((option) => {
                    const active = option.value === observationSpot;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setObservationSpot(option.value)}
                        className={
                          option.value === observationSpot
                            ? "rounded-[24px] border border-pine bg-pine px-4 py-4 text-left text-white"
                            : "rounded-[24px] border border-moss-200 bg-white px-4 py-4 text-left text-moss-700"
                        }
                      >
                        <p className="text-base font-semibold">{option.label}</p>
                        <p className="mt-2 text-sm leading-6 opacity-80">{option.note}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-moss-700">步驟 3</p>
                <h3 className="mt-2 text-2xl font-semibold text-pine">牠大概有多大？最明顯的顏色是什麼？</h3>
                <p className="mt-2 text-sm leading-7 text-moss-600">
                  先用比例尺選大小，再只勾一到兩個最明顯的主色。這一步越簡單，後面候選通常越穩。
                </p>
              </div>

              <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[26px] bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-pine">大小比例尺</p>
                    <p className="text-xs text-moss-500">參考 Merlin 常見做法</p>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {sizeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSize(option.value)}
                        className={
                          option.value === size
                            ? "rounded-[24px] border border-pine bg-pine px-4 py-4 text-left text-white"
                            : "rounded-[24px] border border-moss-200 bg-moss-50/35 px-4 py-4 text-left text-moss-700 transition hover:border-moss-400"
                        }
                      >
                        <p className="text-base font-semibold">{option.label}</p>
                        <p className="mt-2 text-sm leading-6 opacity-80">{option.note}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[26px] bg-white p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-pine">主色印象</p>
                    <p className="text-xs text-moss-500">建議 1 到 2 個</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-moss-600">
                    只選你第一眼最明顯看到的顏色，不確定就不要勾。
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {traitOptions
                      .filter((option) => option.group === "color")
                      .map((option) => {
                        const active = traits.includes(option.value);

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => toggleTrait(option.value)}
                            className={
                              active
                                ? "rounded-full border border-moss-700 bg-moss-700 px-4 py-2 text-sm font-medium text-white"
                                : "rounded-full border border-moss-200 bg-moss-50/60 px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
                            }
                          >
                            {option.label}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[24px] bg-sand px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">目前縮小方向</p>
                  <p className="mt-2 text-sm leading-6 text-moss-800">{matchesSummary(traits)}</p>
                </div>
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">新手提醒</p>
                  <p className="mt-2 text-sm leading-6 text-moss-700">
                    如果你只記得一點點，優先選頭部花紋、嘴型、站的位置。顏色常常會因光線看錯。
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-moss-700">步驟 4</p>
                <h3 className="mt-2 text-2xl font-semibold text-pine">最後再補幾個關鍵細節</h3>
                <p className="mt-2 text-sm leading-7 text-moss-600">
                  現在只補真正能幫你拉開差異的資訊，例如頭部花紋、眼圈、嘴型或常見動作。這一步不要貪多。
                </p>
              </div>

              <div className="rounded-[26px] bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-pine">關鍵細節</p>
                  <p className="text-xs text-moss-500">總共最多 4 個</p>
                </div>
                <div className="mt-5 space-y-4">
                  {traitGroups
                    .filter((group) => group.key !== "color")
                    .map((group) => (
                      <div key={group.key} className="rounded-[22px] border border-moss-100 bg-moss-50/55 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-pine">{group.label}</p>
                            <p className="mt-1 text-xs leading-6 text-moss-600">{group.note}</p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-moss-600">
                            已選 {traitCountByGroup(group.key, traits)}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {traitOptions
                            .filter((option) => option.group === group.key)
                            .map((option) => {
                              const active = traits.includes(option.value);

                              return (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => toggleTrait(option.value)}
                                  className={
                                    active
                                      ? "rounded-full border border-moss-700 bg-moss-700 px-4 py-2 text-sm font-medium text-white"
                                      : "rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
                                  }
                                >
                                  {option.label}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-moss-700">步驟 5</p>
                  <h3 className="mt-2 text-2xl font-semibold text-pine">先從這 3 種開始比對</h3>
                  <p className="mt-2 text-sm leading-7 text-moss-600">
                    這一頁不直接幫你下結論，而是先列出最像的候選、推薦理由，還有你下一眼應該再確認哪裡。
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetFlow}
                  className="rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700"
                >
                  重新開始
                </button>
              </div>

              {strongestMatch ? (
                <div className="rounded-[24px] border border-moss-100 bg-moss-50/70 px-5 py-4 text-sm leading-7 text-moss-700">
                  目前最像的是 <span className="font-semibold text-pine">{strongestMatch.bird.name}</span>。
                  先別急著直接認定，請優先再看牠的
                  {strongestMatch.checkNext.length > 0
                    ? `「${strongestMatch.checkNext.join("、")}」`
                    : "頭部、嘴型和站姿"}。
                </div>
              ) : (
                <div className="rounded-[24px] border border-amber-100 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-800">
                  目前還沒有照片，所以我先不主動給出最像的候選。你可以先完成整個流程做模擬，或加入照片後再看更有依據的推薦結果。
                </div>
              )}

              {previewUrl ? (
                <div className="rounded-[26px] border border-white bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-pine">照片分析結果</p>
                      <p className="mt-2 text-sm leading-7 text-moss-600">
                        這一區會優先顯示影像分析回來的線索與候選結果。
                      </p>
                    </div>
                    <div className="rounded-full bg-moss-50 px-3 py-1 text-xs font-medium text-moss-700">
                      {analysisLoading
                        ? "分析中"
                        : analysisResult
                          ? analysisResult.mode === "fallback"
                            ? "站內輔助模式"
                            : "影像模型已回傳"
                          : analysisError
                            ? "分析失敗"
                            : "等待分析"}
                    </div>
                  </div>

                  {analysisLoading ? (
                    <div className="mt-4 rounded-[22px] bg-moss-50/70 px-4 py-4 text-sm leading-7 text-moss-700">
                      正在分析照片中的鳥類線索，會優先檢查外觀、輪廓、嘴型與明顯部位。
                    </div>
                  ) : null}

                  {analysisError ? (
                    <div className="mt-4 rounded-[24px] border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-lg">
                          !
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-amber-900">目前無法完成照片辨識</p>
                          <p className="text-sm leading-7 text-amber-800">{analysisError}</p>
                          <p className="text-xs leading-6 text-amber-700">
                            你還是可以先看下面的條件比對結果，把它當作暫時的輔助方向。
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {analysisResult ? (
                    <div className="mt-4 space-y-4">
                      {analysisResult.engineNote ? (
                        <div className="rounded-[22px] border border-sky-100 bg-sky-50 px-4 py-4 text-sm leading-7 text-sky-900">
                          {analysisResult.engineNote}
                        </div>
                      ) : null}

                      <div className="rounded-[24px] border border-moss-100 bg-gradient-to-br from-moss-50/80 to-white p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-moss-500">分析摘要</p>
                            <p className="mt-2 text-lg font-semibold text-pine">
                              {analysisResult.candidates[0]?.name ?? "照片分析完成"}
                            </p>
                          </div>
                          {analysisResult.candidates[0] ? (
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${getAnalysisConfidenceTone(
                                analysisResult.candidates[0].confidence
                              )}`}
                            >
                              可信度 {analysisResult.candidates[0].confidence}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-3 text-sm leading-7 text-moss-800">{analysisResult.summary}</p>
                      </div>

                      <div className="grid gap-3 xl:grid-cols-3">
                        <div className="rounded-[22px] bg-white px-4 py-4 ring-1 ring-moss-100">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">照片線索有幫助到什麼</p>
                          <p className="mt-2 text-sm leading-7 text-moss-700">{analysisResult.photoHelp}</p>
                        </div>
                        <div className="rounded-[22px] bg-white px-4 py-4 ring-1 ring-moss-100">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">這張照片最適合看哪個部位</p>
                          <p className="mt-2 text-sm leading-7 text-moss-700">{analysisResult.bestFocusArea}</p>
                        </div>
                        <div className="rounded-[22px] bg-white px-4 py-4 ring-1 ring-moss-100">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">為什麼第一名比第二名更像</p>
                          <p className="mt-2 text-sm leading-7 text-moss-700">{analysisResult.comparisonReason}</p>
                        </div>
                      </div>

                      <div className="rounded-[22px] bg-white px-4 py-4 ring-1 ring-moss-100">
                        <p className="text-xs uppercase tracking-[0.18em] text-moss-500">照片中看見的線索</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {analysisResult.photoClues.map((clue) => (
                            <span
                              key={clue}
                              className="rounded-full bg-moss-50 px-3 py-1 text-xs font-medium text-moss-700"
                            >
                              {clue}
                            </span>
                          ))}
                        </div>
                      </div>

                      {analysisResult.candidates[0] && analysisResult.candidates[1] ? (
                        <div className="rounded-[24px] border border-moss-100 bg-moss-50/60 p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">第一名 vs 第二名</p>
                              <h4 className="mt-2 text-xl font-semibold text-pine">並排差異比較</h4>
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-moss-700">
                              看差異最快
                            </span>
                          </div>

                          <div className="mt-4 grid gap-3 lg:grid-cols-2">
                            <div className="rounded-[22px] bg-white px-4 py-4 ring-1 ring-moss-100">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">第一名</p>
                                  <p className="mt-1 text-lg font-semibold text-pine">
                                    {analysisResult.candidates[0].name}
                                  </p>
                                </div>
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-medium ${getAnalysisConfidenceTone(
                                    analysisResult.candidates[0].confidence
                                  )}`}
                                >
                                  {analysisResult.candidates[0].confidence}
                                </span>
                              </div>
                              <p className="mt-3 text-sm leading-7 text-moss-700">
                                {analysisResult.candidates[0].reason}
                              </p>
                            </div>

                            <div className="rounded-[22px] bg-white px-4 py-4 ring-1 ring-moss-100">
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">第二名</p>
                                  <p className="mt-1 text-lg font-semibold text-pine">
                                    {analysisResult.candidates[1].name}
                                  </p>
                                </div>
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-medium ${getAnalysisConfidenceTone(
                                    analysisResult.candidates[1].confidence
                                  )}`}
                                >
                                  {analysisResult.candidates[1].confidence}
                                </span>
                              </div>
                              <p className="mt-3 text-sm leading-7 text-moss-700">
                                {analysisResult.candidates[1].reason}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      <div className="space-y-3">
                        {analysisResult.candidates.map((candidate, index) => (
                          <div
                            key={`${candidate.name}-${index}`}
                            className="rounded-[22px] bg-white px-4 py-4 ring-1 ring-moss-100"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-moss-500">
                                  照片候選 {index + 1}
                                </p>
                                <p className="mt-1 text-lg font-semibold text-pine">{candidate.name}</p>
                              </div>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${getAnalysisConfidenceTone(
                                  candidate.confidence
                                )}`}
                              >
                                可信度 {candidate.confidence}
                              </span>
                            </div>
                            <p className="mt-3 text-sm leading-7 text-moss-700">{candidate.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[22px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">結果策略</p>
                  <p className="mt-2 text-sm leading-6 text-moss-700">先看最像的一種，再和第二名做差異比對。</p>
                </div>
                <div className="rounded-[22px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">最有用線索</p>
                  <p className="mt-2 text-sm leading-6 text-moss-700">
                    {strongestMatch?.matchedReasons[0] ?? "回頭補一個更明確的特徵"}
                  </p>
                </div>
                <div className="rounded-[22px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">建議下一步</p>
                  <p className="mt-2 text-sm leading-6 text-moss-700">
                    {previewUrl
                      ? "先放大比對照片裡最清楚的部位，再到常見鳥類卡片頁看大圖與完整介紹。"
                      : "到常見鳥類卡片頁看大圖與完整介紹，會更容易確認。"}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 xl:grid-cols-3">
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">照片線索有幫助到什麼</p>
                  <p className="mt-2 text-sm leading-7 text-moss-700">
                    {describePhotoHelp(photoFocus, Boolean(previewUrl))}
                  </p>
                </div>
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">這張照片最適合看哪個部位</p>
                  <p className="mt-2 text-sm leading-7 text-moss-700">
                    {describePhotoFocusArea(photoFocus)}
                  </p>
                </div>
                <div className="rounded-[24px] bg-white px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">為什麼第一名比第二名更像</p>
                  <p className="mt-2 text-sm leading-7 text-moss-700">
                    {compareTopMatches(hybridMatches[0], hybridMatches[1], Boolean(previewUrl))}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {hybridMatches.map((result, index) => (
                  <div
                    key={result.bird.name}
                    className="grid gap-4 rounded-[28px] border border-white bg-white p-4 shadow-sm lg:grid-cols-[280px_1fr]"
                  >
                    <div className="flex items-center justify-center rounded-[24px] bg-moss-50 p-3">
                      <img
                        src={result.bird.imageSrc}
                        alt={result.bird.imageAlt}
                        className="h-60 w-full rounded-[20px] bg-white/80 object-scale-down p-2"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">
                            候選 {index + 1}
                          </p>
                          <h4 className="mt-1 text-2xl font-semibold text-pine">{result.bird.name}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <div
                            className={`rounded-full px-3 py-1 text-xs font-medium ${result.confidenceTone}`}
                          >
                            符合度 {result.confidence}
                          </div>
                          <div className="rounded-full bg-moss-50 px-3 py-1 text-xs font-medium text-moss-700">
                            比對分數 {result.score}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm leading-7 text-moss-700">{result.bird.summary}</p>

                      <div className="grid gap-3 xl:grid-cols-2">
                        <div className="rounded-[20px] bg-moss-50 px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">棲地</p>
                          <p className="mt-2 text-sm leading-7 text-moss-900">
                            {result.bird.habitat}
                          </p>
                        </div>
                        <div className="rounded-[20px] bg-sand px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">辨識重點</p>
                          <p className="mt-2 text-sm leading-7 text-moss-900">
                            {result.bird.clue}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3 xl:grid-cols-2">
                        <div className="rounded-[20px] bg-sky/70 px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">為什麼會推薦牠</p>
                          <ul className="mt-2 space-y-2 text-sm leading-7 text-moss-900">
                            {result.matchedReasons.map((reason) => (
                              <li key={reason}>• {reason}</li>
                            ))}
                          </ul>
                          {result.photoReason ? (
                            <p className="mt-3 text-sm leading-7 text-moss-800">{result.photoReason}</p>
                          ) : null}
                        </div>
                        <div className="rounded-[20px] bg-rose-50 px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">下一步怎麼看</p>
                          <p className="mt-2 text-sm leading-7 text-moss-900">
                            {result.checkNext.length > 0
                              ? result.checkNext.join("、")
                              : result.bird.watchTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[24px] bg-pine px-5 py-4 text-sm leading-7 text-white/85">
                下面這一區是條件比對參考。若上方照片分析 API 有成功回傳，請優先看照片分析結果；這裡則適合拿來交叉比對環境、體型和特徵有沒有對上。
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-moss-200 pt-4">
            <div className="text-sm text-moss-600">
              Step {step} / {stepItems.length}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep((value) => Math.max(1, value - 1))}
                disabled={step === 1}
                className="rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 disabled:cursor-not-allowed disabled:opacity-45"
              >
                上一步
              </button>
              <button
                type="button"
                onClick={() => setStep((value) => Math.min(stepItems.length, value + 1))}
                disabled={step === stepItems.length || !canGoNext}
                className="rounded-full bg-moss-700 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
              >
                {step === stepItems.length ? "已到結果" : "下一步"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
