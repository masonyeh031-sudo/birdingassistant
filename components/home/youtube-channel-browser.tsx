import {
  guanNiaoRenChannel,
  guanNiaoRenChannelSections,
  guanNiaoRenFeaturedVideos,
  guanNiaoRenPlaylists,
} from "@/lib/home-data";

export function YoutubeChannelBrowser() {
  return (
    <div className="space-y-8">
      <section className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[32px] border border-white/80 bg-white/88 p-6 shadow-card backdrop-blur sm:p-7">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss-600">
            YouTube Channel
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-pine">{guanNiaoRenChannel.name}</h2>
          <p className="mt-4 text-base leading-8 text-moss-700">{guanNiaoRenChannel.intro}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={guanNiaoRenChannel.channelUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-moss-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-pine"
            >
              前往 YouTube 頻道
            </a>
            <a
              href={guanNiaoRenChannel.playlistsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-moss-200 bg-white px-5 py-3 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
            >
              打開播放清單頁
            </a>
          </div>

          <div className="mt-6 rounded-[26px] border border-moss-100 bg-moss-50/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-moss-600">本頁主題導覽</p>
            <h3 className="mt-2 text-xl font-semibold text-pine">先用你最順手的方式開始看</h3>
            <p className="mt-3 text-sm leading-7 text-moss-700">
              這一頁我幫你整理成三種入口：想先看高觀看辨識片、想跟著播放清單系統追、或想直接看實地觀察現場，都可以很快找到適合自己的起點。
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <a
                href="#featured-videos"
                className="group rounded-[20px] border border-transparent bg-white px-4 py-4 transition duration-200 hover:-translate-y-1 hover:border-moss-200 hover:bg-moss-50 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-pine">高觀看入門</p>
                  <span className="text-base text-moss-400 transition group-hover:translate-x-0.5 group-hover:text-pine">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-moss-700">
                  先看最容易建立記憶點的熱門辨識片。
                </p>
              </a>
              <a
                href="#playlist-start"
                className="group rounded-[20px] border border-transparent bg-white px-4 py-4 transition duration-200 hover:-translate-y-1 hover:border-moss-200 hover:bg-moss-50 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-pine">播放清單追系列</p>
                  <span className="text-base text-moss-400 transition group-hover:translate-x-0.5 group-hover:text-pine">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-moss-700">
                  用系列方式一路看下去，理解會更完整。
                </p>
              </a>
              <a
                href="#field-observation"
                className="group rounded-[20px] border border-transparent bg-white px-4 py-4 transition duration-200 hover:-translate-y-1 hover:border-moss-200 hover:bg-moss-50 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-pine">田野觀察現場</p>
                  <span className="text-base text-moss-400 transition group-hover:translate-x-0.5 group-hover:text-pine">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-moss-700">
                  跟著鏡頭進到公園與步道，看真實觀察節奏。
                </p>
              </a>
            </div>
          </div>
        </div>

        <div
          id="featured-videos"
          className="rounded-[32px] border border-moss-100 bg-moss-50/70 p-6 shadow-card sm:p-7"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss-600">
            頻道推薦觀看順序
          </p>
          <p className="mt-3 text-sm leading-7 text-moss-700">
            我把目前頻道裡觀看表現最高、又最適合新手入門的鳥類影片挑成三支。直接從這裡開始看，會比先翻整個頻道更有效率。
          </p>
          <div className="mt-4 space-y-3">
            {guanNiaoRenFeaturedVideos.map((video, index) => (
              <article key={video.videoUrl} className="rounded-[24px] bg-white p-4">
                <div className="grid gap-4 sm:grid-cols-[132px_1fr] sm:items-start">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-24 w-full rounded-2xl object-cover"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-moss-500">
                      Step {index + 1}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold leading-7 text-pine">{video.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-moss-700">{video.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-moss-50 px-3 py-1 text-xs font-medium text-moss-700">
                        {video.viewCount}
                      </span>
                      {video.playlistLabel ? (
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                          {video.playlistLabel}
                        </span>
                      ) : null}
                    </div>
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
                    >
                      直接看這支影片
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="playlist-start"
        className="rounded-[32px] border border-white/80 bg-white/88 p-6 shadow-card sm:p-7"
      >
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-moss-600">
              Playlists
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-pine">用播放清單方式開始看</h3>
            <p className="mt-3 text-sm leading-7 text-moss-700">
              如果你想要的是比較像頻道首頁的觀看節奏，先從播放清單切入會最順。下面這四張卡是我幫你整理的推薦進入方式。
            </p>
          </div>
          <a
            href={guanNiaoRenChannel.playlistsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-fit rounded-full bg-moss-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-pine lg:justify-self-end"
          >
            直接看官方播放清單
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guanNiaoRenPlaylists.map((playlist) => (
            <article
              key={playlist.title}
              className={`rounded-[28px] border border-white/80 bg-gradient-to-br p-5 shadow-sm ${playlist.accent}`}
            >
              <div className="grid gap-4">
                <img
                  src={playlist.thumbnailUrl}
                  alt={playlist.videoTitle}
                  className="h-44 w-full rounded-[22px] border border-white/70 bg-white object-cover"
                />
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-moss-700">
                    Playlist
                  </span>
                  {playlist.playlistLabel ? (
                    <span className="rounded-full bg-moss-900/6 px-4 py-2 text-sm font-medium text-moss-700">
                      {playlist.playlistLabel}
                    </span>
                  ) : null}
                </div>
              </div>
              <h4 className="mt-4 text-2xl font-semibold leading-9 text-pine">{playlist.title}</h4>
              <p className="mt-3 text-sm leading-7 text-moss-700">{playlist.summary}</p>
              <div className="mt-4 rounded-2xl bg-white/78 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-moss-600">播放清單入口影片</p>
                <h5 className="mt-2 text-base font-semibold leading-7 text-pine">
                  {playlist.videoTitle}
                </h5>
                <p className="mt-2 text-sm leading-7 text-moss-900">{playlist.publishOrder}</p>
              </div>
              <div className="mt-4 rounded-2xl bg-white/78 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.18em] text-moss-600">建議看法</p>
                <p className="mt-2 text-sm leading-7 text-moss-900">{playlist.vibe}</p>
              </div>
              {playlist.note ? (
                <p className="mt-4 text-xs leading-6 text-moss-600">{playlist.note}</p>
              ) : null}
              <a
                href={playlist.playlistUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
              >
                {playlist.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        {guanNiaoRenChannelSections.map((section) => (
          <div
            key={section.title}
            id={section.title === "田野調查與觀察延伸" ? "field-observation" : undefined}
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
                  {topic.thumbnailUrl ? (
                    <img
                      src={topic.thumbnailUrl}
                      alt={topic.title}
                      className="h-44 w-full rounded-[22px] border border-moss-100 bg-moss-50 object-cover"
                    />
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topic.publishOrder ? (
                      <span className="rounded-full bg-moss-50 px-3 py-1 text-xs font-medium text-moss-700">
                        {topic.publishOrder}
                      </span>
                    ) : null}
                    {topic.viewCount ? (
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        {topic.viewCount}
                      </span>
                    ) : null}
                  </div>
                  <h4 className="text-xl font-semibold leading-8 text-pine">{topic.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-moss-700">{topic.summary}</p>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-moss-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-moss-600">主題重點</p>
                      <p className="mt-2 text-sm leading-7 text-moss-900">{topic.focus}</p>
                    </div>
                    <div className="rounded-2xl bg-sky/60 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-moss-600">適合誰先看</p>
                      <p className="mt-2 text-sm leading-7 text-moss-900">{topic.audience}</p>
                    </div>
                  </div>

                  <a
                    href={topic.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700 transition hover:border-moss-400 hover:text-pine"
                  >
                    直接看這支影片
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
