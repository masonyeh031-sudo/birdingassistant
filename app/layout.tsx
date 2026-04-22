import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "賞鳥助手",
  description: "幫助新手快速認識常見鳥類、上傳照片初步辨識，並找到附近適合觀鳥的地點。",
  icons: {
    icon: "/guaniaoren-logo.png",
    apple: "/guaniaoren-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body { margin: 0; width: 100%; max-width: 100%; overflow-x: hidden; }
              *, *::before, *::after { box-sizing: border-box; }
              img, svg, video, canvas { max-width: 100%; }
              img[alt="觀鳥人頻道 Logo"] {
                width: 56px !important;
                height: 56px !important;
                min-width: 56px !important;
                max-width: 56px !important;
                min-height: 56px !important;
                max-height: 56px !important;
                object-fit: cover !important;
                display: block !important;
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
