import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CareerConnect - 携帯業界で、次こそいい代理店に出会う",
  description:
    "携帯キャリアショップスタッフ向けの匿名SNS＆ダイレクトリクルーティングプラットフォーム。中抜きのない採用市場をつくる。",
  openGraph: {
    title: "CareerConnect",
    description: "携帯業界で、次こそいい代理店に出会う",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
