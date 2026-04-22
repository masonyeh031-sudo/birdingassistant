import { birdProfiles } from "@/lib/assistant-mock-data";
import {
  getBirdSizeBucket,
  getBirdSizeDistance,
  getBirdSizeLabel,
  getBirdSizeScore,
} from "@/lib/bird-size";
import type {
  BirdAnalysisMatch,
  BirdAnalysisResponse,
  BirdObservationFormState,
  BirdProfile,
  EliminatedCandidateNote,
} from "@/lib/assistant-types";
import { birdCards } from "@/lib/home-data";

type ApiCandidate = {
  name: string;
  confidence: "高" | "中" | "低";
  reason: string;
};

type ApiBirdIdResponse = {
  mode?: "api" | "fallback";
  engineNote?: string;
  summary?: string;
  likelyGroup?: string;
  uncertaintyFactors?: string[];
  initialCandidates?: ApiCandidate[];
  rerankSummary?: string;
  eliminatedCandidates?: Array<{ name: string; reason: string }>;
  photoClues?: string[];
  photoQuality?: "clear" | "limited";
  photoIssues?: string[];
  bestFocusArea?: string;
  photoHelp?: string;
  comparisonReason?: string;
  candidates?: ApiCandidate[];
  error?: string;
};

function getAutoColorSummary(form: BirdObservationFormState) {
  if (form.autoDetectedColors.length === 0) {
    return "系統沒有自動預設顏色，代表照片主體顏色可能太小、太模糊或背景干擾較大。";
  }

  return `系統自動預設 ${form.autoDetectedColors.map(labelForColor).join("、")}，原因：${form.colorDetectionReason}`;
}

function getManualColorImpact(form: BirdObservationFormState) {
  if (form.userAdjustedColors.length === 0) {
    return "使用者尚未手動調整顏色，因此目前以 AI 預設色塊作為最終顏色。";
  }

  const finalColors = form.colorTraits.map(labelForColor).join("、") || "未選擇";
  const changedColors = form.userAdjustedColors.map(labelForColor).join("、");

  return `使用者手動調整了 ${changedColors}；最終送出的顏色為 ${finalColors}，辨識排序會以這組顏色為準。`;
}

function getColorInfluenceSummary(form: BirdObservationFormState) {
  if (form.autoDetectedColors.length === 0) {
    return "沒有明顯影響。這次沒有可靠的 AI 預設顏色，排序主要依照片輪廓、鳥類大小與環境。";
  }

  const autoColors = form.autoDetectedColors.map(labelForColor).join("、");
  const finalColors = form.colorTraits.map(labelForColor).join("、") || "未選擇";
  const removedAutoColors = form.autoDetectedColors.filter(
    (color) => !form.colorTraits.includes(color)
  );
  const addedColors = form.colorTraits.filter(
    (color) => !form.autoDetectedColors.includes(color)
  );

  if (removedAutoColors.length === 0 && addedColors.length === 0) {
    return `有輔助影響。AI 預設的 ${autoColors} 已直接作為最終色塊，但顏色只參與後段排序，不會蓋過照片輪廓、體型、嘴型與腿長。`;
  }

  return `有被使用者修正。AI 原本建議 ${autoColors}，最後確認為 ${finalColors}；排序會以使用者最終顏色為準，並重新檢查是否和大小、環境與照片輪廓一致。`;
}

function getFinalSelectedSize(form: BirdObservationFormState) {
  return form.finalSelectedSize || form.userSelectedSize || form.size;
}

function getDecisiveFactor(form: BirdObservationFormState) {
  const finalSize = getFinalSelectedSize(form);

  if (finalSize) {
    return `最影響排序的是照片輪廓、類群判斷、鳥類大小「${labelForSize(finalSize)}」與環境「${labelForEnvironment(getSelectedEnvironment(form))}」；嘴型、腿長與最終色塊再用來縮小候選。`;
  }

  return `最影響排序的是照片輪廓、類群判斷與環境「${labelForEnvironment(getSelectedEnvironment(form))}」；因為尚未選擇鳥類大小，嘴型、腿長與顏色會再作為後段輔助。`;
}

