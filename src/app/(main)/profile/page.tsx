export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-brand-dark to-brand-navy" />
        <div className="px-6 pb-6 -mt-8">
          <div className="w-20 h-20 rounded-2xl bg-card border-4 border-card flex items-center justify-center text-4xl shadow-lg">👤</div>
          <h1 className="text-2xl font-bold mt-3">マイページ</h1>
          <p className="text-muted-foreground text-sm mt-1">プロフィールを編集して、スキルや実績を可視化しましょう</p>
          <button className="mt-4 px-5 py-2 bg-brand-dark text-white rounded-lg text-sm font-bold hover:bg-brand-navy transition">プロフィールを編集</button>
        </div>
      </div>
      <div className="bg-card rounded-xl border p-6">
        <h2 className="font-bold mb-4">スキルマップ</h2>
        <p className="text-muted-foreground text-sm">プロフィールを完成させると、スキルマップが表示されます。</p>
      </div>
    </div>
  );
}
