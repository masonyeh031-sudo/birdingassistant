"use client";

import { useMemo, useState } from "react";

import { birdingSpots, mrtLines } from "@/lib/home-data";

export function BirdingSpotsBrowser() {
  const [lineKey, setLineKey] = useState<(typeof mrtLines)[number]["key"]>("all");

  const visibleSpots = useMemo(
    () => birdingSpots.filter((spot) => (lineKey === "all" ? true : spot.lineKey === lineKey)),
    [lineKey]
  );

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2">
        {mrtLines.map((line) => {
          const active = line.key === lineKey;

          return (
            <button
              key={line.key}
              type="button"
              onClick={() => setLineKey(line.key)}
              className={
                active
                  ? "rounded-full bg-moss-700 px-4 py-2 text-sm font-medium text-white"
                  : "rounded-full border border-moss-200 bg-white px-4 py-2 text-sm font-medium text-moss-700"
              }
            >
              {line.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-[24px] border border-white/70 bg-white/80 px-4 py-4 shadow-sm">
        <p className="text-sm text-moss-700">
          目前顯示 {visibleSpots.length} 條路線，資料整理自大台北捷運賞鳥綠地圖的捷運可達賞鳥點。
        </p>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        {visibleSpots.map((spot, index) => (
          <article
            key={`${spot.lineKey}-${spot.name}`}
            className={`rounded-[28px] border p-5 ${spot.tone} transition hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-moss-600">
                  推薦路線 {index + 1} ・ {spot.line}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-pine">{spot.name}</h3>
                <p className="mt-2 text-sm font-medium text-moss-700">{spot.station}</p>
              </div>
              <div className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-moss-700">
                捷運可達
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-moss-700">{spot.summary}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-moss-500">環境類型</p>
                <p className="mt-2 text-sm font-medium text-moss-900">{spot.habitatType}</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-moss-500">鳥種數</p>
                <p className="mt-2 text-sm font-medium text-moss-900">{spot.speciesCount} 種</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-moss-500">路程公里</p>
                <p className="mt-2 text-sm font-medium text-moss-900">{spot.distanceKm} km</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">你可能先遇到的鳥</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {spot.birds.map((bird) => (
                  <span
                    key={bird}
                    className="rounded-full bg-moss-100 px-3 py-1.5 text-sm font-medium text-moss-800"
                  >
                    {bird}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/80 bg-white/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">建議前往時間</p>
              <p className="mt-2 text-sm font-medium leading-6 text-moss-900">{spot.bestTime}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/80 bg-white/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">適合誰先去</p>
              <p className="mt-2 text-sm font-medium leading-6 text-moss-900">{spot.bestFor}</p>
            </div>

            <div className="mt-4 rounded-2xl border border-white/80 bg-white/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-moss-500">對照原始路線名稱</p>
              <p className="mt-2 text-sm font-medium leading-6 text-moss-900">{spot.route}</p>
            </div>

            <a
              href={spot.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-medium text-moss-700 underline-offset-4 transition hover:text-pine hover:underline"
            >
              查看原網站路線資料
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
