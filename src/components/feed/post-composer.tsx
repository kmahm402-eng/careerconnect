"use client";

import { useState } from "react";
import { POST_CATEGORIES } from "@/types/database";

export function PostComposer() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("ノウハウ");
  const [isOpen, setIsOpen] = useState(false);
  const maxLength = 140;

  const handleSubmit = async () => {
    if (!content.trim()) return;
    // TODO: Supabase に投稿
    console.log({ content, category });
    setContent("");
    setIsOpen(false);
  };

  return (
    <div className="bg-card rounded-xl border p-4">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex-1 py-2.5 px-4 bg-muted rounded-lg text-sm text-muted-foreground text-left">
            今日のノウハウや気持ちを共有しよう...
          </div>
        </button>
      ) : (
        <div className="space-y-3">
          {/* Category selector */}
          <div className="flex gap-2 flex-wrap">
            {POST_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  category === cat
                    ? "bg-brand-dark text-white"
                    : "bg-muted text-muted-foreground hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Text input */}
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) setContent(e.target.value);
            }}
            placeholder={
              category === "愚痴"
                ? "今日のモヤモヤを吐き出そう（24時間で消えます）"
                : category === "ノウハウ"
                ? "うまくいった提案方法や業務Tipsを共有しよう"
                : "投稿内容を入力..."
            }
            className="w-full h-24 px-4 py-3 bg-muted rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-gold/30 placeholder:text-muted-foreground"
            autoFocus
          />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium ${
                  content.length > maxLength * 0.9
                    ? "text-red-500"
                    : "text-muted-foreground"
                }`}
              >
                {content.length}/{maxLength}
              </span>
              <span className="text-xs text-muted-foreground">
                ⏱ 24時間で自動消去
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setContent("");
                }}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition"
              >
                キャンセル
              </button>
              <button
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="px-5 py-2 bg-brand-cta text-white rounded-lg text-sm font-bold disabled:opacity-40 hover:bg-brand-cta-hover transition"
              >
                投稿する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
