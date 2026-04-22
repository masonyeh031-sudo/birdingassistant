import { BlogChannelBrowser } from "@/components/home/blog-channel-browser";
import { PageIntro } from "@/components/home/page-intro";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function BlogPage() {
  return (
    <main className="shell pb-8">
      <SiteHeader />
      <PageIntro
        eyebrow="Creator Blog"
        title="觀鳥人部落格"
        description="這一頁只整理觀鳥人的部落格內容，包含推薦閱讀順序、相似鳥種辨識文章，以及黑冠麻鷺與保育議題的延伸閱讀。"
        highlights={["推薦閱讀順序", "相似鳥種辨識", "黑冠麻鷺專題", "保育議題延伸"]}
      />
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <BlogChannelBrowser />
      </section>
      <SiteFooter />
    </main>
  );
}
