"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "首頁", href: "/", hint: "使用教學" },
  { label: "賞鳥助手", href: "/assistant", hint: "照片辨識" },
  { label: "台灣常見鳥類圖鑑", href: "/birds", hint: "完整卡片牆" },
  { label: "台北捷運賞鳥推薦", href: "/mrt-spots", hint: "路線整理" },
  { label: "觀鳥人部落格", href: "/blog", hint: "文章精選" },
  { label: "觀鳥人YT頻道", href: "/youtube", hint: "影片入口" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="surface-card rounded-[30px] px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-moss-100">
                <img
                  src="/guaniaoren-logo.png"
                  alt="觀鳥人頻道 Logo"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-moss-500">
                  Birding Guide
                </p>
                <p className="mt-1 text-xl font-black tracking-[-0.03em] text-pine">賞鳥助手</p>
                <p className="mt-1 text-sm text-moss-600">台灣鳥類辨識、圖鑑與觀察入門整合工具</p>
              </div>
            </Link>

            <div className="flex items-center gap-2 self-start rounded-full bg-moss-50 px-4 py-2 text-xs font-bold text-moss-600 lg:self-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              對新手友善的台灣賞鳥入口
            </div>
          </div>

          <nav className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`min-w-fit rounded-[22px] border px-4 py-3 transition ${
                    isActive
                      ? "border-pine bg-pine text-white shadow-card"
                      : "border-moss-100 bg-white/90 text-moss-700 hover:-translate-y-0.5 hover:border-moss-300 hover:bg-moss-50"
                  }`}
                >
                  <span className="block text-sm font-black">{item.label}</span>
                  <span className={`mt-1 block text-[11px] ${isActive ? "text-white/78" : "text-moss-500"}`}>
                    {item.hint}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
