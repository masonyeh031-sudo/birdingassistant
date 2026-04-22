export function HeroSection({
  onStart,
  onPreviewSample,
}: {
  onStart: () => void;
  onPreviewSample: () => void;
}) {
  return (
    <section className="surface-card relative overflow-hidden rounded-[40px] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top_right,_rgba(220,236,242,0.9),_transparent_62%)] lg:block" />
      <div className="absolute -left-16 top-12 h-44 w-44 rounded-full bg-moss-100/80 blur-3xl" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-moss-500">
            賞鳥助手
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[0.02em] text-pine sm:text-5xl lg:text-6xl">
            賞鳥助手
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-moss-600 sm:text-lg">
            上傳鳥的照片，系統先自動預設鳥體主色，再結合大小、環境與你確認後的色塊，快速得到可能鳥種與辨識理由。
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["先看照片", "再修正大小", "補入環境", "確認顏色"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-moss-100 bg-white/90 px-4 py-2 text-sm font-bold text-moss-700"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onStart}
              className="rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-moss-700"
            >
              開始辨識
            </button>
            <button
              type="button"
              onClick={onPreviewSample}
              className="rounded-full border border-moss-200 bg-white px-6 py-3 text-sm font-semibold text-moss-700 transition hover:border-moss-400 hover:text-pine"
            >
              查看範例
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[30px] border border-moss-100 bg-sand p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss-500">操作節奏</p>
            <p className="mt-3 text-lg font-semibold text-pine">先看照片，再補觀察條件</p>
            <p className="mt-2 text-sm leading-7 text-moss-700">
              一進站就知道怎麼用，沒有複雜選單，直接從照片、環境與外觀關鍵線索開始。
            </p>
          </div>
          <div className="rounded-[30px] border border-moss-100 bg-sky/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss-500">結果呈現</p>
            <p className="mt-3 text-lg font-semibold text-pine">像專業自然觀察工具一樣清楚</p>
            <p className="mt-2 text-sm leading-7 text-moss-700">
              除了最可能鳥種，也會保留其他候選、辨識依據、相似鳥種比較與觀察建議。
            </p>
          </div>
          <div className="rounded-[30px] border border-moss-100 bg-white p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-xs uppercase tracking-[0.2em] text-moss-500">使用方式</p>
            <div className="mt-3 space-y-3">
              {[
                "照片先給第一輪候選，不急著只猜一個答案。",
                "大小與環境會真的影響排序，不是裝飾欄位。",
                "結果區保留學習型說明，幫你下次更快自己判斷。",
              ].map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moss-50 text-sm font-black text-pine">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-moss-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
