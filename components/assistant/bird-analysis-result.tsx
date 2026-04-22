import type { ReactNode } from "react";

import { AnalysisResult } from "@/components/assistant/analysis-result";
import type { BirdAnalysisResponse } from "@/lib/assistant-types";

export function BirdAnalysisResult({
  result,
  loading,
  error,
  observationCard,
}: {
  result: BirdAnalysisResponse | null;
  loading: boolean;
  error: string | null;
  observationCard?: ReactNode;
}) {
  return <AnalysisResult result={result} loading={loading} error={error} observationCard={observationCard} />;
}
