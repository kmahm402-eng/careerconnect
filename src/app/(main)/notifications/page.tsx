export default function NotificationsPage() {
  const notifications = [
    { icon: "❤️", text: "Yuki.Tさんがあなたの投稿に「わかる！」しました", time: "2時間前" },
    { icon: "💬", text: "Ken.Mさんがあなたの投稿にコメントしました", time: "5時間前" },
    { icon: "🏢", text: "モバイルネクスト株式会社からスカウトが届きました", time: "1日前" },
    { icon: "👤", text: "Saki.Hさんがあなたをフォローしました", time: "2日前" },
  ];
  return (
    <div className="bg-card rounded-xl border overflow-hidden">
      <div className="p-4 border-b"><h1 className="text-lg font-bold">通知</h1></div>
      <div className="divide-y">
        {notifications.map((n, i) => (
          <div key={i} className="p-4 hover:bg-muted/50 transition cursor-pointer flex items-start gap-3">
            <span className="text-xl">{n.icon}</span>
            <div className="flex-1"><p className="text-sm">{n.text}</p><p className="text-xs text-muted-foreground mt-1">{n.time}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
