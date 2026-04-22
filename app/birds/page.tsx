import { PageIntro } from "@/components/home/page-intro";
import { SiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/home/site-footer";
import { TaiwanCommonBirdGuide } from "@/components/home/taiwan-common-bird-guide";
import { taiwanCommonGuideBirds } from "@/lib/taiwan-common-guide-data";

export default function BirdsPage() {
  return (
    <main className="shell pb-8">
      <SiteHeader />
      <PageIntro
        eyebrow="Taiwan Bird Guide"
        title="台灣常見鳥類圖鑑"
        description={`快速認識台灣常見鳥類。這一頁預設直接顯示完整 ${taiwanCommonGuideBirds.length} 張鳥類卡片，不分頁、不截斷。`}
        highlights={[
          `完整顯示 ${taiwanCommonGuideBirds.length} 張卡片`,
          "可切換台灣特有種",
          "支援棲地篩選",
          "支援體型篩選",
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <TaiwanCommonBirdGuide />
      </section>
      <SiteFooter />
    </main>
  );
}
