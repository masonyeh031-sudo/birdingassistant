import { PageIntro } from "@/components/home/page-intro";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { YoutubeChannelBrowser } from "@/components/home/youtube-channel-browser";

export default function YoutubePage() {
  return (
    <main className="shell pb-8">
      <SiteHeader />
      <PageIntro
        eyebrow="Creator Channel"
        title="觀鳥人YT頻道"
        description="這一頁整理觀鳥人的 YouTube 頻道方向、推薦先看順序與公開可查的主題內容，方便新手快速找到適合自己的影片入口。"
        highlights={["高觀看入門", "播放清單追系列", "田野觀察現場", "直接前往影片"]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <YoutubeChannelBrowser />
      </section>
      <SiteFooter />
    </main>
  );
}
