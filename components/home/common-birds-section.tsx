import { CommonBirdsBrowser } from "@/components/home/common-birds-browser";
import { birdCards } from "@/lib/home-data";

export function CommonBirdsSection() {
  return (
    <section id="common-birds" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss-600">
          Common Birds
        </p>
        <h2 className="section-title mt-3 text-pine">先從最常遇見的鳥開始建立辨識感</h2>
        <p className="section-copy mt-4">
          這些鳥種在公園、校園、河濱與住家周圍就很常見，適合新手先練習觀察體型、花紋與出現場景。
        </p>
        <p className="mt-3 text-sm leading-7 text-moss-600">
          這一版已擴充為 {birdCards.length} 種入門常見鳥，從都市綠地到水邊都能先建立基本辨識感。
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-medium text-moss-700 shadow-sm">
            都市常見種
          </span>
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-medium text-moss-700 shadow-sm">
            水邊常見種
          </span>
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-medium text-moss-700 shadow-sm">
            林緣入門種
          </span>
          <span className="rounded-full bg-white/80 px-3 py-2 text-xs font-medium text-moss-700 shadow-sm">
            共 50 張卡片
          </span>
        </div>
      </div>

      <CommonBirdsBrowser />
    </section>
  );
}
