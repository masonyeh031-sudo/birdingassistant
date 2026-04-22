export type EntryMode = "photo" | "conditions" | "journal";
export type BirdSizeValue = "small" | "small-medium" | "medium" | "medium-large" | "large";
export type BirdSizeSelection = BirdSizeValue | "";

export type BirdFeature = {
  value: string;
  label: string;
  description: string;
  hex?: string;
};

export type BirdSizeOption = {
  value: BirdSizeValue;
  label: string;
  description: string;
  example: string;
  silhouetteScale: number;
};

export type AutoColorDetectionStatus = "idle" | "detecting" | "done" | "limited" | "failed";

export type BirdObservationFormState = {
  imagePreview: string | null;
  imageName: string;
  environment: string;
  selectedEnvironment: string;
  size: BirdSizeSelection;
  autoDetectedSize: BirdSizeSelection;
  autoDetectedSizeConfidence: "高" | "中" | "低" | "";
  autoDetectedSizeReason: string;
  userSelectedSize: BirdSizeSelection;
  finalSelectedSize: BirdSizeSelection;
  colorTraits: string[];
  autoDetectedColors: string[];
  userAdjustedColors: string[];
  colorDetectionStatus: AutoColorDetectionStatus;
  colorDetectionConfidence: "高" | "中" | "低" | "";
  colorDetectionReason: string;
};

export type BirdAnalysisMatch = {
  chineseName: string;
  englishName: string;
  scientificName: string;
  confidence: string;
  reasoning: string[];
};

export type SimilarSpeciesNote = {
  chineseName: string;
  note: string;
  compareFocus: string;
};

export type EliminatedCandidateNote = {
  chineseName: string;
  reason: string;
};

export type BirdAnalysisResponse = {
  topMatch: BirdAnalysisMatch;
  alternatives: BirdAnalysisMatch[];
  initialCandidates?: BirdAnalysisMatch[];
  isCloseCall?: boolean;
  combinedLikely?: string;
  likelyGroup?: string;
  uncertaintyFactors?: string[];
  rankingChangeNote?: string;
  eliminatedCandidates?: EliminatedCandidateNote[];
  photoQuality?: "clear" | "limited";
  photoIssues?: string[];
  needsMorePhotos?: boolean;
  description: string;
  habitat: string;
  diet: string;
  behavior: string;
  commonnessTaiwan: string;
  similarSpecies: SimilarSpeciesNote[];
  observationSummary: string;
  surveySuggestions: string[];
  analysisModeNote?: string;
  keyFeatures?: string[];
  environmentFit?: string;
  sizeFit?: string;
  colorFit?: string;
  autoColorSummary?: string;
  colorInfluenceSummary?: string;
  manualColorImpact?: string;
  decisiveFactor?: string;
  missingInfo?: string[];
  suggestedPhotos?: string[];
};

export type BirdProfile = BirdAnalysisResponse & {
  imageSrc: string;
  imageAlt: string;
  environments: string[];
  colorTraits: string[];
  visualTraits: string[];
};
