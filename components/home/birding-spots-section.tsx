import { BirdingSpotsBrowser } from "@/components/home/birding-spots-browser";

export function BirdingSpotsSection() {
  return (
    <section id="mrt-spots" className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-[36px] border border-white/70 bg-white/68 px-5 py-8 shadow-card backdrop-blur sm:px-8 sm:py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss-600">
            Nearby Spots
          </p>
          <h2 className="section-title mt-3 text-pine">附近賞鳥點推薦</h2>
          <p className="section-copy mt-4">
            這一區改為整理自「大台北捷運賞鳥綠地圖」，把捷運可達、對新手友善的路線做成首頁卡片，方便你先挑適合自己的第一站。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://www.birdfair.org.tw/TPE_Birdwatchingmap/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-moss-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-moss-800"
            >
              打開大台北捷運賞鳥綠地圖
            </a>
            <div className="inline-flex items-center rounded-full border border-moss-200 bg-white/80 px-4 py-3 text-sm text-moss-700">
              資料來源：社團法人台北市野鳥學會
            </div>
          </div>
        </div>

        <BirdingSpotsBrowser />
      </div>
    </section>
  );
}
