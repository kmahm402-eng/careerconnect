"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/feed", icon: "📰", label: "フィード" },
  { href: "/search", icon: "🔍", label: "検索" },
  { href: "/companies", icon: "🏢", label: "企業一覧" },
  { href: "/messages", icon: "💬", label: "メッセージ" },
  { href: "/notifications", icon: "🔔", label: "通知" },
  { href: "/profile", icon: "👤", label: "マイページ" },
  { href: "/settings", icon: "⚙️", label: "設定" },
];

export function NavSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-56 shrink-0">
      <div className="sticky top-20">
        <nav className="bg-card rounded-xl border p-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-gold/10 text-brand-dark"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {item.href === "/messages" && (
                  <span className="ml-auto bg-brand-cta text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
