import { guanNiaoRenBlog, guanNiaoRenBlogSections } from "@/lib/home-data";

const readOrder = [
  "先讀相似鳥種辨識，建立最實用的入門差異。",
  "再讀黑冠麻鷺與觀察文章，補上影片裡來不及展開的背景。",
  "最後看議題延伸，理解觀鳥人怎麼把賞鳥連到保育。",
] as const;

export function BlogChannelBrowser() {
  return (
    <div className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/80 bg-white/88 p-6 shadow-card backdrop-blur sm:p-7">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss-600">
            Blog
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-pine">{guanNiaoRenBlog.name}</h2>
          <p className="mt-2 text-sm font-medium text-moss-600">{guanNiaoRenBlog.platform}</p>
          <p className="mt-4 text-base leading-8 text-moss-700">{guanNiaoRenBlog.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={guanNiaoRenBlog.blogUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-moss-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-pine"
            >
              前往部落格首頁
            </a>
            <a
              href="https://vocus.cc/salon/watching-birds/room/bird_watcher"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-moss-200 bg-white px-5 py-3 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
            >
              打開黑冠麻鷺專題房間
            </a>
          </div>
        </div>

        <div className="rounded-[32px] border border-moss-100 bg-moss-50/70 p-6 shadow-card sm:p-7">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss-600">
            推薦閱讀順序
          </p>
          <div className="mt-4 space-y-3">
            {readOrder.map((item, index) => (
              <div key={item} className="rounded-[24px] bg-white px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-moss-500">Step {index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-moss-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5">
        {guanNiaoRenBlogSections.map((section) => (
          <div
            key={section.title}
            className={`rounded-[32px] border p-6 shadow-card sm:p-7 ${section.accent}`}
          >
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold text-pine">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-moss-700">{section.description}</p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {section.topics.map((topic) => (
                <article
                  key={topic.title}
                  className="rounded-[26px] border border-white/80 bg-white/88 p-5 shadow-sm"
                >
                  <h4 className="text-xl font-semibold leading-8 text-pine">{topic.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-moss-700">{topic.summary}</p>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-moss-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-moss-600">主題重點</p>
                      <p className="mt-2 text-sm leading-7 text-moss-900">{topic.focus}</p>
                    </div>
                    <div className="rounded-2xl bg-sky/60 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-moss-600">適合誰先讀</p>
                      <p className="mt-2 text-sm leading-7 text-moss-900">{topic.audience}</p>
                    </div>
                  </div>

                  <a
                    href={topic.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
                  >
                    查看相關文章入口
                  </a>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
