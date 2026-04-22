"use client";

import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { BirdAnalysisResult } from "@/components/assistant/bird-analysis-result";
import { BirdUploadForm } from "@/components/assistant/bird-upload-form";
import { HeroSection } from "@/components/assistant/hero-section";
import { ObservationCard } from "@/components/assistant/observation-card";
import { analyzeBird } from "@/lib/analyze-bird";
import { detectBirdBodyColors } from "@/lib/auto-color-detection";
import { detectBirdSizeFromImage } from "@/lib/auto-size-detection";
import { getBirdSizeLabel } from "@/lib/bird-size";
import {
  birdSizeOptions,
  colorOptions,
  defaultObservationForm,
  environmentOptions,
  sampleObservation,
} from "@/lib/assistant-mock-data";
import type { BirdAnalysisResponse, BirdObservationFormState } from "@/lib/assistant-types";

const loadingMessages = [
  "正在整理照片輪廓與整體色塊...",
  "正在把照片線索和你填寫的觀察條件交叉比對...",
  "正在生成候選鳥種、辨識理由與相似鳥種比較...",
];

const colorLabels: Record<string, string> = {
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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getEnvironmentLabel(value: string) {
  return environmentOptions.find((item) => item.value === value)?.label ?? value;
}

function getColorSummary(values: string[]) {
  if (values.length === 0) return "未填";
  return values.map((value) => colorLabels[value] ?? value).join("、");
}

export function AssistantExperience() {
  const [form, setForm] = useState<BirdObservationFormState>(defaultObservationForm);
  const [result, setResult] = useState<BirdAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const uploadPreviewRef = useRef<string | null>(null);
  const colorDetectionRunRef = useRef(0);

  useEffect(() => {
    if (!loading) {
      setLoadingMessage(loadingMessages[0]);
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[index]);
    }, 1100);

    return () => window.clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    return () => {
      if (uploadPreviewRef.current) {
        URL.revokeObjectURL(uploadPreviewRef.current);
      }
    };
  }, []);

  const selectedEnvironment = form.selectedEnvironment || form.environment;
  const environmentLabel = getEnvironmentLabel(selectedEnvironment);
  const finalSize = form.finalSelectedSize || form.userSelectedSize || form.size;
  const sizeLabel = getBirdSizeLabel(finalSize);

  function updateForm(updater: (current: BirdObservationFormState) => BirdObservationFormState) {
    setForm((current) => updater(current));
    setCopied(false);
    setError(null);
  }

  function handleEnvironmentChange(value: string) {
    updateForm((current) => ({ ...current, environment: value, selectedEnvironment: value }));
  }

  function handleSizeChange(value: BirdObservationFormState["size"]) {
    updateForm((current) => ({
      ...current,
      size: value,
      userSelectedSize: value,
      finalSelectedSize: value,
    }));
  }

  function handleToggleColor(value: string) {
    updateForm((current) => {
      const exists = current.colorTraits.includes(value);
      return {
        ...current,
        colorTraits: exists
          ? current.colorTraits.filter((item) => item !== value)
          : [...current.colorTraits, value],
        userAdjustedColors: current.userAdjustedColors.includes(value)
          ? current.userAdjustedColors
          : [...current.userAdjustedColors, value],
      };
    });
  }

  function resetUploadPreview() {
    if (uploadPreviewRef.current) {
      URL.revokeObjectURL(uploadPreviewRef.current);
      uploadPreviewRef.current = null;
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    resetUploadPreview();
    const previewUrl = URL.createObjectURL(file);
    const detectionRun = colorDetectionRunRef.current + 1;
    colorDetectionRunRef.current = detectionRun;
    uploadPreviewRef.current = previewUrl;

    setForm((current) => ({
      ...current,
      imagePreview: previewUrl,
      imageName: file.name,
      autoDetectedColors: [],
      userAdjustedColors: [],
      colorTraits: [],
      colorDetectionStatus: "detecting",
      colorDetectionConfidence: "",
      colorDetectionReason: "正在分析照片中央偏前景區域，嘗試避開天空、樹葉與水面等背景顏色...",
      autoDetectedSize: "",
      autoDetectedSizeConfidence: "",
      autoDetectedSizeReason: "正在根據照片中央鳥體輪廓、畫面佔比與外觀比例估計大小...",
      userSelectedSize: "",
      finalSelectedSize: "",
      size: "",
    }));
    setCopied(false);
    setError(null);
    setResult(null);
    event.target.value = "";

    void detectBirdBodyColors(file)
      .then((detection) => {
        setForm((current) => {
          if (colorDetectionRunRef.current !== detectionRun || current.imagePreview !== previewUrl) {
            return current;
          }

          return {
            ...current,
            autoDetectedColors: detection.colors,
            userAdjustedColors: [],
            colorTraits: detection.colors,
            colorDetectionStatus: detection.colors.length > 0 ? "done" : "limited",
            colorDetectionConfidence: detection.confidence,
            colorDetectionReason: detection.reason,
          };
        });
      })
      .catch(() => {
        setForm((current) => {
          if (colorDetectionRunRef.current !== detectionRun || current.imagePreview !== previewUrl) {
            return current;
          }

          return {
            ...current,
            autoDetectedColors: [],
            colorTraits: [],
            colorDetectionStatus: "failed",
            colorDetectionConfidence: "低",
            colorDetectionReason: "這張照片暫時無法自動偵測顏色，請直接手動選擇鳥體主色。",
          };
        });
      });

    void detectBirdSizeFromImage(file)
      .then((detection) => {
        setForm((current) => {
          if (colorDetectionRunRef.current !== detectionRun || current.imagePreview !== previewUrl) {
            return current;
          }

          return {
            ...current,
            autoDetectedSize: detection.size,
            autoDetectedSizeConfidence: detection.confidence,
            autoDetectedSizeReason: detection.reason,
            userSelectedSize: detection.size,
            finalSelectedSize: detection.size,
            size: detection.size,
          };
        });
      })
      .catch(() => {
        setForm((current) => {
          if (colorDetectionRunRef.current !== detectionRun || current.imagePreview !== previewUrl) {
            return current;
          }

          return {
            ...current,
            autoDetectedSize: "medium",
            autoDetectedSizeConfidence: "低",
            autoDetectedSizeReason: "照片暫時無法穩定估計大小，系統先保守預設為中型鳥；請依現場印象手動修正。",
            userSelectedSize: "medium",
            finalSelectedSize: "medium",
            size: "medium",
          };
        });
      });
  }

  async function runAnalysis(nextForm: BirdObservationFormState) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeBird(nextForm);
      setResult(response);
      window.setTimeout(() => scrollToId("analysis-result"), 80);
    } catch (analysisError) {
      setError(
        analysisError instanceof Error
          ? analysisError.message
          : "分析暫時沒有成功，請稍後再試一次，或先用範例資料看看結果版型。"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAnalyze() {
    void runAnalysis(form);
  }

  function handleReset() {
    resetUploadPreview();
    colorDetectionRunRef.current += 1;
    setForm(defaultObservationForm);
    setResult(null);
    setError(null);
    setCopied(false);
    scrollToId("assistant-form");
  }

  function applySampleData() {
    resetUploadPreview();
    colorDetectionRunRef.current += 1;
    setForm(sampleObservation);
    setCopied(false);
    setError(null);
  }

  function handleLoadSample() {
    applySampleData();
    setResult(null);
  }

  function handlePreviewSample() {
    applySampleData();
    scrollToId("assistant-form");
    void runAnalysis(sampleObservation);
  }

  async function handleCopy() {
    if (!result) return;

    const text = [
      `日期：${new Date().toLocaleDateString("zh-TW")}`,
      `環境：${environmentLabel || "未填"}`,
      `大小：${finalSize ? sizeLabel : "未填"}`,
      `顏色線索：${getColorSummary(form.colorTraits)}`,
      `推測鳥種：${result.combinedLikely ?? result.topMatch.chineseName}`,
      `英文名：${result.topMatch.englishName}`,
      `學名：${result.topMatch.scientificName}`,
      `特徵摘要：${result.observationSummary}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("目前無法直接複製文字，請改用下載紀錄。");
    }
  }

  function handleDownload() {
    if (!result) return;

    const text = [
      "賞鳥助手｜觀察紀錄",
      "",
      `日期：${new Date().toLocaleDateString("zh-TW")}`,
      `環境：${environmentLabel || "未填"}`,
      `大小：${finalSize ? sizeLabel : "未填"}`,
      `顏色線索：${getColorSummary(form.colorTraits)}`,
      `推測鳥種：${result.combinedLikely ?? result.topMatch.chineseName}`,
      `英文名：${result.topMatch.englishName}`,
      `學名：${result.topMatch.scientificName}`,
      `辨識信心程度：${result.topMatch.confidence}`,
      "",
      `觀察摘要：${result.observationSummary}`,
      "",
      "判斷依據：",
      ...result.topMatch.reasoning.map((item) => `- ${item}`),
      "",
      "延伸調查建議：",
      ...result.surveySuggestions.map((item) => `- ${item}`),
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = `${result.topMatch.chineseName}-${new Date().toISOString().slice(0, 10)}.txt`;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroSection onStart={() => scrollToId("assistant-form")} onPreviewSample={handlePreviewSample} />

      <BirdUploadForm
        form={form}
        environments={environmentOptions}
        sizeOptions={birdSizeOptions}
        colorOptions={colorOptions}
        loading={loading}
        loadingMessage={loadingMessage}
        onImageChange={handleImageChange}
        onEnvironmentChange={handleEnvironmentChange}
        onSizeChange={handleSizeChange}
        onToggleColor={handleToggleColor}
        onAnalyze={handleAnalyze}
        onReset={handleReset}
        onLoadSample={handleLoadSample}
      />

      <BirdAnalysisResult
        result={result}
        loading={loading}
        error={error}
        observationCard={
          <ObservationCard
            form={form}
            environmentLabel={environmentLabel}
            result={result}
            embedded
          />
        }
      />

      <section className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[36px] border border-moss-100 bg-white/92 p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">使用說明</p>
          <h2 className="section-title mt-3 text-pine">把 AI 結果當成學習起點，不是最後答案</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-moss-600">
            <p>
              這個工具特別適合學生、賞鳥初學者與自然觀察者快速整理線索。你可以先用照片拿到第一輪候選，再靠環境與顏色色塊把答案逐步縮小。
            </p>
            <p>
              AI 辨識僅供參考，仍建議搭配更多照片、聲音與現地觀察確認。若結果不夠明確，請把它理解成「下一步該看哪裡」的提示，而不是百分之百正確的結論。
            </p>
          </div>
        </div>

        <div className="rounded-[36px] border border-moss-100 bg-[linear-gradient(180deg,rgba(220,236,242,0.78),rgba(255,255,255,0.96))] p-6 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">工具定位</p>
          <h2 className="section-title mt-3 text-pine">為台灣使用者打造的自然探索流程</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-moss-700">
            <p>這一版把輸入方式縮成最直覺的四件事：照片、大小、環境、顏色。整體操作更接近辨識工具，而不是填很多文字的問卷。</p>
            <p>分析時會優先以照片為主，再把大小、環境與顏色當輔助線索；如果仍不確定，就清楚保留為候選清單，不會假裝只有一個精準答案。</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-moss-700 shadow-sm">白色・森林綠・霧藍・米色</span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-moss-700 shadow-sm">高質感自然探索工具</span>
          </div>
        </div>
      </section>
    </div>
  );
}
