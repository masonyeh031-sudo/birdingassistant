import type { ReactNode } from "react";

import { birdProfiles } from "@/lib/assistant-mock-data";
import type { BirdAnalysisResponse } from "@/lib/assistant-types";
import { birdCards } from "@/lib/home-data";
import { taiwanCommonGuideBirds } from "@/lib/taiwan-common-guide-data";

function findProfile(name: string) {
  return birdProfiles.find((profile) => profile.topMatch.chineseName === name);
}

function findBirdImage(name: string) {
  const card = birdCards.find((bird) => bird.name === name);
  const profile = findProfile(name);

  if (card) {
    return {
      src: card.imageSrc,
      alt: card.imageAlt,
      credit: card.imageCredit,
    };
  }

  if (profile?.imageSrc) {
    return {
      src: profile.imageSrc,
      alt: profile.imageAlt,
      credit: "",
    };
  }

  return null;
}

function findGuideBird(name: string) {
  return taiwanCommonGuideBirds.find((bird) => bird.chineseName === name);
}

function confidenceWidth(confidence: string) {
  if (confidence.includes("高")) return "w-[84%]";
  if (confidence.includes("中")) return "w-[64%]";
  return "w-[42%]";
}

function confidenceTone(confidence: string) {
  if (confidence.includes("高")) return "bg-emerald-100 text-emerald-900";
  if (confidence.includes("中")) return "bg-amber-100 text-amber-900";
  return "bg-rose-100 text-rose-900";
}

