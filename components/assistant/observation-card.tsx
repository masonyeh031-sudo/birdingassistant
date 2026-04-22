"use client";

import { useEffect, useRef, useState } from "react";

import { getBirdSizeLabel } from "@/lib/bird-size";
import { downloadNodeAsJpeg, downloadNodeAsPdf } from "@/lib/observation-card-export";
import type { BirdObservationFormState, BirdAnalysisResponse } from "@/lib/assistant-types";

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

export function ObservationCard({
  form,
  environmentLabel,
  result,
  embedded = false,
}: {
  form: BirdObservationFormState;
  environmentLabel: string;
  result: BirdAnalysisResponse | null;
  embedded?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [exporting, setExporting] = useState<"jpg" | "pdf" | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [editableText, setEditableText] = useState("");
  const [copied, setCopied] = useState(false);
  const recordDate = new Date().toLocaleDateString("zh-TW");
  const finalSize = form.finalSelectedSize || form.userSelectedSize || form.size;
  const sizeSummary = finalSize ? getBirdSizeLabel(finalSize) : "未填";
  const colorSummary =
    form.colorTraits.length > 0
      ? form.colorTraits.map((item) => colorLabels[item] ?? item).join("、")
      : "未填";
  const lines = result
    ? [
        `日期：${recordDate}`,
        `環境：${environmentLabel || "未填"}`,
        `大小：${sizeSummary}`,
        `顏色線索：${colorSummary}`,
        `推測鳥種：${result.combinedLikely ?? result.topMatch.chineseName}`,
        `特徵摘要：${result.observationSummary}`,
      ]
    : [];

  useEffect(() => {
    setEditableText(result ? lines.join("\n") : "");
    setCopied(false);
  }, [result, environmentLabel, sizeSummary, colorSummary, recordDate]);

  async function handleCopyEditedText() {
    if (!result || !editableText.trim()) return;

    try {
      await navigator.clipboard.writeText(editableText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setExportError("目前無法直接複製文字，請改用下載文字。");
    }
  }

  function handleDownloadEditedText() {
    if (!result || !editableText.trim()) return;

    const safeName = (result.combinedLikely ?? result.topMatch.chineseName)
      .replace(/\s+/g, "-")
      .replace(/[\\/:*?"<>|]/g, "");
    const blob = new Blob([editableText], { type: "text/plain;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = objectUrl;
    anchor.download = `${safeName || "觀察紀錄"}-${new Date().toISOString().slice(0, 10)}.txt`;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }

  async function handleExport(type: "jpg" | "pdf") {
    if (!result || !cardRef.current) return;

    setExporting(type);
    setExportError(null);

    try {
      const safeName = (result.combinedLikely ?? result.topMatch.chineseName)
        .replace(/\s+/g, "-")
        .replace(/[\\/:*?"<>|]/g, "");
      const baseName = `${safeName}-${new Date().toISOString().slice(0, 10)}`;

      if (type === "jpg") {
        await downloadNodeAsJpeg(cardRef.current, `${baseName}.jpg`);
      } else {
        await downloadNodeAsPdf(cardRef.current, `${baseName}.pdf`);
      }
    } catch {
      setExportError("目前無法輸出這張野外筆記卡，請稍後再試一次。");
    } finally {
      setExporting(null);
    }
  }

  return (
    <section className={embedded ? "mt-0" : "mt-10"}>
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">
          觀察紀錄卡區
        </p>
        <h2 className="section-title mt-3 text-pine">把這次觀察整理成一張野外筆記卡</h2>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div
          ref={cardRef}
          className="rounded-[36px] border border-moss-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,240,227,0.92))] p-6 shadow-card"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss-500">
            Observation Card
          </p>
          <h3 className="mt-3 text-3xl font-black text-pine">
            {result ? result.combinedLikely ?? result.topMatch.chineseName : "等待分析結果"}
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[24px] bg-white/90 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">日期</p>
              <p className="mt-2 text-sm leading-7 text-moss-800">{recordDate}</p>
            </div>
            <div className="rounded-[24px] bg-white/90 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">顏色線索</p>
              <p className="mt-2 text-sm leading-7 text-moss-800">{colorSummary}</p>
            </div>
            <div className="rounded-[24px] bg-white/90 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">環境</p>
              <p className="mt-2 text-sm leading-7 text-moss-800">{environmentLabel || "未填"}</p>
            </div>
            <div className="rounded-[24px] bg-white/90 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">大小</p>
              <p className="mt-2 text-sm leading-7 text-moss-800">{sizeSummary}</p>
            </div>
            <div className="rounded-[24px] bg-white/90 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">特徵摘要</p>
              <p className="mt-2 text-sm leading-7 text-moss-800">
                {result ? result.observationSummary : "分析完成後會整理出一段可直接保存的觀察摘要。"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[36px] border border-moss-100 bg-white/92 p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-moss-500">輸出方式</p>
          <h3 className="mt-3 text-2xl font-bold text-pine">可先自由編輯，再複製或下載</h3>
          <p className="mt-3 text-sm leading-7 text-moss-600">
            這張卡會先整理本次觀察的日期、環境、大小、色塊線索與推測鳥種。你可以先修改文字，再複製、下載文字，或把左側卡片輸出成 JPG / PDF。
          </p>

          <label className="mt-5 block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">
              可編輯輸出內容
            </span>
            <textarea
              value={result ? editableText : "完成一次分析後，這裡會自動生成可編輯、可複製、可下載的觀察紀錄文字。"}
              onChange={(event) => setEditableText(event.target.value)}
              disabled={!result}
              className="mt-3 min-h-64 w-full resize-y rounded-[28px] border border-moss-100 bg-moss-50/60 p-4 text-sm leading-7 text-moss-800 outline-none transition focus:border-pine focus:bg-white disabled:cursor-not-allowed disabled:text-moss-500"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopyEditedText}
              disabled={!result}
              className="rounded-full bg-pine px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {copied ? "已複製文字" : "複製文字"}
            </button>
            <button
              type="button"
              onClick={handleDownloadEditedText}
              disabled={!result}
              className="rounded-full border border-moss-200 bg-white px-5 py-3 text-sm font-semibold text-moss-700 transition hover:border-moss-400 hover:text-pine disabled:cursor-not-allowed disabled:opacity-60"
            >
              下載文字
            </button>
            <button
              type="button"
              onClick={() => void handleExport("jpg")}
              disabled={!result || exporting !== null}
              className="rounded-full border border-moss-200 bg-white px-5 py-3 text-sm font-semibold text-moss-700 transition hover:border-moss-400 hover:text-pine disabled:cursor-not-allowed disabled:opacity-60"
            >
              {exporting === "jpg" ? "輸出 JPG 中..." : "下載 JPG"}
            </button>
            <button
              type="button"
              onClick={() => void handleExport("pdf")}
              disabled={!result || exporting !== null}
              className="rounded-full border border-moss-200 bg-white px-5 py-3 text-sm font-semibold text-moss-700 transition hover:border-moss-400 hover:text-pine disabled:cursor-not-allowed disabled:opacity-60"
            >
              {exporting === "pdf" ? "輸出 PDF 中..." : "下載 PDF"}
            </button>
          </div>

          {exportError ? (
            <p className="mt-4 rounded-[22px] border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-7 text-rose-700">
              {exportError}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
