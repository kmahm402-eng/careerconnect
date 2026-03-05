import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CareerConnect",
  description: "Anonymous SNS and direct recruiting platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background">{children}</body>
    </html>
  );
}
