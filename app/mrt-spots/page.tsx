import { BirdingSpotsBrowser } from "@/components/home/birding-spots-browser";
import { PageIntro } from "@/components/home/page-intro";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { birdingSpots } from "@/lib/home-data";

export default function MrtSpotsPage() {
  return (
    <main className="shell pb-8">
      <SiteHeader />
      <PageIntro
        eyebrow="Taipei Birding Routes"
        title="台北捷運賞鳥推薦"
        description={`這一頁只保留捷運賞鳥路線功能。你可以依捷運線切換，瀏覽整理自大台北捷運賞鳥綠地圖的 ${birdingSpots.length} 條路線。`}
        highlights={["依捷運線切換", `整理 ${birdingSpots.length} 條路線`, "快速看適合鳥種", "適合新手出發"]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <BirdingSpotsBrowser />
      </section>
      <SiteFooter />
    </main>
  );
}
