import { BirdSizeSelector } from "@/components/assistant/bird-size-selector";
import { getBirdSizeExample, getBirdSizeLabel } from "@/lib/bird-size";
import type {
  BirdObservationFormState,
  BirdSizeOption,
  BirdSizeSelection,
} from "@/lib/assistant-types";

function SummaryPill({
  label,
  value,
  tone = "light",
}: {
  label: string;
  value: string;
  tone?: "light" | "strong";
}) {
  return (
    <div
      className={
        tone === "strong"
          ? "rounded-[22px] bg-pine px-4 py-3 text-white"
          : "rounded-[22px] bg-moss-50 px-4 py-3 text-moss-800"
      }
    >
      <p className={tone === "strong" ? "text-xs font-bold text-white/70" : "text-xs font-bold text-moss-500"}>
        {label}
      </p>
      <p className="mt-1 text-base font-black">{value}</p>
    </div>
  );
}

export function BirdSizeAutoSelector({
  form,
  options,
  onChange,
}: {
  form: BirdObservationFormState;
  options: BirdSizeOption[];
  onChange: (value: BirdSizeSelection) => void;
}) {
  const finalSize = form.finalSelectedSize || form.userSelectedSize || form.size;
  const autoLabel = form.autoDetectedSize ? getBirdSizeLabel(form.autoDetectedSize) : "上傳後自動預設";
  const userLabel = form.userSelectedSize ? getBirdSizeLabel(form.userSelectedSize) : "尚未選擇";
  const finalLabel = finalSize ? getBirdSizeLabel(finalSize) : "尚未選擇";
  const autoExample = form.autoDetectedSize ? getBirdSizeExample(form.autoDetectedSize) : "";
  const confidence = form.autoDetectedSizeConfidence || (form.imagePreview ? "分析中" : "待上傳");

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-moss-100 bg-[linear-gradient(135deg,rgba(238,245,232,0.95),rgba(255,255,255,0.96))] p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-moss-500">
              賞鳥助手大小預設
            </p>
            <h4 className="mt-2 text-xl font-black text-pine">賞鳥助手大小預設</h4>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-moss-600">
              上傳照片後會先根據鳥體輪廓、畫面佔比與外觀比例預設大小；這只是 AI 建議，你可以依現場印象直接改選。
            </p>
          </div>
          <span className="rounded-full border border-moss-200 bg-white px-4 py-2 text-xs font-black text-moss-700">
            AI 建議大小
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryPill label="AI 自動預設大小" value={autoLabel} tone="strong" />
          <SummaryPill label="AI 判斷信心" value={confidence} />
          <SummaryPill label="使用者目前選擇" value={userLabel} />
          <SummaryPill label="最終用於辨識" value={finalLabel} tone="strong" />
        </div>

        <p className="mt-4 rounded-[22px] bg-white/82 px-4 py-3 text-sm leading-7 text-moss-700">
          {form.autoDetectedSizeReason ||
            "上傳照片後，系統會先估計鳥體大小並自動預設。若照片太遠、模糊或遮擋多，信心會降低，請以你的手動確認為準。"}
          {autoExample ? ` 參考大小：${autoExample}。` : ""}
        </p>
      </div>

      <BirdSizeSelector
        value={finalSize}
        options={options}
        onChange={onChange}
        aiSuggestedSize={form.autoDetectedSize}
      />
    </div>
  );
}
