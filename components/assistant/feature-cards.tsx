import type { EntryMode } from "@/lib/assistant-types";

export function FeatureCards({
  items,
  activeMode,
  onSelect,
}: {
  items: Array<{
    mode: EntryMode;
    title: string;
    description: string;
    eyebrow: string;
  }>;
  activeMode: EntryMode;
  onSelect: (mode: EntryMode) => void;
}) {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">
          三大辨識入口
        </p>
        <h2 className="section-title mt-3 text-pine">從照片、條件或觀察紀錄開始</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item) => {
          const active = item.mode === activeMode;

          return (
            <button
              key={item.mode}
              type="button"
              onClick={() => onSelect(item.mode)}
              className={
                active
                  ? "rounded-[30px] border border-pine bg-pine px-5 py-6 text-left text-white shadow-card"
                  : "rounded-[30px] border border-moss-100 bg-white/90 px-5 py-6 text-left text-moss-800 shadow-sm transition hover:-translate-y-0.5 hover:border-moss-300"
              }
            >
              <p className={active ? "text-xs uppercase tracking-[0.22em] text-white/70" : "text-xs uppercase tracking-[0.22em] text-moss-500"}>
                {item.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
              <p className={active ? "mt-3 text-sm leading-7 text-white/85" : "mt-3 text-sm leading-7 text-moss-600"}>
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
