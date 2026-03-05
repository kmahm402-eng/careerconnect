"use client";

const TRENDING_TAGS = [
  { tag: "#MNP獲得テク", count: 128 },
  { tag: "#インセンティブ透明化", count: 94 },
  { tag: "#au新プラン", count: 76 },
  { tag: "#店長のひとりごと", count: 61 },
  { tag: "#光回線提案", count: 45 },
];

const HIRING_COMPANIES = [
  { name: "モバイルネクスト", carrier: "docomo", rank: "S" },
  { name: "コミュニケーションパートナー", carrier: "au", rank: "S" },
  { name: "デジタルブリッジ", carrier: "au", rank: "A" },
];

export function TrendingSidebar() {
  return (
    <div className="sticky top-20 space-y-4">
      {/* Trending */}
      <div className="bg-card rounded-xl border p-4">
        <h3 className="font-bold text-sm mb-3">🔥 トレンド</h3>
        <div className="space-y-2.5">
          {TRENDING_TAGS.map((t, i) => (
            <div key={i} className="cursor-pointer group">
              <span className="text-sm font-semibold text-blue-600 group-hover:underline">
                {t.tag}
              </span>
              <p className="text-xs text-muted-foreground">{t.count}件の投稿</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring */}
      <div className="bg-card rounded-xl border p-4">
        <h3 className="font-bold text-sm mb-3">🏢 採用中の企業</h3>
        <div className="space-y-3">
          {HIRING_COMPANIES.map((c, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold">{c.name}</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      c.rank === "S"
                        ? "bg-brand-gold/15 text-brand-gold"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {c.rank}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{c.carrier}</span>
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                採用中
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Market value CTA */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-navy rounded-xl p-5">
        <p className="text-brand-gold text-sm font-bold mb-2">📊 市場価値診断</p>
        <p className="text-white/50 text-xs leading-relaxed mb-4">
          あなたのスキルが今の市場でどう評価されるか、無料で診断します
        </p>
        <button className="w-full py-2.5 bg-brand-cta text-white rounded-lg text-sm font-bold hover:bg-brand-cta-hover transition">
          無料で診断する
        </button>
      </div>
    </div>
  );
}
