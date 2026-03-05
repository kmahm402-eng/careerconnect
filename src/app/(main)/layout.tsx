import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NavSidebar } from "@/components/layout/nav-sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-brand-dark border-b border-white/5 h-14 flex items-center justify-between px-4">
        <Link href="/feed" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center">
            <span className="text-brand-dark font-black text-sm">C</span>
          </div>
          <span className="font-extrabold text-white text-base">Career</span>
          <span className="font-extrabold text-brand-gold text-base">Connect</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <input
            placeholder="キーワード、スキル、企業名で検索..."
            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-gold/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link href="/notifications" className="relative p-2 text-white/50 hover:text-white transition">
            <span className="text-lg">🔔</span>
          </Link>
          <Link href="/profile" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-lg hover:bg-white/20 transition">
            👤
          </Link>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto flex gap-0 md:gap-6 px-0 md:px-4 py-0 md:py-5">
        {/* Sidebar */}
        <NavSidebar />

        {/* Main Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
