"use client";

import { useState } from "react";
import { PostComposer } from "@/components/feed/post-composer";
import { PostCard } from "@/components/feed/post-card";
import { TrendingSidebar } from "@/components/feed/trending-sidebar";
import { POST_CATEGORIES } from "@/types/database";

// TODO: Supabaseからリアルタイムで取得する
const MOCK_POSTS = [
  {
    id: "1",
    nickname: "Yuki.T",
    avatar_url: null,
    category: "成果報告",
    content:
      "今月MNP獲得が過去最高を更新しました！32件。ポイントは「乗り換え後の生活がどう変わるか」を具体的に伝えること。料金の安さだけじゃなく、使い方まで提案すると信頼されます！",
    likes_count: 48,
    comments_count: 12,
    hashtags: ["#MNP獲得テク", "#au"],
    expires_at: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    is_pinned: false, image_url: null,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    nickname: "Ken.M",
    avatar_url: null,
    category: "ノウハウ",
    content:
      "光回線の提案で悩んでいる方へ。「スマホの料金は下がらないけど、お家のネット代は下がりますよ」という切り口が最近刺さります。実際に月々の約7割がこのトークで決まってます。",
    likes_count: 31,
    comments_count: 8,
    hashtags: ["#光回線", "#提案テク"],
    expires_at: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    is_pinned: false, image_url: null,
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    nickname: "Saki.H",
    avatar_url: null,
    category: "愚痴",
    content:
      "また月末のノルマ変更。先月達成したのに基準上げるのやめてほしい。頑張っても報われない感じがしんどい…同じ気持ちの人いますか？",
    likes_count: 89,
    comments_count: 24,
    hashtags: ["#ノルマ", "#愚痴"],
    expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    is_pinned: false, image_url: null,
    created_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
  },
];

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState<string>("すべて");

  const categories = ["すべて", ...POST_CATEGORIES];

  const filtered =
    activeCategory === "すべて"
      ? MOCK_POSTS
      : MOCK_POSTS.filter((p) => p.category === activeCategory);

  return (
    <div className="flex gap-5">
      {/* Main feed */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Post Composer */}
        <PostComposer />

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === cat
                  ? "bg-brand-dark text-white"
                  : "bg-card border text-muted-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <TrendingSidebar />
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
