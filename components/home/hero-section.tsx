import { PhotoIdentifyPanel } from "@/components/home/photo-identify-panel";

const actions = [
  {
    label: "上傳照片辨識",
    href: "#upload",
    style: "primary",
  },
  {
    label: "查看常見鳥類",
    href: "#common-birds",
    style: "secondary",
  },
];

const highlights = [
  "先看懂常見鳥，不用一開始就背一堆名單",
  "用照片做初步辨識，降低新手卡關感",
  "找附近適合練習觀察的地點，從生活圈開始賞鳥",
];

const starterBirds = [
  {
    name: "白頭翁",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/%E7%99%BD%E9%A0%AD%E7%BF%81%20%2826037412116%29.jpg",
  },
  {
    name: "綠繡眼",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Japanese%20White-Eye.jpg",
  },
];

export function HeroSection() {
  return (
    <section id="home" className="relative pt-8 sm:pt-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center rounded-full border border-moss-200 bg-white/80 px-4 py-2 text-sm text-moss-700 shadow-sm backdrop-blur">
            新手友善的賞鳥入門首頁
          </div>
          <h1 className="font-serif text-4xl leading-tight text-pine sm:text-5xl sm:leading-tight lg:text-6xl">
            賞鳥助手
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-moss-800 sm:text-lg">
            幫助新手快速認識常見鳥類、上傳照片初步辨識，並找到附近適合觀鳥的地點
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={
                  action.style === "primary"
                    ? "inline-flex items-center justify-center rounded-full bg-moss-700 px-6 py-3.5 text-base font-medium text-white transition hover:bg-moss-800"
                    : "inline-flex items-center justify-center rounded-full border border-moss-300 bg-white/88 px-6 py-3.5 text-base font-medium text-moss-800 transition hover:border-moss-400 hover:bg-white"
                }
              >
                {action.label}
              </a>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-moss-700 sm:grid-cols-3 sm:text-base">
            {highlights.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/80 bg-white/72 px-4 py-4 shadow-sm backdrop-blur"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/82 p-5 shadow-card backdrop-blur sm:p-6">
            <div className="absolute right-5 top-5 rounded-full bg-sand px-3 py-1 text-xs font-medium text-moss-700">
              今日適合慢慢觀察
            </div>
            <div className="mt-10 rounded-[24px] bg-gradient-to-br from-moss-100 via-white to-sky p-5">
              <div className="grid gap-4">
                <div className="overflow-hidden rounded-[30px] border border-white/80 bg-white/92 shadow-sm">
                  <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="flex flex-col justify-between p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-moss-700">觀察小卡</p>
                          <h2 className="mt-2 text-2xl font-semibold text-pine sm:text-3xl">
                            從生活圈開始認鳥
                          </h2>
                        </div>
                        <div className="rounded-full bg-moss-50 px-3 py-1 text-sm text-moss-700 shadow-sm">
                          Step 1
                        </div>
                      </div>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-moss-700 sm:text-base">
                        不用一開始就衝山區。先把家附近、公園、學校常見的鳥看熟，你會更快建立辨識信心，也更容易把照片辨識結果對上真實觀察。
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[24px] bg-moss-50/80 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">先記住 4 種</p>
                          <p className="mt-2 text-base font-medium leading-7 text-moss-900">
                            白頭翁、綠繡眼、麻雀、珠頸斑鳩
                          </p>
                        </div>
                        <div className="rounded-[24px] bg-sky/70 p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-moss-500">優先觀察</p>
                          <p className="mt-2 text-base font-medium leading-7 text-moss-900">
                            頭部花紋、體型、出現環境、移動方式
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 bg-gradient-to-l from-moss-100/65 to-transparent p-4 sm:p-5">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {starterBirds.map((bird) => (
                          <div
                            key={bird.name}
                            className="relative overflow-hidden rounded-[24px] border border-white/80 bg-moss-100 shadow-sm"
                          >
                            <img
                              src={bird.image}
                              alt={`${bird.name} 照片`}
                              className="h-[180px] w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-pine/70 via-pine/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <p className="text-xs uppercase tracking-[0.18em] text-white/70">生活圈入門種</p>
                              <p className="mt-1 text-xl font-semibold">{bird.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[26px] bg-pine px-5 py-5 text-white shadow-sm">
                        <p className="text-sm text-white/70">今天適合做什麼</p>
                        <p className="mt-2 text-2xl font-semibold leading-tight">
                          先在生活圈找 1 種最常遇到的鳥
                        </p>
                        <p className="mt-3 text-sm leading-7 text-white/80">
                          拿手機或望遠鏡，在同一個地點多看幾次，比一次追太多鳥更容易進步。
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="rounded-full bg-white/12 px-3 py-2 text-xs font-medium text-white">
                            先看熟，再辨識
                          </span>
                          <span className="rounded-full bg-white/12 px-3 py-2 text-xs font-medium text-white">
                            從生活圈開始
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <PhotoIdentifyPanel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
