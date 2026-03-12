"use client";
import { useState } from "react";

const POSTS = [
  { id: "1", name: "Yuki.T", category: "ノウハウ", content: "今月MNP 32件獲得！コツは料金の安さじゃなくて「乗り換えたら生活がどう変わるか」を伝えること。価格訴求だけだと他店に取られます。", likes: 48, comments: 12, time: "2時間前", hashtags: ["#MNP", "#au"] },
  { id: "2", name: "Ken.M", category: "ノウハウ", content: "光回線の提案：「スマホ代はそのまま、でもお家のネット代が月2,000円下がります」って言うと成約率70%超え。", likes: 31, comments: 8, time: "8時間前", hashtags: ["#光回線", "#営業トーク"] },
  { id: "3", name: "Saki.H", category: "愚痴", content: "月末にまたノルマ変更…。先月達成したのに今月はさらに上乗せ。みんなもこんな感じですか？正直モチベ下がる…", likes: 89, comments: 24, time: "14時間前", hashtags: ["#ノルマ", "#愚痴"] },
];

export default function FeedPage() {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  return (
    <div>
      <div className="border-b p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">Y</div>
          <input placeholder="今の気持ちをシェアしよう..." className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground" />
        </div>
        <div className="flex justify-between items-center mt-3 pl-[52px]">
          <span className="text-xs text-muted-foreground">24時間で消えます</span>
          <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold hover:opacity-90 transition">投稿する</button>
        </div>
      </div>
      {POSTS.map((post) => (
        <article key={post.id} className="border-b p-4 hover:bg-secondary/30 transition-colors">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">{post.name[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-sm">{post.name}</span>
                <span className="text-xs text-muted-foreground">{post.time}</span>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{post.category}</span>
              </div>
              <p className="text-sm leading-relaxed mb-2">{post.content}</p>
              <div className="flex items-center gap-1 mb-2.5">{post.hashtags.map((tag, i) => (<span key={i} className="text-xs text-primary font-medium">{tag} </span>))}</div>
              <div className="flex items-center gap-6">
                <button onClick={() => setLiked(p => ({...p, [post.id]: !p[post.id]}))} className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition text-sm"><svg className="w-4 h-4" fill={liked[post.id] ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg><span>{post.likes + (liked[post.id] ? 1 : 0)}</span></button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition text-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" /></svg><span>{post.comments}</span></button>
                <button className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition text-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg></button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
