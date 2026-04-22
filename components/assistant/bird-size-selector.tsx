import type { BirdSizeOption, BirdSizeSelection } from "@/lib/assistant-types";

function BirdSilhouette({
  kind,
  scale,
  active,
}: {
  kind: BirdSizeOption["value"];
  scale: number;
  active: boolean;
}) {
  const iconColor = active ? "text-pine" : "text-moss-700";

  return (
    <div className="flex h-28 items-end justify-center sm:h-32">
      <svg
        viewBox="-20 0 230 150"
        aria-hidden="true"
        className={`${iconColor} ${active ? "drop-shadow-sm" : ""}`}
        style={{
          width: `${58 * scale}px`,
          height: `${42 * scale}px`,
          transformOrigin: "center bottom",
        }}
      >
        {kind === "small" ? (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M58 77c0-17 15-29 35-25 13 2 23 12 24 24 1 16-14 26-34 24-15-1-25-10-25-23Z" strokeWidth="7" />
            <path d="M98 53c4-12 18-16 27-8 7 6 7 18 0 24-8 7-21 4-27-5" strokeWidth="7" />
            <path d="m126 53 19 6-20 8" strokeWidth="6" />
            <path d="M61 75 31 62M62 82 35 94" strokeWidth="7" />
            <path d="M78 70c10 2 18 8 23 16" strokeWidth="5" opacity="0.55" />
            <path d="M80 101v10M94 101v10" strokeWidth="5" />
          </g>
        ) : null}

        {kind === "small-medium" ? (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 78c0-20 18-34 43-31 18 2 32 15 33 31 1 20-17 33-42 31-21-2-34-14-34-31Z" strokeWidth="7" />
            <path d="M106 48c6-14 23-18 34-8 8 8 8 21-1 29-10 9-27 5-34-8" strokeWidth="7" />
            <path d="m140 51 23 7-24 10" strokeWidth="6" />
            <path d="M53 75 17 56M55 84 23 103" strokeWidth="8" />
            <path d="M79 69c14 2 26 11 34 25" strokeWidth="5" opacity="0.55" />
            <path d="M82 109v10M101 108v11" strokeWidth="5" />
          </g>
        ) : null}

        {kind === "medium" ? (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M42 80c0-23 23-39 54-37 25 2 43 18 44 38 1 24-22 39-54 37-27-2-44-17-44-38Z" strokeWidth="8" />
            <path d="M119 44c6-14 23-19 36-10 10 8 11 23 1 32-11 10-29 7-38-7" strokeWidth="8" />
            <path d="m157 47 20 9-21 8" strokeWidth="6" />
            <path d="M45 78 9 62M46 86 14 108" strokeWidth="9" />
            <path d="M74 70c19 0 34 10 45 27" strokeWidth="6" opacity="0.55" />
            <path d="M78 117v10M102 116v11" strokeWidth="6" />
          </g>
        ) : null}

        {kind === "medium-large" ? (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M37 80c2-26 27-43 61-39 29 3 49 21 49 43 0 27-27 43-62 39-30-3-50-20-48-43Z" strokeWidth="8" />
            <path d="M124 39c8-15 29-19 42-7 10 10 9 26-3 34-13 9-34 4-41-12" strokeWidth="8" />
            <path d="m166 43 22 10-25 8" strokeWidth="6" />
            <path d="M43 74 4 42M41 84 2 111" strokeWidth="10" />
            <path d="M74 68c25 0 43 11 56 31" strokeWidth="6" opacity="0.55" />
            <path d="M75 121v12M104 120v13" strokeWidth="6" />
          </g>
        ) : null}

        {kind === "large" ? (
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M28 78c3-31 34-50 74-45 34 4 58 25 58 52 0 32-33 51-75 46-36-4-60-24-57-53Z" strokeWidth="9" />
            <path d="M132 31c11-17 36-20 51-5 10 11 8 27-6 36-17 10-39 2-47-16" strokeWidth="9" />
            <path d="m180 35 27 10-31 12" strokeWidth="7" />
            <path d="M37 70-9 28M34 86-12 118" strokeWidth="11" />
            <path d="M70 63c34-1 58 13 76 39" strokeWidth="7" opacity="0.55" />
            <path d="M73 131v15M109 130v16" strokeWidth="7" />
          </g>
        ) : null}
      </svg>
    </div>
  );
}

function SelectionDot({ active }: { active: boolean }) {
  return (
    <span
      className={
        active
          ? "grid h-6 w-6 place-items-center rounded-full bg-moss-500 text-white shadow-[0_6px_14px_rgba(94,126,74,0.25)]"
          : "h-6 w-6 rounded-full border-2 border-moss-200 bg-white transition group-hover:border-moss-400"
      }
    >
      {active ? (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            d="m5 10 3 3 7-7"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
        </svg>
      ) : null}
    </span>
  );
}

export function BirdSizeSelector({
  value,
  options,
  onChange,
  aiSuggestedSize,
}: {
  value: BirdSizeSelection;
  options: BirdSizeOption[];
  onChange: (value: BirdSizeSelection) => void;
  aiSuggestedSize?: BirdSizeSelection;
}) {
  const selected = options.find((option) => option.value === value);

  return (
    <div className="rounded-[28px] border border-moss-100 bg-[#fbfcf7] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
      <div className="relative mx-auto max-w-4xl">
        <div className="pointer-events-none absolute left-8 right-8 top-[8.5rem] hidden h-px bg-moss-200 sm:block" />
        <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-5">
          {options.map((option) => {
            const active = option.value === value;
            const aiSuggested = option.value === aiSuggestedSize;

            return (
              <button
                key={option.value}
                type="button"
                aria-label={`${option.label}，參考 ${option.example}`}
                aria-pressed={active}
                onClick={() => onChange(option.value)}
                className={
                  active
                    ? "group relative flex min-h-44 flex-col items-center justify-end gap-3 rounded-[24px] border border-moss-300 bg-white px-2 pb-3 pt-2 shadow-card"
                    : "group relative flex min-h-44 flex-col items-center justify-end gap-3 rounded-[24px] border border-transparent px-2 pb-3 pt-2 transition hover:border-moss-100 hover:bg-white/70"
                }
              >
                {aiSuggested ? (
                  <span className="absolute right-2 top-2 rounded-full bg-sky/80 px-2.5 py-1 text-[10px] font-black text-pine ring-1 ring-white/80">
                    AI 建議
                  </span>
                ) : null}
                <BirdSilhouette kind={option.value} scale={option.silhouetteScale} active={active} />
                <SelectionDot active={active} />
                <span className={active ? "text-xs font-black text-pine" : "text-xs font-bold text-moss-600"}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <div
          className={
            selected
              ? "rounded-md border border-moss-300 bg-moss-50 px-4 py-2 text-center text-sm font-semibold text-pine"
              : "rounded-md border border-dashed border-moss-300 bg-white px-4 py-2 text-center text-sm font-semibold text-moss-500"
          }
        >
          {selected ? (
            <>
              <span>{selected.label}</span>
              <span className="mx-2 text-moss-400">|</span>
              <span className="font-medium text-moss-700">參考：{selected.example}</span>
            </>
          ) : (
            "請先選擇鳥的大小"
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-moss-500 sm:grid-cols-5">
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={
                active
                  ? "rounded-full bg-pine px-2 py-1 text-white"
                  : "rounded-full px-2 py-1 transition hover:bg-moss-50 hover:text-pine"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
