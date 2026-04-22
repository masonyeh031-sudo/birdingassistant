import type { BirdFeature } from "@/lib/assistant-types";

export function HabitatSelector({
  environments,
  value,
  onChange,
}: {
  environments: BirdFeature[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {environments.map((item) => {
        const active = value === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={
              active
                ? "rounded-[24px] border border-pine bg-pine p-4 text-left text-white shadow-sm"
                : "rounded-[24px] border border-moss-200 bg-white p-4 text-left text-moss-800 transition hover:-translate-y-0.5 hover:border-moss-400"
            }
          >
            <p className={active ? "text-base font-bold text-white" : "text-base font-bold text-pine"}>
              {item.label}
            </p>
            <p className={active ? "mt-2 text-sm leading-6 text-white/80" : "mt-2 text-sm leading-6 text-moss-600"}>
              {item.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
