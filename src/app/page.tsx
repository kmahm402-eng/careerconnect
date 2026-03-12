import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-6 py-5">
        <span className="font-bold text-xl text-primary">CareerConnect</span>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition">ログイン</Link>
          <Link href="/auth/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-soft">無料で始める</Link>
        </div>
      </nav>
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 tracking-tight text-foreground">あなたのスキルに<br /><span className="text-primary">ふさわしい職場を。</span></h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">匿名SNSとダイレクトリクルーティング。中間マージンゼロ。優良企業と直接つながるプラットフォーム。</p>
        <div className="flex gap-3">
          <Link href="/auth/register" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-base font-semibold hover:opacity-90 transition shadow-soft-md">無料で始める</Link>
          <Link href="/auth/login" className="px-6 py-3 bg-secondary text-foreground rounded-xl text-base font-medium hover:bg-secondary/80 transition">ログイン</Link>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-4">
          {[{ t: "匿名で安心", d: "完全匿名で投稿・交流。あなたの身元は企業には見えません。", i: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }, { t: "24時間で消える投稿", d: "気軽にシェア。投稿は24時間で自動的に消えます。", i: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }, { t: "企業と直接つながる", d: "中間業者ゼロ。企業があなたに直接スカウトを送ります。", i: "M13 10V3L4 14h7v7l9-11h-7z" }].map((f, i) => (
            <div key={i} className="bg-card rounded-2xl border p-6">
              <svg className="w-8 h-8 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={f.i} /></svg>
              <h3 className="font-semibold mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="max-w-4xl mx-auto px-6 py-8 border-t"><p className="text-muted-foreground text-xs text-center">CareerConnect Inc.</p></footer>
    </div>
  );
}
