import type { BirdFeature } from "@/lib/assistant-types";

const environmentIcons: Record<string, string> = {
  urban: "街",
  campus: "校",
  park: "園",
  forest: "林",
  mountain: "山",
  grassland: "草",
  shrubland: "叢",
  farmland: "田",
  wetland: "濕",
  pond_lake: "湖",
  river_stream: "溪",
  estuary_mudflat: "灘",
  coast: "岸",
  ocean: "海",
};

export function EnvironmentSelector({
  environments,
  value,
  onChange,
}: {
  environments: BirdFeature[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {environments.map((item) => {
        const active = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`group relative overflow-hidden rounded-[24px] border p-4 text-left transition ${
              active
                ? "border-pine bg-pine text-white shadow-card"
                : "border-moss-200 bg-white text-moss-800 hover:-translate-y-0.5 hover:border-moss-400 hover:bg-moss-50"
            }`}
          >
            <div
              className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-black transition ${
                active ? "bg-white/18 text-white" : "bg-moss-50 text-moss-500 group-hover:bg-white"
              }`}
              aria-hidden="true"
            >
              {environmentIcons[item.value] ?? "境"}
            </div>
            <div className="pr-11">
              <p className={active ? "text-base font-black text-white" : "text-base font-black text-pine"}>
                {item.label}
              </p>
              <p className={active ? "mt-2 text-sm leading-6 text-white/78" : "mt-2 text-sm leading-6 text-moss-600"}>
                {item.description}
              </p>
            </div>
            {active ? (
              <span className="mt-3 inline-flex rounded-full bg-white/16 px-3 py-1 text-xs font-bold text-white">
                已作為重要篩選條件
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
