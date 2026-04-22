import type { ChangeEvent } from "react";

import { AutoColorDetector } from "@/components/assistant/auto-color-detector";
import { BirdPhotoUploader } from "@/components/assistant/bird-photo-uploader";
import { BirdSizeAutoSelector } from "@/components/assistant/bird-size-auto-selector";
import { ColorChipSelector } from "@/components/assistant/color-chip-selector";
import { EnvironmentSelector } from "@/components/assistant/environment-selector";
import type {
  BirdFeature,
  BirdObservationFormState,
  BirdSizeOption,
  BirdSizeSelection,
} from "@/lib/assistant-types";

export function BirdUploadForm({
  form,
  environments,
  sizeOptions,
  colorOptions,
  loading,
  loadingMessage,
  onImageChange,
  onEnvironmentChange,
  onSizeChange,
  onToggleColor,
  onAnalyze,
  onReset,
  onLoadSample,
}: {
  form: BirdObservationFormState;
  environments: BirdFeature[];
  sizeOptions: BirdSizeOption[];
  colorOptions: BirdFeature[];
  loading: boolean;
  loadingMessage: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnvironmentChange: (value: string) => void;
  onSizeChange: (value: BirdSizeSelection) => void;
  onToggleColor: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  onLoadSample: () => void;
}) {
  const selectedEnvironment = environments.find(
    (item) => item.value === (form.selectedEnvironment || form.environment)
  );
  const selectedSize = sizeOptions.find(
    (item) => item.value === (form.finalSelectedSize || form.userSelectedSize || form.size)
  );
  const canAnalyze = Boolean(form.imagePreview) && !loading;

  return (
    <section
      id="assistant-form"
      className="surface-card mt-10 rounded-[36px] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">
            賞鳥助手辨識流程
          </p>
          <h2 className="section-title mt-3 text-pine">先看照片，再用大小、環境與色塊輔助縮小候選</h2>
          <p className="section-copy mt-3 max-w-2xl">
            把複雜文字欄位收掉之後，操作只剩四件事：上傳照片、選大小、選環境、點顏色。這樣更像真正的鳥類辨識工具，也更適合手機快速使用。
          </p>
        </div>
        <div className="rounded-[24px] border border-moss-100 bg-moss-50/80 px-4 py-3 text-sm font-semibold leading-7 text-moss-700">
          辨識順序：照片為主 → 大小為先 → 環境為輔 → 顏色色塊為輔
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <div className="rounded-[24px] border border-moss-100 bg-white px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-moss-500">照片狀態</p>
          <p className="mt-2 text-base font-black text-pine">{form.imagePreview ? "已加入照片" : "等待上傳"}</p>
          <p className="mt-1 text-sm text-moss-600">{form.imageName || "先給系統一張主體清楚的鳥照。"}</p>
        </div>
        <div className="rounded-[24px] border border-moss-100 bg-white px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-moss-500">大小條件</p>
          <p className="mt-2 text-base font-black text-pine">{selectedSize?.label ?? "尚未決定"}</p>
          <p className="mt-1 text-sm text-moss-600">{selectedSize?.example ?? "上傳後會先有 AI 建議。"}</p>
        </div>
        <div className="rounded-[24px] border border-moss-100 bg-white px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-moss-500">環境條件</p>
          <p className="mt-2 text-base font-black text-pine">{selectedEnvironment?.label ?? "尚未選擇"}</p>
          <p className="mt-1 text-sm text-moss-600">
            {selectedEnvironment?.description ?? "環境不只是參考，會實際影響候選排序。"}
          </p>
        </div>
        <div className="rounded-[24px] border border-moss-100 bg-white px-4 py-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-moss-500">色塊確認</p>
          <p className="mt-2 text-base font-black text-pine">
            {form.colorTraits.length > 0 ? `${form.colorTraits.length} 個色塊` : "尚未確認"}
          </p>
          <p className="mt-1 text-sm text-moss-600">最後送出的辨識會以你確認後的顏色為準。</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <BirdPhotoUploader form={form} onImageChange={onImageChange} />

          <div className="rounded-[30px] border border-moss-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">目前操作進度</p>
                <h3 className="mt-2 text-xl font-black text-pine">
                  {form.imagePreview ? "照片已就緒，接著確認條件" : "先上傳照片，再往下選條件"}
                </h3>
              </div>
              <span className="rounded-full bg-moss-50 px-4 py-2 text-sm font-bold text-moss-700">
                {form.imagePreview ? "可進入分析" : "尚未完成第一步"}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "照片", value: form.imagePreview ? "已完成" : "未完成" },
                { label: "大小 / 環境", value: selectedSize || selectedEnvironment ? "已補條件" : "可再補充" },
                { label: "顏色", value: form.colorTraits.length ? `${form.colorTraits.length} 個` : "待確認" },
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] bg-moss-50/70 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">{item.label}</p>
                  <p className="mt-2 text-sm font-bold text-pine">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5 xl:sticky xl:top-28 xl:self-start">
          <div className="rounded-[30px] border border-moss-100 bg-sand p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-pine">環境篩選</h3>
                <p className="mt-2 text-sm leading-7 text-moss-600">
                  把你看到鳥的地點與棲地點出來。環境會被當成真正的篩選條件：吻合會提高排名，明顯衝突會降低排名或淘汰。
                </p>
              </div>
              <span className="rounded-full border border-moss-200 bg-white px-4 py-2 text-xs font-semibold text-moss-600">
                Step 1
              </span>
            </div>

            <div className="mt-5">
              <EnvironmentSelector
                environments={environments}
                value={form.selectedEnvironment || form.environment}
                onChange={onEnvironmentChange}
              />
            </div>
          </div>

          <div className="rounded-[30px] border border-moss-100 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-pine">賞鳥助手大小預設</h3>
                <p className="mt-2 text-sm leading-7 text-moss-600">
                  上傳照片後會先自動估計鳥體大小並預設選項；你可以直接改選，最後辨識一律採用你確認後的大小。
                </p>
              </div>
              <span className="rounded-full border border-moss-200 bg-moss-50 px-4 py-2 text-xs font-semibold text-moss-600">
                重要條件
              </span>
            </div>

            <div className="mt-5">
              <BirdSizeAutoSelector form={form} options={sizeOptions} onChange={onSizeChange} />
            </div>
          </div>

          <div className="rounded-[30px] border border-moss-100 bg-white p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-pine">顏色色塊選擇</h3>
                <p className="mt-2 text-sm leading-7 text-moss-600">
                  系統會先自動預設照片中的鳥體主色，你可以自由補選或取消。最後送出的顏色會以你確認後的色塊為準。
                </p>
              </div>
              <span className="rounded-full border border-moss-200 bg-moss-50 px-4 py-2 text-xs font-semibold text-moss-600">
                Step 2
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <AutoColorDetector form={form} colorOptions={colorOptions} />
              <ColorChipSelector
                colorOptions={colorOptions}
                selectedColors={form.colorTraits}
                autoDetectedColors={form.autoDetectedColors}
                userAdjustedColors={form.userAdjustedColors}
                onToggleColor={onToggleColor}
              />
            </div>
          </div>

          <div className="rounded-[34px] border border-moss-100 bg-[linear-gradient(135deg,#2a4a46_0%,#41625f_54%,#6e8b88_100%)] px-5 py-6 text-white shadow-card sm:px-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">開始分析</p>
                <p className="mt-2 text-lg font-bold">確認顏色後，讓系統重新排序候選鳥種</p>
              </div>
              <span className="rounded-full bg-white/12 px-4 py-2 text-xs font-bold text-white/90">
                最後一步
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-white/80">
              {loading
                ? loadingMessage
                : form.imagePreview
                  ? "會先看照片輪廓、體型、嘴型與腿長，再用大小、環境和你最後確認的色塊輔助判斷。"
                  : "請先上傳照片，再選大小、環境與顏色，最後按下開始分析。"}
            </p>

            <button
              type="button"
              onClick={onAnalyze}
              disabled={!canAnalyze}
              className="mt-5 w-full rounded-[30px] bg-white px-6 py-5 text-xl font-black text-pine shadow-sm transition hover:-translate-y-0.5 hover:bg-moss-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-2xl"
            >
              {loading ? "分析中..." : "開始分析"}
            </button>

            {!form.imagePreview ? (
              <p className="mt-3 text-sm leading-7 text-white/75">
                目前還不能分析，因為你還沒有上傳照片。
              </p>
            ) : null}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onReset}
                disabled={loading}
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                清除重填
              </button>
              <button
                type="button"
                onClick={onLoadSample}
                disabled={loading}
                className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                載入範例資料
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
