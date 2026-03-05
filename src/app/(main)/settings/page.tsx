export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">設定</h1>
      <div className="bg-card rounded-xl border divide-y">
        {[
          { label: "スカウト受信", desc: "企業からのスカウトメッセージを受け取る", icon: "📩" },
          { label: "プロフィール公開範囲", desc: "全体公開 / 企業のみ / 非公開", icon: "🔒" },
          { label: "メール通知", desc: "新着メッセージ・いいねの通知", icon: "📧" },
          { label: "アカウント", desc: "メールアドレス・パスワードの変更", icon: "👤" },
          { label: "ログアウト", desc: "", icon: "🚪" },
        ].map((item, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/50 transition cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                {item.desc && <p className="text-xs text-muted-foreground">{item.desc}</p>}
              </div>
            </div>
            <span className="text-muted-foreground">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
