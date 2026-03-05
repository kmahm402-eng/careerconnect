import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center">
            <span className="text-brand-dark font-black text-lg">C</span>
          </div>
          <span className="font-extrabold text-white text-lg">Career</span>
          <span className="font-extrabold text-brand-gold text-lg">Connect</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm text-white/60 hover:text-white transition"
          >
            ログイン
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2 bg-brand-cta text-white rounded-lg text-sm font-bold hover:bg-brand-cta-hover transition shadow-lg shadow-brand-cta/30"
          >
            無料会員登録
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-gold/10 rounded-full border border-brand-gold/20 mb-8">
          <div className="w-2 h-2 rounded-full bg-brand-gold shadow-[0_0_8px] shadow-brand-gold" />
          <span className="text-brand-gold text-sm font-semibold tracking-wide">
            審査済み優良一次代理店のみ掲載
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
          携帯業界で、
          <br />
          <span className="bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent">
            次こそいい代理店に出会う。
          </span>
        </h1>

        <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-xl">
          掲載はすべて独自審査を通過した優良一次代理店のみ。
          <br />
          あなたの経験を、正しく評価してくれる場所へ。
        </p>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/auth/register"
            className="px-8 py-4 bg-brand-cta text-white rounded-xl text-lg font-bold hover:bg-brand-cta-hover transition shadow-xl shadow-brand-cta/40"
          >
            無料で会員登録する
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-semibold border border-white/15 hover:bg-white/10 transition"
          >
            ログインする →
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🔒",
              title: "完全匿名で安心",
              desc: "匿名プロフィールで活動。投稿と実名は完全に分離。",
            },
            {
              icon: "💬",
              title: "24時間で消える投稿",
              desc: "愚痴もノウハウも気軽に。投稿は24時間で自動消去。",
            },
            {
              icon: "🎯",
              title: "企業と直接つながる",
              desc: "中抜きゼロ。企業からのスカウトも自分からの売り込みも自由。",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/[0.03] rounded-2xl p-6 border border-white/5"
            >
              <span className="text-3xl block mb-4">{f.icon}</span>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-8 border-t border-white/5">
        <p className="text-white/20 text-xs text-center">
          © 2026 CareerConnect Inc. ｜ 特定募集情報等提供事業者
        </p>
      </footer>
    </div>
  );
}