const colorMap: Record<string, string[]> = {
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

const groupByBirdName: Record<string, string> = {
  "白頭翁": "鶯 / 鶲 / 小型雀形目",
  "綠繡眼": "繡眼 / 小型樹棲鳥",
  "珠頸斑鳩": "鳩鴿類",
  "小白鷺": "鷺鷥 / 鷺科",
  "黑冠麻鷺": "鷺鷥 / 鷺科",
  "翠鳥": "其他",
  "某種猛禽": "猛禽",
  "某種水鳥": "水鳥 / 雁鴨",
  "某種鷺科": "鷺鷥 / 鷺科",
  "某種鷸鴴": "鷸鴴 / 濱鳥",
  "某種鳩鴿類": "鳩鴿類",
  "某種鴉科": "鴉科",
  "某種啄木鳥": "啄木鳥",
  "某種繡眼或小型樹棲鳥": "繡眼 / 小型樹棲鳥",
  "某種鶯鶲或小型雀形目": "鶯 / 鶲 / 小型雀形目",
  "某種八哥椋鳥": "八哥 / 椋鳥",
  "某種秧雞或水雞類": "鷺鶴 / 秧雞 / 水雞類",
};

const genericCandidateMetadata: Record<
  string,
  { englishName: string; scientificName: string; description: string }
> = {
  "某種猛禽": {
    englishName: "Raptor sp.",
    scientificName: "Accipitriformes/Falconiformes sp.",
    description: "目前較像猛禽類，但照片不足以穩定細分到種。",
  },
  "某種水鳥": {
    englishName: "Waterbird sp.",
    scientificName: "Anseriformes/Waterbird sp.",
    description: "目前較像水鳥，但仍需要更多角度才能縮到特定鳥種。",
  },
  "某種鷺科": {
    englishName: "Heron/Egret sp.",
    scientificName: "Ardeidae sp.",
    description: "目前可先判定為鷺科，但還不足以穩定分到特定鷺鷥。",
  },
  "某種鷸鴴": {
    englishName: "Shorebird sp.",
    scientificName: "Charadriiformes sp.",
    description: "目前較接近鷸鴴或濱鳥類，但種級辨識仍不足。",
  },
  "某種鳩鴿類": {
    englishName: "Dove/Pigeon sp.",
    scientificName: "Columbidae sp.",
    description: "照片輪廓與站姿偏鳩鴿類，但還需要更多細節。",
  },
  "某種鴉科": {
    englishName: "Crow/Jay sp.",
    scientificName: "Corvidae sp.",
    description: "目前可先收斂到鴉科，還需更多比例與嘴型線索。",
  },
  "某種啄木鳥": {
    englishName: "Woodpecker sp.",
    scientificName: "Picidae sp.",
    description: "目前較像啄木鳥，但照片不足以穩定細分。",
  },
  "某種繡眼或小型樹棲鳥": {
    englishName: "White-eye/Small tree bird sp.",
    scientificName: "Passeriformes sp.",
    description: "目前較像繡眼或其他小型樹棲鳥，還需要更清楚頭部特徵。",
  },
  "某種鶯鶲或小型雀形目": {
    englishName: "Warbler/Flycatcher sp.",
    scientificName: "Passeriformes sp.",
    description: "目前較接近小型雀形目，但無法安全縮到單一種。",
  },
  "某種八哥椋鳥": {
    englishName: "Myna/Starling sp.",
    scientificName: "Sturnidae sp.",
    description: "目前較像八哥或椋鳥類，但仍建議補拍頭部與嘴腳細節。",
  },
  "某種秧雞或水雞類": {
    englishName: "Rail/Moorhen sp.",
    scientificName: "Rallidae sp.",
    description: "目前較像秧雞或水雞類，但照片還不夠清楚。",
  },
};

function mapEnvironmentToProfileKeys(value: string) {
  const map: Record<string, string[]> = {
    urban: ["residential", "urban-park", "campus"],
    park: ["urban-park", "campus", "residential"],
    mountain: ["mountain-trail", "forest"],
    grassland: ["farmland-grassland", "urban-park"],
    shrubland: ["forest", "mountain-trail", "farmland-grassland"],
    farmland: ["farmland-grassland"],
    pond_lake: ["pond-lake", "wetland", "river-stream"],
    river_stream: ["river-stream", "pond-lake", "wetland"],
    estuary_mudflat: ["estuary-flat", "seaside", "wetland"],
    coast: ["seaside", "estuary-flat", "wetland"],
    ocean: ["seaside", "estuary-flat"],
    "urban-park": ["urban-park", "campus", "residential"],
    campus: ["campus", "urban-park", "residential"],
    residential: ["residential", "urban-park", "campus"],
    forest: ["forest", "mountain-trail"],
    "mountain-trail": ["mountain-trail", "forest"],
    wetland: ["wetland", "pond-lake", "river-stream", "estuary-flat"],
    "pond-lake": ["pond-lake", "wetland", "river-stream"],
    "river-stream": ["river-stream", "pond-lake", "wetland"],
    "farmland-grassland": ["farmland-grassland", "urban-park"],
    seaside: ["seaside", "estuary-flat", "wetland"],
    "estuary-flat": ["estuary-flat", "seaside", "wetland"],
  };

  return map[value] ?? [value];
}

function mapEnvironmentToApiHabitat(value: string) {
  const map: Record<string, string> = {
    urban: "urban",
    park: "park",
    mountain: "forest-edge",
    grassland: "park",
    shrubland: "forest-edge",
    farmland: "park",
    pond_lake: "water",
    river_stream: "water",
    estuary_mudflat: "water",
    coast: "water",
    ocean: "water",
    "urban-park": "park",
    campus: "urban",
    residential: "urban",
    forest: "forest-edge",
    "mountain-trail": "forest-edge",
    wetland: "water",
    "pond-lake": "water",
    "river-stream": "water",
    "farmland-grassland": "water",
    seaside: "water",
    "estuary-flat": "water",
  };

  return map[value] ?? "park";
}

function labelForEnvironment(value: string) {
  const labels: Record<string, string> = {
    urban: "都市",
    park: "公園",
    mountain: "山區",
    grassland: "草地",
    shrubland: "灌叢",
    farmland: "農田",
    pond_lake: "池塘 / 湖泊",
    river_stream: "河川 / 溪流",
    estuary_mudflat: "河口 / 灘地",
    coast: "海岸",
    ocean: "海洋",
    "urban-park": "都市公園",
    campus: "校園",
    residential: "住宅區 / 都市",
    forest: "森林",
    "mountain-trail": "山區步道",
    wetland: "濕地",
    "pond-lake": "池塘 / 湖泊",
    "river-stream": "河川 / 溪流",
    "farmland-grassland": "農田 / 草地",
    seaside: "海邊",
    "estuary-flat": "河口 / 灘地",
  };

  return labels[value] ?? value;
}

function labelForColor(value: string) {
  const labels: Record<string, string> = {
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

  return labels[value] ?? value;
}

function labelForSize(value: BirdObservationFormState["size"]) {
  return value ? getBirdSizeLabel(value) : "未填";
}

function getSelectedEnvironment(form: BirdObservationFormState) {
  return form.selectedEnvironment || form.environment;
}

function buildSizeFit(name: string, selectedSize: BirdObservationFormState["size"]) {
  if (!selectedSize) {
    return "目前沒有選擇鳥類大小，所以大小不參與這次重排。";
  }

  const candidateSize = getBirdSizeBucket(name, findBirdCard(name)?.matcherTraits);
  const distance = getBirdSizeDistance(selectedSize, candidateSize);
  const selectedLabel = getBirdSizeLabel(selectedSize);
  const candidateLabel = getBirdSizeLabel(candidateSize);

  if (distance === 0) {
    return `你選的是「${selectedLabel}」，${name} 約屬「${candidateLabel}」，大小吻合，因此會提高排名。`;
  }

  if (distance === 1) {
    return `你選的是「${selectedLabel}」，${name} 約屬「${candidateLabel}」，大小接近但仍需回頭看照片比例。`;
  }

  return `你選的是「${selectedLabel}」，但 ${name} 約屬「${candidateLabel}」，大小明顯有落差，系統會主動降權。`;
}

function toConfidence(score: number) {
  if (score >= 14) return "高";
  if (score >= 8) return "中";
  return "低";
}

function findProfile(name: string) {
  return birdProfiles.find((profile) => profile.topMatch.chineseName === name);
}

function findBirdCard(name: string) {
  return birdCards.find((bird) => bird.name === name);
}

function inferLikelyGroup(name: string) {
  return groupByBirdName[name];
}

function normalizeMatch(match: BirdAnalysisMatch, score: number, extraReasons: string[]) {
  return {
    ...match,
    confidence: toConfidence(score),
    reasoning: Array.from(new Set([...match.reasoning, ...extraReasons])).slice(0, 4),
  };
}

function buildCombinedLikely(topName: string, secondName?: string) {
  return secondName ? `最可能為 ${topName} 或 ${secondName}` : `最可能為 ${topName}`;
}

function toEliminatedCandidates(
  initialCandidates: BirdAnalysisMatch[] | undefined,
  topNames: string[]
): EliminatedCandidateNote[] | undefined {
  const eliminated = (initialCandidates ?? []).filter(
    (candidate) => !topNames.includes(candidate.chineseName)
  );

  if (eliminated.length === 0) return undefined;

  return eliminated.map((candidate) => ({
    chineseName: candidate.chineseName,
    reason: "加入使用者條件後，這個候選在體型、環境、棲地或顏色線索上不如前 3 名合理。",
  }));
}

function photoIssueGuidance(issue: string) {
  const map: Record<string, string> = {
    "主體太小": "鳥體在畫面裡太小，請靠近或裁切出更明確的全身比例。",
    模糊: "照片有明顯模糊，請優先補拍清楚的停棲瞬間。",
    逆光: "這張照片逆光較重，建議換光線方向再拍一次。",
    遮擋: "主體被葉片、枝條或其他物體遮住，請嘗試補拍無遮擋角度。",
    "角度不足": "目前角度不足，請補拍正面、側面或尾羽更清楚的角度。",
  };

  return map[issue] ?? issue;
}

function scoreProfile(profile: BirdProfile, form: BirdObservationFormState) {
  let score = 0;
  const reasoning: string[] = [];
  const candidateSize = getBirdSizeBucket(profile.topMatch.chineseName);
  const finalSize = getFinalSelectedSize(form);

  if (finalSize) {
    const sizeScore = getBirdSizeScore(finalSize, candidateSize);
    score += sizeScore;
    if (sizeScore > 0) {
      reasoning.push(`體型比例接近你最後確認的「${labelForSize(finalSize)}」。`);
    } else if (sizeScore < 0) {
      reasoning.push(`和你最後確認的「${labelForSize(finalSize)}」在體型上有明顯落差。`);
    }
  }

  const environmentMatches = mapEnvironmentToProfileKeys(getSelectedEnvironment(form));
  if (environmentMatches.some((item) => profile.environments.includes(item))) {
    score += 7;
    reasoning.push(`觀察環境和 ${profile.topMatch.chineseName} 常見棲地相近。`);
  } else {
    score -= 8;
    reasoning.push(`你選的環境和 ${profile.topMatch.chineseName} 常見棲地不太吻合，因此已降權。`);
  }

  const matchedColors = form.colorTraits.filter((color) => profile.colorTraits.includes(color));
  if (matchedColors.length > 0) {
    score += matchedColors.length * 3;
    reasoning.push(`照片與你選的色塊中，有 ${matchedColors.length} 個主色和這個候選吻合。`);
  }

  if (form.imagePreview) {
    score += 3;
    reasoning.push("已先以照片做第一輪排序，再用大小、環境與色塊做微調。");
  }

  return { profile, score, reasoning };
}

function buildGenericResultFromCard(name: string, confidence: string, reasoning: string[]) {
  const profile = findProfile(name);
  const card = findBirdCard(name);
  const generic = genericCandidateMetadata[name];

  return {
    chineseName: name,
    englishName: profile?.topMatch.englishName ?? generic?.englishName ?? "Taiwan common bird",
    scientificName: profile?.topMatch.scientificName ?? generic?.scientificName ?? "Needs confirmation",
    confidence,
    reasoning:
      reasoning.length > 0
        ? reasoning
        : [card?.clue ?? generic?.description ?? "目前先依照片與環境線索綜合判斷，建議再對照鳥類卡片確認。"],
  };
}

function buildLocalResponse(form: BirdObservationFormState): BirdAnalysisResponse {
  const finalSize = getFinalSelectedSize(form);
  const ranked = birdProfiles
    .map((profile) => scoreProfile(profile, form))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0]?.profile ?? birdProfiles[0];
  const topScore = ranked[0]?.score ?? 0;
  const topReasoning = ranked[0]?.reasoning ?? [];

  const alternativeMatches = ranked
    .slice(1, 3)
    .map((item) => normalizeMatch(item.profile.topMatch, item.score, item.reasoning));
  const initialCandidates = ranked
    .slice(0, 5)
    .map((item) => normalizeMatch(item.profile.topMatch, item.score, item.reasoning));
  const secondScore = ranked[1]?.score ?? 0;
  const secondName = ranked[1]?.profile.topMatch.chineseName;
  const isCloseCall = Boolean(secondName) && topScore - secondScore <= 2;

  return {
    topMatch: normalizeMatch(top.topMatch, topScore, topReasoning),
    alternatives: alternativeMatches,
    initialCandidates,
    isCloseCall,
    combinedLikely: isCloseCall ? buildCombinedLikely(top.topMatch.chineseName, secondName) : undefined,
    likelyGroup: inferLikelyGroup(top.topMatch.chineseName),
    uncertaintyFactors: topScore <= 0 ? ["目前主要只靠少量輔助線索，還沒有穩定的照片證據。"] : undefined,
    rankingChangeNote: `目前沒有啟用影像模型，所以這次以站內資料做保守排序；環境「${labelForEnvironment(getSelectedEnvironment(form))}」已作為重要篩選條件，環境不符的候選會被降權。`,
    eliminatedCandidates: toEliminatedCandidates(initialCandidates, [
      top.topMatch.chineseName,
      ...alternativeMatches.map((item) => item.chineseName),
    ]),
    description: top.description,
    habitat: top.habitat,
    diet: top.diet,
    behavior: top.behavior,
    commonnessTaiwan: top.commonnessTaiwan,
    similarSpecies: top.similarSpecies,
    observationSummary: `${top.topMatch.chineseName} 目前是最值得先比對的方向，但這份結果仍偏保守，建議把它理解成第一輪候選而不是唯一答案。`,
    surveySuggestions: [
      "若要提高信心，請補拍正面或側面全身照。",
      "若鳥體在照片裡偏小或逆光，請再拍一張更接近主體的照片。",
      "若第一名和第二名很接近，請優先回頭比較頭部花紋、嘴型與尾巴比例。",
    ],
    analysisModeNote: form.imagePreview
      ? "目前先以本地輔助模式綜合照片、大小、環境與色塊做排序。"
      : "目前還沒有照片，所以這只是依大小、環境與色塊做的保守候選清單。",
    keyFeatures: top.visualTraits,
    environmentFit: `你選的是「${labelForEnvironment(getSelectedEnvironment(form))}」，這和 ${top.topMatch.chineseName} 的常見環境${mapEnvironmentToProfileKeys(getSelectedEnvironment(form)).some((item) => top.environments.includes(item)) ? "相當吻合，因此提高排名" : "不完全吻合，因此系統已把環境衝突納入降權"}。`,
    sizeFit: buildSizeFit(top.topMatch.chineseName, finalSize),
    colorFit:
      form.colorTraits.length > 0
        ? `你勾選了 ${form.colorTraits.map(labelForColor).join("、")}；這些色塊只作為輔助，仍以照片裡真正看得到的主色分布為主。`
        : "目前沒有顏色線索，所以結果主要依照片整體輪廓與環境縮小。",
    autoColorSummary: getAutoColorSummary(form),
    colorInfluenceSummary: getColorInfluenceSummary(form),
    manualColorImpact: getManualColorImpact(form),
    decisiveFactor: getDecisiveFactor(form),
    missingInfo: ["頭部特寫", "側面全身比例", "尾羽與腿部線條"],
    suggestedPhotos: ["正面照", "側面全身照", "尾羽與腳部特寫"],
  };
}

function transformApiResult(apiResult: ApiBirdIdResponse, form: BirdObservationFormState): BirdAnalysisResponse {
  const finalSize = getFinalSelectedSize(form);
  const candidates = (apiResult.candidates ?? []).slice(0, 3);
  const topCandidate = candidates[0];
  const limitedPhoto =
    apiResult.photoQuality === "limited" || (apiResult.photoIssues?.length ?? 0) > 0;

  if (!topCandidate) {
    return buildLocalResponse(form);
  }

  const topProfile = findProfile(topCandidate.name);
  const topCard = findBirdCard(topCandidate.name);
  const secondCandidate = candidates[1];
  const photoIssueMessages = (apiResult.photoIssues ?? []).map(photoIssueGuidance);
  const initialCandidates = (apiResult.initialCandidates ?? [])
    .slice(0, 5)
    .map((candidate) =>
      buildGenericResultFromCard(candidate.name, candidate.confidence, [candidate.reason])
    );
  const alternatives = candidates.slice(1, 3).map((candidate) =>
    buildGenericResultFromCard(candidate.name, candidate.confidence, [candidate.reason])
  );
  const isCloseCall =
    Boolean(secondCandidate) &&
    topCandidate.confidence === secondCandidate?.confidence;
  const initialTopName = initialCandidates[0]?.chineseName;
  const rankingChangeNote =
    initialTopName && initialTopName !== topCandidate.name
      ? `照片初判一開始比較像 ${initialTopName}，但加入你提供的條件後，${topCandidate.name} 在體型、環境或顏色線索上更合理，所以最後被排到第一。`
      : `照片初判和條件重排後的第一名都偏向 ${topCandidate.name}，代表照片特徵和你提供的條件大致一致。`;
  const eliminatedCandidates =
    apiResult.eliminatedCandidates?.map((item) => ({
      chineseName: item.name,
      reason: item.reason,
    })) ??
    toEliminatedCandidates(initialCandidates, [
      topCandidate.name,
      ...alternatives.map((item) => item.chineseName),
    ]);

  return {
    topMatch: buildGenericResultFromCard(topCandidate.name, topCandidate.confidence, [topCandidate.reason]),
    alternatives,
    initialCandidates,
    isCloseCall,
    combinedLikely: isCloseCall
      ? buildCombinedLikely(topCandidate.name, secondCandidate?.name)
      : undefined,
    likelyGroup: apiResult.likelyGroup ?? inferLikelyGroup(topCandidate.name),
    uncertaintyFactors:
      apiResult.uncertaintyFactors ??
      (limitedPhoto ? ["照片本身仍不足以穩定排除相似種。"] : undefined),
    rankingChangeNote: apiResult.rerankSummary ?? rankingChangeNote,
    eliminatedCandidates,
    description:
      topProfile?.description ??
      topCard?.summary ??
      "目前先保留為第一候選，仍建議把它和另外兩個候選並排比較。",
    habitat: topProfile?.habitat ?? topCard?.habitat ?? "請再搭配現地觀察確認常見棲地。",
    diet: topProfile?.diet ?? "目前以常見食性作為參考。",
    behavior: topProfile?.behavior ?? topCard?.behavior ?? "請再回頭確認停棲姿勢與行為。",
    commonnessTaiwan:
      topProfile?.commonnessTaiwan ?? "已優先以台灣常見鳥種作為候選，不會優先猜非常見外國鳥種。",
    photoQuality: apiResult.photoQuality,
    photoIssues: apiResult.photoIssues,
    needsMorePhotos: limitedPhoto || topCandidate.confidence === "低",
    similarSpecies:
      topProfile?.similarSpecies ??
      alternatives.map((item) => ({
        chineseName: item.chineseName,
        note: `${item.chineseName} 目前也在候選中，代表照片還不足以完全排除。`,
        compareFocus: "建議優先看嘴型、腿長、頭部花紋與尾巴比例。",
      })),
    observationSummary:
      apiResult.summary ??
      `${topCandidate.name} 目前排第一，但這次仍應理解成候選排序，而不是絕對正確答案。`,
    surveySuggestions: Array.from(
      new Set([
        ...(limitedPhoto
          ? photoIssueMessages
          : []),
        apiResult.bestFocusArea ?? "建議補拍正面與側面，尤其是頭部與嘴型。",
        apiResult.photoHelp ?? "若照片主體偏小或模糊，請改用更近、更亮的照片。",
        apiResult.comparisonReason ?? "若還不確定，請直接比對第一名與第二名的頭部與體型差異。",
      ])
    ),
    analysisModeNote:
      apiResult.mode === "api"
        ? apiResult.engineNote ??
          (limitedPhoto
            ? "這次先分析照片，但因為照片品質有限，結果會偏保守並優先提示補拍。"
            : "這次先分析照片，再用大小、環境與色塊做輔助排序。")
        : apiResult.engineNote ?? "這次先改用站內輔助模式。",
    keyFeatures:
      apiResult.photoClues?.slice(0, 4) ??
      topProfile?.visualTraits ??
      [topCard?.clue ?? "建議先回頭觀察照片裡的主要外觀線索。"],
    environmentFit: `你選的是「${labelForEnvironment(getSelectedEnvironment(form))}」，系統會把環境當成實際篩選條件；若候選鳥種和這個環境明顯衝突，就會被降權或淘汰。`,
    sizeFit: buildSizeFit(topCandidate.name, finalSize),
    colorFit:
      form.colorTraits.length > 0
        ? `你勾選的色塊有 ${form.colorTraits.map(labelForColor).join("、")}；顏色會輔助縮小候選，但不會凌駕體型、輪廓與環境。`
        : "目前沒有顏色輔助線索，所以系統主要依照片與環境來排序。",
    autoColorSummary: getAutoColorSummary(form),
    colorInfluenceSummary: getColorInfluenceSummary(form),
    manualColorImpact: getManualColorImpact(form),
    decisiveFactor: getDecisiveFactor(form),
    missingInfo: limitedPhoto
      ? Array.from(
          new Set([
            ...photoIssueMessages,
            "頭部花紋是否清楚",
            "嘴型與腿長比例",
          ])
        )
      : topCandidate.confidence === "高"
        ? ["若想更穩定排除相似種，仍建議補拍頭部與側面。"]
        : ["鳥體主體太小時的全身比例", "正面頭部花紋", "嘴部與腳部細節"],
    suggestedPhotos: limitedPhoto
      ? ["更接近主體的全身照", "正面頭部照", "側面比例照", "嘴部與腳部特寫"]
      : topCandidate.confidence === "高"
        ? ["側面全身照", "頭部近照"]
        : ["正面照", "側面全身照", "嘴部與腳部特寫"],
  };
}

async function analyzeWithApi(form: BirdObservationFormState) {
  const finalSize = getFinalSelectedSize(form);

  const response = await fetch("/api/bird-id", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imageDataUrl: form.imagePreview,
      habitat: mapEnvironmentToApiHabitat(getSelectedEnvironment(form)),
      environmentKey: getSelectedEnvironment(form),
      selectedEnvironment: getSelectedEnvironment(form),
      environmentLabel: labelForEnvironment(getSelectedEnvironment(form)),
      size: finalSize || undefined,
      autoDetectedSize: form.autoDetectedSize || undefined,
      autoDetectedSizeConfidence: form.autoDetectedSizeConfidence || undefined,
      autoDetectedSizeReason: form.autoDetectedSizeReason || undefined,
      userSelectedSize: form.userSelectedSize || undefined,
      finalSelectedSize: finalSize || undefined,
      traits: form.colorTraits,
      autoDetectedColors: form.autoDetectedColors,
      userAdjustedColors: form.userAdjustedColors,
      finalSelectedColors: form.colorTraits,
      colorDetectionConfidence: form.colorDetectionConfidence,
      colorDetectionReason: form.colorDetectionReason,
    }),
  });

  const payload = (await response.json()) as ApiBirdIdResponse;
  if (!response.ok) {
    throw new Error(payload.error || "照片分析暫時失敗，請稍後再試一次。");
  }

  return transformApiResult(payload, form);
}

export async function analyzeBird(form: BirdObservationFormState): Promise<BirdAnalysisResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (form.imagePreview) {
    try {
      return await analyzeWithApi(form);
    } catch {
      return buildLocalResponse(form);
    }
  }

  return buildLocalResponse(form);
}