export function AnalysisResult({
  result,
  loading,
  error,
  observationCard,
}: {
  result: BirdAnalysisResponse | null;
  loading: boolean;
  error: string | null;
  observationCard?: ReactNode;
}) {
  const topProfile = result ? findProfile(result.topMatch.chineseName) : null;
  const limitedPhoto = result?.photoQuality === "limited" || Boolean(result?.needsMorePhotos);
  const uncertain =
    result?.topMatch.confidence === "低" || Boolean(result?.isCloseCall) || limitedPhoto;
  const comparisonCandidates = result ? [result.topMatch, ...result.alternatives].slice(0, 2) : [];

  return (
    <section id="analysis-result" className="mt-10">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">
          AI 分析結果區
        </p>
        <h2 className="section-title mt-3 text-pine">像自然觀察 App 一樣分段閱讀</h2>
      </div>

      {loading ? (
        <div className="rounded-[36px] border border-moss-100 bg-white/90 p-6 shadow-card">
          <div className="h-2 w-full overflow-hidden rounded-full bg-moss-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-pine" />
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[28px] bg-moss-50/70 p-5">
              <div className="h-6 w-32 animate-pulse rounded-full bg-moss-200" />
              <div className="mt-4 h-10 w-56 animate-pulse rounded-2xl bg-moss-200" />
              <div className="mt-6 h-[280px] animate-pulse rounded-[28px] bg-moss-100" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-moss-100">
                  <div className="h-5 w-28 animate-pulse rounded-full bg-moss-100" />
                  <div className="mt-3 h-20 animate-pulse rounded-2xl bg-moss-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-[32px] border border-rose-100 bg-rose-50 px-5 py-5 text-sm leading-7 text-rose-800 shadow-sm">
          {error}
        </div>
      ) : null}

      {!loading && !error && !result ? (
        <div className="space-y-5">
          <div className="rounded-[36px] border border-moss-100 bg-white/90 p-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-moss-500">等待分析</p>
            <h3 className="mt-3 text-2xl font-bold text-pine">按下「開始分析」後，這裡會顯示候選鳥種與觀察解說</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-moss-600">
              我們會先呈現最可能鳥種，再列出其他可能選項、判斷依據、生態資訊、相似鳥種比較與延伸調查建議。
            </p>
          </div>
          {observationCard}
        </div>
      ) : null}

      {result ? (
        <div className="space-y-5 rounded-[36px] border border-moss-100 bg-white/92 p-6 shadow-card">
          {result.initialCandidates?.length ? (
            <div className="rounded-[32px] border border-white/80 bg-moss-50/55 p-4 shadow-sm sm:p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">
                    第一階段：照片初步辨識
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-pine">照片初判候選卡片</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-moss-600">
                    先只看照片中的輪廓、嘴型、腿長、羽色分布與姿態，保留最可能的候選鳥種。
                  </p>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-moss-700 shadow-sm ring-1 ring-moss-100">
                  共 {result.initialCandidates.length} 張初判卡
                </span>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {result.initialCandidates.map((item, index) => {
                  const image = findBirdImage(item.chineseName);
                  const guideBird = findGuideBird(item.chineseName);

                  return (
                    <article
                      key={`${item.chineseName}-${index}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[30px] border border-white/80 bg-white/94 p-3 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-moss-50">
                        {image ? (
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(220,236,242,0.95),rgba(246,240,227,0.7))] px-5 text-center text-sm font-semibold text-moss-600">
                            這個候選先以文字線索保守呈現
                          </div>
                        )}
                        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-pine shadow-sm">
                          初判候選 {index + 1}
                        </span>
                        <span className="absolute bottom-4 right-4 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold text-moss-700 shadow-sm">
                          {item.confidence}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">
                              {guideBird?.group ?? result.likelyGroup ?? "照片候選"}
                            </p>
                            <h4 className="mt-2 text-2xl font-black text-pine">{item.chineseName}</h4>
                          </div>
                          <span className="shrink-0 rounded-full bg-moss-50 px-3 py-1 text-xs font-semibold text-moss-700">
                            {guideBird?.size ?? item.confidence}
                          </span>
                        </div>

                        <div className="mt-4 space-y-3 text-sm leading-6 text-moss-700">
                          <p>
                            <span className="font-semibold text-pine">英文名：</span>
                            {item.englishName}
                          </p>
                          <p>
                            <span className="font-semibold text-pine">學名：</span>
                            <span className="italic">{item.scientificName}</span>
                          </p>
                          {guideBird ? (
                            <p>
                              <span className="font-semibold text-pine">常見環境：</span>
                              {guideBird.habitat}
                            </p>
                          ) : null}
                          <p>
                            <span className="font-semibold text-pine">照片支持理由：</span>
                            {item.reasoning[0] ?? "照片線索仍需補拍確認。"}
                          </p>
                        </div>

                        <div className="mt-4 grid gap-2">
                          {item.reasoning.slice(1, 3).map((reason) => (
                            <p
                              key={reason}
                              className="rounded-2xl bg-moss-50/80 px-3 py-2 text-sm leading-6 text-moss-700"
                            >
                              {reason}
                            </p>
                          ))}
                        </div>

                        {image?.credit ? (
                          <p className="mt-auto pt-4 text-[11px] leading-5 text-moss-400">
                            圖片來源：{image.credit}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : null}

          {limitedPhoto ? (
            <div className="rounded-[28px] border border-orange-200 bg-orange-50 px-5 py-4 text-sm leading-7 text-orange-900">
              這次照片可用資訊有限
              {result.photoIssues?.length ? `：${result.photoIssues.join("、")}。` : "。"}
              系統已主動降低信心，並優先把結果視為保守候選清單。建議先補拍更清楚的全身或側面照，再重新分析。
            </div>
          ) : null}

          {uncertain ? (
            <div className="rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
              {limitedPhoto
                ? "因為這張照片本身的辨識條件不足，所以這次更適合把結果理解成候選排序，而不是單一答案。"
                : result.isCloseCall
                ? `第一名和第二名目前差距很小，這次更適合解讀成「${result.combinedLikely}」。建議再補一張更清楚的側面或全身照，優先比對頭部花紋、嘴型和尾巴比例。`
                : "這次分析還沒有拉開非常明顯的差距，目前比較像是「可能是以下幾種鳥類」。建議再補一張更清楚的側面或全身照，並多填幾個外觀與行為線索。"}
            </div>
          ) : null}

          <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[32px] border border-moss-100 bg-moss-50/65 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-moss-500">
                    候選 1 · 最可能鳥種
                  </p>
                  <h3 className="mt-3 text-4xl font-black text-pine">
                    {result.topMatch.chineseName}
                  </h3>
                  <p className="mt-2 text-lg text-moss-700">
                    {result.topMatch.englishName} · {result.topMatch.scientificName}
                  </p>
                </div>
                <div className="rounded-[24px] border border-white bg-white px-4 py-3 text-right shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-moss-500">辨識信心程度</p>
                  <p className="mt-2 text-2xl font-bold text-pine">{result.topMatch.confidence}</p>
                </div>
              </div>

              <div className="mt-5 h-2 rounded-full bg-white">
                <div className={`h-full rounded-full bg-pine ${confidenceWidth(result.topMatch.confidence)}`} />
              </div>

              {result.likelyGroup ? (
                <div className="mt-4 rounded-[24px] border border-moss-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">最可能類群</p>
                  <p className="mt-2 text-base font-bold text-pine">{result.likelyGroup}</p>
                </div>
              ) : null}

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "最可能答案",
                    value: result.combinedLikely ?? result.topMatch.chineseName,
                    tone: "bg-white text-pine",
                  },
                  {
                    label: "照片品質",
                    value: limitedPhoto ? "需補拍" : "可判讀",
                    tone: limitedPhoto ? "bg-orange-50 text-orange-900" : "bg-emerald-50 text-emerald-900",
                  },
                  {
                    label: "決定性條件",
                    value: result.decisiveFactor ?? "照片輪廓與環境",
                    tone: "bg-sky/60 text-pine",
                  },
                ].map((item) => (
                  <div key={item.label} className={`rounded-[24px] px-4 py-4 shadow-sm ${item.tone}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">{item.label}</p>
                    <p className="mt-2 text-base font-black leading-7">{item.value}</p>
                  </div>
                ))}
              </div>

              {topProfile ? (
                <div className="mt-5 overflow-hidden rounded-[28px] bg-white">
                  <img
                    src={topProfile.imageSrc}
                    alt={topProfile.imageAlt}
                    className="h-[320px] w-full bg-moss-50 object-contain"
                  />
                </div>
              ) : null}

              <div className="mt-5 rounded-[24px] bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">觀察摘要</p>
                <p className="mt-3 text-sm leading-7 text-moss-700">{result.observationSummary}</p>
              </div>

              {result.analysisModeNote ? (
                <div className="mt-4 rounded-[24px] border border-moss-100 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">分析方式</p>
                  <p className="mt-3 text-sm leading-7 text-moss-700">{result.analysisModeNote}</p>
                </div>
              ) : null}

              {result.photoIssues?.length ? (
                <div className="mt-4 rounded-[24px] border border-orange-200 bg-orange-50 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-800">照片限制</p>
                  <p className="mt-3 text-sm leading-7 text-orange-900">
                    {result.photoIssues.join("、")}。這些因素會直接降低辨識信心，請優先補拍再做第二次分析。
                  </p>
                </div>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-moss-100 bg-[linear-gradient(135deg,rgba(245,241,233,0.95),rgba(255,255,255,0.98)_56%,rgba(219,232,236,0.52))] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">結果總覽</p>
                <div className="mt-4 grid gap-3">
                  {[
                    { label: "最可能類群", value: result.likelyGroup ?? "待交叉比對" },
                    { label: "與環境吻合度", value: result.environmentFit ?? "尚未補充說明" },
                    { label: "與大小吻合度", value: result.sizeFit ?? "尚未補充說明" },
                    { label: "與顏色吻合度", value: result.colorFit ?? "尚未補充說明" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[22px] bg-white/92 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">{item.label}</p>
                      <p className="mt-2 text-sm leading-7 text-moss-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">判斷依據</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-moss-700">
                  {result.topMatch.reasoning.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] border border-moss-100 bg-sand p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">鳥類介紹</p>
                <p className="mt-3 text-sm leading-7 text-moss-700">{result.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">棲地</p>
                  <p className="mt-3 text-sm leading-7 text-moss-700">{result.habitat}</p>
                </div>
                <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">食性</p>
                  <p className="mt-3 text-sm leading-7 text-moss-700">{result.diet}</p>
                </div>
                <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">行為</p>
                  <p className="mt-3 text-sm leading-7 text-moss-700">{result.behavior}</p>
                </div>
                <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">台灣常見度</p>
                  <p className="mt-3 text-sm leading-7 text-moss-700">{result.commonnessTaiwan}</p>
                </div>
              </div>
            </div>
          </div>

          {observationCard}

          <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-4">
              {comparisonCandidates.length > 1 ? (
                <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">前兩名差異比較</p>
                      <h3 className="mt-2 text-2xl font-black text-pine">第一名與第二名的判斷重點</h3>
                    </div>
                    <span className="rounded-full bg-moss-50 px-3 py-1 text-xs font-bold text-moss-700">
                      {result.isCloseCall ? "分數接近" : "已有明顯排序"}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {comparisonCandidates.map((item, index) => {
                      const image = findBirdImage(item.chineseName);

                      return (
                        <article
                          key={`${item.chineseName}-compare`}
                          className="overflow-hidden rounded-[24px] border border-moss-100 bg-moss-50/65"
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-white">
                            {image ? (
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center px-4 text-sm font-semibold text-moss-600">
                                目前沒有對應照片
                              </div>
                            )}
                          </div>
                          <div className="space-y-3 p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">
                                  候選 {index + 1}
                                </p>
                                <p className="mt-1 text-xl font-black text-pine">{item.chineseName}</p>
                                <p className="text-sm text-moss-600">{item.englishName}</p>
                              </div>
                              <span className={`rounded-full px-3 py-1 text-xs font-bold ${confidenceTone(item.confidence)}`}>
                                {item.confidence}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {item.reasoning.slice(0, 2).map((reason) => (
                                <p key={reason} className="rounded-2xl bg-white px-3 py-2 text-sm leading-6 text-moss-700">
                                  {reason}
                                </p>
                              ))}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">其他可能鳥種</p>
                <div className="mt-4 space-y-3">
                  {result.alternatives.map((item, index) => (
                    <div key={item.chineseName} className="rounded-[22px] bg-moss-50/70 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">
                            候選 {index + 2}
                          </p>
                          <p className="text-lg font-bold text-pine">{item.chineseName}</p>
                          <p className="text-sm text-moss-600">
                            {item.englishName} · {item.scientificName}
                          </p>
                        </div>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-moss-700">
                          {item.confidence}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2 text-sm leading-7 text-moss-700">
                        {item.reasoning.map((reason) => (
                          <li key={reason}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {(result.likelyGroup ||
                result.keyFeatures?.length ||
                result.environmentFit ||
                result.sizeFit ||
                result.colorFit ||
                result.autoColorSummary ||
                result.colorInfluenceSummary ||
                result.manualColorImpact ||
                result.decisiveFactor) ? (
                <div className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">綜合判斷</p>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-moss-700">
                    {result.likelyGroup ? (
                      <p>
                        <span className="font-semibold text-pine">最可能類群：</span>
                        {result.likelyGroup ?? "尚待確認"}
                      </p>
                    ) : null}
                    {result.keyFeatures?.length ? (
                      <p>
                        <span className="font-semibold text-pine">關鍵辨識特徵：</span>
                        {result.keyFeatures.join("、")}
                      </p>
                    ) : null}
                    {result.environmentFit ? (
                      <p>
                        <span className="font-semibold text-pine">與環境是否吻合：</span>
                        {result.environmentFit}
                      </p>
                    ) : null}
                    {result.sizeFit ? (
                      <p>
                        <span className="font-semibold text-pine">與大小是否吻合：</span>
                        {result.sizeFit}
                      </p>
                    ) : null}
                    {result.colorFit ? (
                      <p>
                        <span className="font-semibold text-pine">與顏色選擇是否吻合：</span>
                        {result.colorFit}
                      </p>
                    ) : null}
                    {result.autoColorSummary ? (
                      <p>
                        <span className="font-semibold text-pine">AI 為什麼預設這些顏色：</span>
                        {result.autoColorSummary}
                      </p>
                    ) : null}
                    {result.colorInfluenceSummary ? (
                      <p>
                        <span className="font-semibold text-pine">自動預設顏色是否影響結果：</span>
                        {result.colorInfluenceSummary}
                      </p>
                    ) : null}
                    {result.manualColorImpact ? (
                      <p>
                        <span className="font-semibold text-pine">使用者調整顏色後：</span>
                        {result.manualColorImpact}
                      </p>
                    ) : null}
                    {result.decisiveFactor ? (
                      <p>
                        <span className="font-semibold text-pine">最影響辨識結果的條件：</span>
                        {result.decisiveFactor}
                      </p>
                    ) : null}
                    {result.rankingChangeNote ? (
                      <p>
                        <span className="font-semibold text-pine">為什麼新的排序比原本更合理：</span>
                        {result.rankingChangeNote}
                      </p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {result.eliminatedCandidates?.length ? (
                <details className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm" open>
                  <summary className="cursor-pointer list-none text-lg font-bold text-pine">
                    哪些原候選被淘汰
                  </summary>
                  <div className="mt-4 space-y-3">
                    {result.eliminatedCandidates.map((item) => (
                      <div key={item.chineseName} className="rounded-[22px] bg-rose-50 p-4">
                        <p className="text-base font-bold text-pine">{item.chineseName}</p>
                        <p className="mt-2 text-sm leading-7 text-moss-700">{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </details>
              ) : null}

              <details className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm" open>
                <summary className="cursor-pointer list-none text-lg font-bold text-pine">
                  相似鳥種比較
                </summary>
                <div className="mt-4 space-y-3">
                  {result.similarSpecies.map((species) => (
                    <div key={species.chineseName} className="rounded-[22px] bg-sky/60 p-4">
                      <p className="text-base font-bold text-pine">{species.chineseName}</p>
                      <p className="mt-2 text-sm leading-7 text-moss-700">{species.note}</p>
                      <p className="mt-2 text-sm leading-7 text-moss-700">
                        <span className="font-semibold text-pine">先看：</span>
                        {species.compareFocus}
                      </p>
                    </div>
                  ))}
                </div>
              </details>

              <details className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm" open>
                <summary className="cursor-pointer list-none text-lg font-bold text-pine">
                  觀察小提醒與延伸調查建議
                </summary>
                <div className="mt-4 space-y-3">
                  {result.surveySuggestions.map((item) => (
                    <div key={item} className="rounded-[22px] bg-sand p-4 text-sm leading-7 text-moss-700">
                      {item}
                    </div>
                  ))}
                </div>
              </details>

              {(result.missingInfo?.length || result.suggestedPhotos?.length) ? (
                <details className="rounded-[28px] border border-moss-100 bg-white p-5 shadow-sm" open>
                  <summary className="cursor-pointer list-none text-lg font-bold text-pine">
                    若仍不確定
                  </summary>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-moss-700">
                    {result.missingInfo?.length ? (
                      <div className="rounded-[22px] bg-moss-50/70 p-4">
                        <p className="font-semibold text-pine">缺少哪些關鍵資訊</p>
                        <p className="mt-2">{result.missingInfo.join("、")}</p>
                      </div>
                    ) : null}
                    {result.uncertaintyFactors?.length ? (
                      <div className="rounded-[22px] bg-amber-50 p-4">
                        <p className="font-semibold text-pine">不確定因素</p>
                        <p className="mt-2">{result.uncertaintyFactors.join("、")}</p>
                      </div>
                    ) : null}
                    {result.suggestedPhotos?.length ? (
                      <div className="rounded-[22px] bg-sky/60 p-4">
                        <p className="font-semibold text-pine">建議補充什麼照片或觀察資訊</p>
                        <p className="mt-2">{result.suggestedPhotos.join("、")}</p>
                      </div>
                    ) : null}
                  </div>
                </details>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
