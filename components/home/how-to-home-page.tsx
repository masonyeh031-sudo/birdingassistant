import Link from "next/link";

const starterSteps = [
  {
    step: "01",
    title: "先到賞鳥助手",
    summary: "上傳照片後，先看系統根據照片輪廓做的初步判斷，再補大小、環境與顏色。",
    detail: "最適合：你手上已經有鳥照，想先知道最可能是哪幾種鳥。",
    href: "/assistant",
    cta: "前往賞鳥助手",
  },
  {
    step: "02",
    title: "再到圖鑑對照",
    summary: "把候選鳥種和圖鑑卡片放在一起看，比對體型、棲地、季節與真實照片。",
    detail: "最適合：你想確認第一名和第二名到底差在哪裡。",
    href: "/birds",
    cta: "打開台灣常見鳥類圖鑑",
  },
  {
    step: "03",
    title: "最後找地點練習",
    summary: "把網站上的候選鳥種帶回現場，再去捷運賞鳥點做生活圈練習。",
    detail: "最適合：你已經想出門看鳥，但還不知道從哪裡開始。",
    href: "/mrt-spots",
    cta: "查看台北捷運賞鳥推薦",
  },
] as const;

const pageCards = [
  {
    title: "賞鳥助手",
    subtitle: "照片辨識入口",
    description: "適合已經拍到鳥照的人。先上傳照片，再讓大小、環境與色塊幫你縮小候選。",
    bullets: ["會先給前幾名候選", "有判斷理由與相似種比較", "可整理成野外筆記卡"],
    href: "/assistant",
  },
  {
    title: "台灣常見鳥類圖鑑",
    subtitle: "完整對照卡片牆",
    description: "適合建立辨識感。直接看完整卡片，先把生活圈常見鳥、冬候鳥、台灣特有種記熟。",
    bullets: ["可用棲地與體型篩選", "全部卡片直接展開", "適合搭配辨識結果交叉看"],
    href: "/birds",
  },
  {
    title: "台北捷運賞鳥推薦",
    subtitle: "生活圈觀察入口",
    description: "適合真的想出門練習的人。先找一個交通方便的點，再去現場反覆看同一批常見鳥。",
    bullets: ["依路線整理", "適合週末半日練習", "可先挑你最熟的鳥群開始"],
    href: "/mrt-spots",
  },
  {
    title: "觀鳥人部落格 / YT 頻道",
    subtitle: "延伸學習內容",
    description: "當你想進一步理解相似種差異、觀察方法與實際案例時，再往這兩頁延伸。",
    bullets: ["部落格偏整理閱讀", "YT 適合看相似種比較", "可當第二層學習材料"],
    href: "/youtube",
  },
] as const;

const scenarios = [
  {
    title: "我剛拍到一隻鳥，但不知道是什麼",
    route: "先去賞鳥助手 → 看前三名候選 → 再去圖鑑比對",
    note: "這是最直接的使用方式，先讓照片給方向，再用圖鑑做人工確認。",
  },
  {
    title: "我還沒拍照，只想先建立常見鳥印象",
    route: "先去台灣常見鳥類圖鑑 → 先看生活圈常見鳥 → 再去捷運賞鳥點",
    note: "先把白頭翁、珠頸斑鳩、麻雀、綠繡眼這些常見種建立基礎，進步最快。",
  },
  {
    title: "我想安排一次新手觀察行程",
    route: "先去捷運賞鳥推薦 → 選一條方便路線 → 回來用賞鳥助手整理照片",
    note: "把現場觀察和回家辨識串起來，會比只在家看片更容易學會。",
  },
] as const;

export function HowToHomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="surface-card overflow-hidden rounded-[38px] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-600">首頁 / 使用教學</p>
            <h1 className="section-title mt-3 text-pine">第一次來，先看這頁就知道怎麼用這個網站</h1>
            <p className="section-copy mt-4 max-w-2xl">
              這個網站不是只有一個功能，而是把「照片辨識」、「鳥類圖鑑」、「實際觀察地點」和「延伸學習內容」整合在一起。最有效的用法不是只待在同一頁，而是照順序搭配使用。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["先辨識", "再對照", "再去現場看", "最後補學習"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-moss-100 bg-white/92 px-4 py-2 text-sm font-bold text-moss-700"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assistant"
                className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-moss-700"
              >
                從賞鳥助手開始
              </Link>
              <Link
                href="/birds"
                className="rounded-full border border-moss-200 bg-white px-6 py-3 text-sm font-semibold text-moss-700 transition hover:border-moss-400 hover:text-pine"
              >
                先看圖鑑卡片
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {starterSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[28px] border border-moss-100 bg-[linear-gradient(135deg,rgba(245,241,233,0.96),rgba(255,255,255,0.98)_54%,rgba(219,232,236,0.55))] p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-moss-500">
                      Step {item.step}
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-pine">{item.title}</h2>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-moss-700 shadow-sm">
                    新手順序
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-moss-700">{item.summary}</p>
                <p className="mt-3 rounded-[20px] bg-white/90 px-4 py-3 text-sm leading-7 text-moss-600">
                  {item.detail}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-bold text-moss-700 transition hover:border-moss-400 hover:text-pine"
                >
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-8">
        <div className="surface-card rounded-[34px] p-6 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">網站分工</p>
              <h2 className="section-title mt-3 text-pine">每一頁各自負責什麼</h2>
              <p className="section-copy mt-3 max-w-3xl">
                如果你把每一頁當成不同工具，整個網站就會好用很多。不要期待單一頁面解決全部事情，這樣反而比較不容易卡住。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pageCards.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col rounded-[28px] border border-moss-100 bg-white/94 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">{card.subtitle}</p>
                <h3 className="mt-2 text-2xl font-black text-pine">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-moss-700">{card.description}</p>
                <div className="mt-4 space-y-2">
                  {card.bullets.map((bullet) => (
                    <p key={bullet} className="rounded-2xl bg-moss-50/80 px-3 py-2 text-sm leading-6 text-moss-700">
                      {bullet}
                    </p>
                  ))}
                </div>
                <Link
                  href={card.href}
                  className="mt-auto pt-5 text-sm font-black text-pine underline decoration-moss-200 underline-offset-4 transition hover:text-moss-700"
                >
                  直接前往
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="surface-card rounded-[34px] p-6 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">推薦路線</p>
          <h2 className="section-title mt-3 text-pine">如果你不知道從哪裡開始，就照這三種情境走</h2>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <article
                key={scenario.title}
                className="rounded-[28px] border border-moss-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,241,233,0.9))] p-5 shadow-sm"
              >
                <h3 className="text-xl font-black leading-9 text-pine">{scenario.title}</h3>
                <div className="mt-4 rounded-[22px] bg-pine px-4 py-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">建議順序</p>
                  <p className="mt-2 text-sm font-bold leading-7">{scenario.route}</p>
                </div>
                <p className="mt-4 text-sm leading-7 text-moss-700">{scenario.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
