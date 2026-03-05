export default function SearchPage() {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-6">
        <h1 className="text-2xl font-bold mb-4">検索</h1>
        <input placeholder="キーワード、スキル、企業名..." className="w-full px-4 py-3 rounded-xl border bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30" />
        <div className="flex gap-2 mt-4 flex-wrap">
          {["docomo", "au", "SoftBank", "店長", "副店長", "MNP", "光回線"].map((tag) => (
            <button key={tag} className="px-3 py-1.5 bg-muted rounded-full text-xs font-medium text-muted-foreground hover:bg-gray-200 transition">{tag}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
