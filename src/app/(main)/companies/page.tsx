export default function CompaniesPage() {
  const companies = [
    { name: "モバイルネクスト株式会社", carrier: "docomo", rank: "S", area: "関東 18店舗", tenure: "4.2年", overtime: "月10h" },
    { name: "コミュニケーションパートナー", carrier: "au", rank: "S", area: "関西 22店舗", tenure: "3.8年", overtime: "月12h" },
    { name: "スマートライフ株式会社", carrier: "SoftBank", rank: "A", area: "東海 15店舗", tenure: "3.5年", overtime: "月8h" },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">企業一覧</h1>
      <p className="text-muted-foreground text-sm">すべて審査済みの優良一次代理店です</p>
      <div className="space-y-3">
        {companies.map((c, i) => (
          <div key={i} className="bg-card rounded-xl border p-5 hover:shadow-sm transition">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl ${c.rank === "S" ? "bg-gradient-to-br from-brand-gold to-brand-gold-light text-brand-dark" : "bg-gradient-to-br from-blue-500 to-blue-400 text-white"}`}>{c.rank}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{c.name}</h3>
                  <span className="text-xs font-semibold bg-brand-dark text-white px-2 py-0.5 rounded">{c.carrier}</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.area}</p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span>平均勤続 <b>{c.tenure}</b></span>
                  <span>残業 <b>{c.overtime}</b></span>
                </div>
              </div>
              <button className="px-4 py-2 bg-brand-cta text-white rounded-lg text-sm font-bold hover:bg-brand-cta-hover transition">詳細</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
