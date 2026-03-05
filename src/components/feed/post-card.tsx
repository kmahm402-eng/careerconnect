"use client";

import { useState } from "react";
import type { AnonymousPost } from "@/types/database";

interface PostCardProps {
  post: AnonymousPost & { hashtags: string[] };
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);

  const handleLike = () => {
    // TODO: Supabase に送信
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  // 残り時間の計算
  const expiresAt = new Date(post.expires_at);
  const now = new Date();
  const hoursLeft = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60)));
  const minutesLeft = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60)) % 60);
  const isExpiringSoon = hoursLeft < 3;

  // 経過時間
  const createdAt = new Date(post.created_at);
  const hoursAgo = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60));
  const timeAgo = hoursAgo < 1 ? "たった今" : `${hoursAgo}時間前`;

  const categoryColors: Record<string, string> = {
    "愚痴": "bg-red-50 text-red-600 border-red-100",
    "ノウハウ": "bg-blue-50 text-blue-600 border-blue-100",
    "質問": "bg-purple-50 text-purple-600 border-purple-100",
    "成果報告": "bg-green-50 text-green-600 border-green-100",
    "業界ニュース": "bg-amber-50 text-amber-600 border-amber-100",
    "転職相談": "bg-orange-50 text-orange-600 border-orange-100",
  };

  return (
    <article className={`bg-card rounded-xl border p-5 transition hover:shadow-sm ${isExpiringSoon ? "expire-soon" : ""}`}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg shrink-0">
          {post.avatar_url ? (
            <img src={post.avatar_url} alt="" className="w-full h-full rounded-xl object-cover" />
          ) : (
            "👤"
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{post.nickname}</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${categoryColors[post.category] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
              {post.category}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className={`text-xs font-medium ${isExpiringSoon ? "text-red-500" : "text-muted-foreground"}`}>
              {post.is_pinned ? "📌 ピン留め" : `⏱ 残り${hoursLeft}h${minutesLeft}m`}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap">{post.content}</p>

      {/* Hashtags */}
      {post.hashtags.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.hashtags.map((tag, i) => (
            <span key={i} className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 pt-3 border-t">
        <button
          onClick={handleLike}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition"
        >
          <span className="text-base">{liked ? "❤️" : "🤍"}</span>
          <span className="font-medium">{likesCount}</span>
          <span className="text-xs hidden sm:inline">わかる！</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-500 transition">
          <span className="text-base">💬</span>
          <span className="font-medium">{post.comments_count}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-amber-500 transition">
          <span className="text-base">🔖</span>
          <span className="text-xs hidden sm:inline">保存</span>
        </button>
      </div>
    </article>
  );
}
