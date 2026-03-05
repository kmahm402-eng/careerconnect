import Link from "next/link";

const NAV = [
  { href: "/feed", icon: "home", label: "Home" },
  { href: "/search", icon: "search", label: "Search" },
  { href: "/companies", icon: "building", label: "Companies" },
  { href: "/messages", icon: "chat", label: "Messages" },
  { href: "/profile", icon: "user", label: "Profile" },
];

function NavIcon({ name }: { name: string }) {
  const icons: Record<string, string> = { home: "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11l2 2v8a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1", search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", building: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0v-2M5 21H3m2 0v-2m0 0V9m14 0v10M9 9h1m4 0h1m-6 4h1m4 0h1", chat: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" };
  return (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={icons[name] || ""} /></svg>);
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b px-4 h-12 flex items-center justify-between">
        <span className="font-bold text-lg text-primary">CareerConnect</span>
        <Link href="/notifications" className="p-2 text-muted-foreground"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg></Link>
      </header>

      <div className="max-w-5xl mx-auto flex">
        {/* PC Left Sidebar */}
        <aside className="hidden md:flex flex-col w-[200px] shrink-0 sticky top-0 h-screen pt-6 px-3">
          <Link href="/feed" className="font-bold text-xl text-primary mb-8 px-3">CareerConnect</Link>
          <nav className="space-y-1">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors">
                <NavIcon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto pb-6 px-3">
            <Link href="/settings" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Settings</span>
            </Link>
          </div>
        </aside>

        {/* Main Content - max 600px */}
        <main className="flex-1 min-w-0 max-w-feed mx-auto border-x min-h-screen">
          {children}
        </main>

        {/* PC Right Sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0 sticky top-0 h-screen pt-6 px-4 overflow-y-auto">
          {/* Search */}
          <div className="relative mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
          </div>
          {/* Trending */}
          <div className="bg-card rounded-2xl border p-4 mb-4">
            <h3 className="font-semibold text-sm mb-3">Trending</h3>
            <div className="space-y-3">
              {["#MNP獲得テク", "#インセンティブ透明化", "#au新プラン", "#光回線提案"].map((tag, i) => (
                <div key={i} className="cursor-pointer group">
                  <span className="text-sm font-medium text-primary group-hover:underline">{tag}</span>
                  <p className="text-xs text-muted-foreground">{[128, 94, 76, 45][i]} posts</p>
                </div>
              ))}
            </div>
          </div>
          {/* Hiring */}
          <div className="bg-card rounded-2xl border p-4">
            <h3 className="font-semibold text-sm mb-3">Now Hiring</h3>
            <div className="space-y-3">
              {[{ n: "Mobile Next", c: "docomo" }, { n: "Comm Partner", c: "au" }, { n: "Smart Life", c: "SoftBank" }].map((co, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div><p className="text-sm font-medium">{co.n}</p><p className="text-xs text-muted-foreground">{co.c}</p></div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Hiring</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-card/80 backdrop-blur-xl border-t">
        <div className="flex justify-around py-2">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 p-1 text-muted-foreground">
              <NavIcon name={item.icon} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
