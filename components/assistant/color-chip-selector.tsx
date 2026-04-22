import type { BirdFeature } from "@/lib/assistant-types";

function colorTextClass(hex?: string) {
  if (!hex) return "text-moss-800";
  return hex === "#f7f7f2" || hex === "#d7b93d" ? "text-pine" : "text-white";
}

function chipStatus({
  active,
  autoSuggested,
  userTouched,
}: {
  active: boolean;
  autoSuggested: boolean;
  userTouched: boolean;
}) {
  if (autoSuggested && active && !userTouched) return "AI 建議";
  if (autoSuggested && active && userTouched) return "AI 建議・已確認";
  if (autoSuggested && !active && userTouched) return "已手動取消";
  if (!autoSuggested && active && userTouched) return "手動加入";
  if (active) return "已選取";
  return "";
}

export function ColorChipSelector({
  colorOptions,
  selectedColors,
  autoDetectedColors,
  userAdjustedColors,
  onToggleColor,
}: {
  colorOptions: BirdFeature[];
  selectedColors: string[];
  autoDetectedColors: string[];
  userAdjustedColors: string[];
  onToggleColor: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {colorOptions.map((item) => {
        const active = selectedColors.includes(item.value);
        const autoSuggested = autoDetectedColors.includes(item.value);
        const userTouched = userAdjustedColors.includes(item.value);
        const status = chipStatus({ active, autoSuggested, userTouched });

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onToggleColor(item.value)}
            className={
              active
                ? "relative overflow-hidden rounded-[24px] border-2 border-pine p-1 shadow-sm ring-2 ring-moss-200"
                : autoSuggested
                  ? "relative overflow-hidden rounded-[24px] border-2 border-dashed border-moss-400 p-1 transition hover:-translate-y-0.5 hover:border-pine"
                  : "relative overflow-hidden rounded-[24px] border border-moss-200 p-1 transition hover:-translate-y-0.5 hover:border-moss-400"
            }
          >
            <div
              className={`flex h-24 flex-col justify-end rounded-[18px] p-3 text-left ${colorTextClass(item.hex)}`}
              style={{ backgroundColor: item.hex }}
            >
              <p className="text-base font-bold">{item.label}</p>
              <p className="mt-1 text-xs leading-5 opacity-90">{item.description}</p>
            </div>
            {status ? (
              <span
                className={
                  autoSuggested
                    ? "absolute right-3 top-3 rounded-full bg-white/92 px-2 py-1 text-[11px] font-bold text-pine"
                    : "absolute right-3 top-3 rounded-full bg-white/92 px-2 py-1 text-[11px] font-bold text-moss-700"
                }
              >
                {status}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
