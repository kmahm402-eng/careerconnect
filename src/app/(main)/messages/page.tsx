export default function MessagesPage() {
  const chats = [
    { name: "モバイルネクスト株式会社", lastMessage: "ぜひ一度お話しできればと思います。ご都合...", time: "14:30", unread: 2, rank: "S" },
    { name: "コミュニケーションパートナー", lastMessage: "プロフィールを拝見しました。副店長候補...", time: "昨日", unread: 0, rank: "S" },
  ];
  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      <div className="p-4 border-b"><h1 className="text-lg font-bold">メッセージ</h1></div>
      <div className="divide-y">
        {chats.map((c, i) => (
          <div key={i} className="p-4 hover:bg-muted/50 transition cursor-pointer flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-navy flex items-center justify-center text-lg">🏢</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{c.name}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.rank === "S" ? "bg-brand-gold/15 text-brand-gold" : "bg-blue-50 text-blue-600"}`}>{c.rank}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">{c.time}</p>
              {c.unread > 0 && <span className="inline-block mt-1 bg-brand-cta text-white text-xs font-bold w-5 h-5 rounded-full leading-5 text-center">{c.unread}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
