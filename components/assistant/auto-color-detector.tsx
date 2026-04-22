import type { BirdFeature, BirdObservationFormState } from "@/lib/assistant-types";

function labelsForColors(colorOptions: BirdFeature[], values: string[]) {
  return values.map((value) => colorOptions.find((item) => item.value === value)?.label ?? value);
}

export function AutoColorDetector({
  form,
  colorOptions,
}: {
  form: BirdObservationFormState;
  colorOptions: BirdFeature[];
}) {
  const autoLabels = labelsForColors(colorOptions, form.autoDetectedColors);
  const finalLabels = labelsForColors(colorOptions, form.colorTraits);

  return (
    <div className="rounded-[24px] border border-moss-100 bg-moss-50/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">
            Auto Color Detector
          </p>
          <h4 className="mt-2 text-lg font-bold text-pine">AI 自動預設顏色</h4>
        </div>
        <span
          className={
            form.colorDetectionStatus === "detecting"
              ? "rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800"
              : form.colorDetectionStatus === "done"
                ? "rounded-full bg-moss-100 px-3 py-1 text-xs font-bold text-pine"
                : form.colorDetectionStatus === "limited"
                  ? "rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800"
                  : "rounded-full bg-white px-3 py-1 text-xs font-bold text-moss-600"
          }
        >
          {form.colorDetectionStatus === "detecting"
            ? "偵測中"
            : form.colorDetectionStatus === "done"
              ? `信心 ${form.colorDetectionConfidence}`
              : form.colorDetectionStatus === "limited"
                ? "保守建議"
                : "等待照片"}
        </span>
      </div>

      <p className="mt-3 text-sm leading-7 text-moss-700">{form.colorDetectionReason}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-moss-100">
          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">系統預設</p>
          <p className="mt-2 text-sm font-semibold text-pine">
            {autoLabels.length ? autoLabels.join("、") : "尚未預設"}
          </p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-moss-100">
          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">最終送出顏色</p>
          <p className="mt-2 text-sm font-semibold text-pine">
            {finalLabels.length ? finalLabels.join("、") : "尚未選擇"}
          </p>
        </div>
      </div>
    </div>
  );
}
