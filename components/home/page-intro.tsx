type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
};

export function PageIntro({ eyebrow, title, description, highlights = [] }: PageIntroProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="surface-card overflow-hidden rounded-[34px] px-6 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-600">{eyebrow}</p>
            <h1 className="section-title mt-3 text-pine">{title}</h1>
            <p className="section-copy mt-4 max-w-3xl">{description}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(highlights.length > 0 ? highlights : ["整理清楚", "手機友善", "對新手友善", "直接可用"]).map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-white/70 bg-[linear-gradient(135deg,rgba(241,247,237,0.95),rgba(255,255,255,0.96))] px-4 py-4 text-sm font-bold text-moss-700"
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
