"use client";
import Link from "next/link";

const CHATS = [
  { id: "11111111-1111-1111-1111-111111111111", name: "モバイルフロンティア株式会社", lastMessage: "ぜひ一度お話しできればと思います。ご都合...", time: "14:30", unread: 1, verified: true, carrier: "au", bonus: 300000 },
  { id: "demo-company-2", name: "コミュニケーションパートナー", lastMessage: "プロフィールを拝見しました。副店長候補...", time: "昨日", unread: 0, verified: true, carrier: "docomo", bonus: null },
];

export default function MessagesPage() {
  return (
    <div>
      <div className="px-4 py-3 border-b"><h1 className="text-lg font-semibold">メッセージ</h1></div>
      <div className="divide-y">
        {CHATS.map((chat) => (
          <Link key={chat.id} href={"/messages/" + chat.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">{chat.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm truncate">{chat.name}</span>
                {chat.verified && (<svg className="w-3.5 h-3.5 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>)}
                <span className="text-xs text-muted-foreground ml-auto shrink-0">{chat.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (<span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">{chat.unread}</span>)}
              </div>
              {chat.bonus && (<span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-amber-600">\u{1F381} 入社祈い金 {(chat.bonus / 10000).toFixed(0)}万円</span>)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
