notepad "src\app\(main)\profile\page.tsx"
```

メモ帳が開いたら、**中身をすべて消して**（Ctrl+A → Delete）、以下を**メモ帳だけに**貼り付けて **Ctrl+S** で保存してください。**PowerShellには貼り付けないでください。**
```
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const CARRIERS = ["docomo", "au", "SoftBank", "Y!mobile", "UQ mobile", "楽天モバイル", "その他"];
const YEARS = ["1年未満", "1〜3年", "3〜5年", "5年以上"];
const CERTS = ["エキスパート", "チーフアドバイザー", "マイスター", "光アドバイザー", "スマートフォンアドバイザー"];
const BONUS = ["希望なし", "5万円", "10万円", "20万円", "30万円以上"];

function calcProgress(d: any) {
  let t = 0, f = 0;
  if (d.carriers.length) { t++; f++; } else t++;
  if (d.years) { t++; f++; } else t++;
  if (d.certs.length) { t++; f++; } else t++;
  if (d.mnp > 0) { t++; f++; } else t++;
  if (d.fiber > 0) { t++; f++; } else t++;
  if (d.bonus !== "希望なし") { t++; f++; } else t++;
  if (d.bio) { t++; f++; } else t++;
  return Math.round((f / t) * 100);
}

export default function ProfilePage() {
  const [carriers, setCarriers] = useState<string[]>([]);
  const [years, setYears] = useState("");
  const [certs, setCerts] = useState<string[]>([]);
  const [mnp, setMnp] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [bonus, setBonus] = useState("希望なし");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [scout, setScout] = useState(true);

  const progress = calcProgress({ carriers, years, certs, mnp, fiber, bonus, bio });

  const toggleCarrier = (c: string) => setCarriers(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleCert = (c: string) => setCerts(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await (supabase.from("seekers") as any).update({
        carrier_experience: carriers.join(","),
        experience_years: years,
        qualifications: certs,
        monthly_sales: mnp,
        work_area: "",
        bio,
        is_open_to_scout: scout,
      }).eq("auth_user_id", user.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-xl border-b px-4 py-3">
        <h1 className="text-lg font-semibold">プロフィール編集</h1>
      </div>

      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-card rounded-2xl border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">プロフィール充実度</span>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <span>&#x2728;</span> 充実度を上げると、高額な祝い金スカウトが届きやすくなります！
          </p>
        </div>
      </div>

      {/* Scout toggle */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">スカウトを受け取る</p>
            <p className="text-xs text-muted-foreground">企業からのDMを許可</p>
          </div>
          <button onClick={() => setScout(!scout)} className={`w-12 h-7 rounded-full transition-colors relative ${scout ? "bg-primary" : "bg-secondary"}`}>
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${scout ? "translate-x-5.5 left-0.5" : "left-0.5"}`} style={{ transform: scout ? "translateX(22px)" : "translateX(2px)" }} />
          </button>
        </div>
      </div>

      {/* Carriers */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">経験キャリア</h2>
          <p className="text-xs text-muted-foreground mb-3">複数選択できます</p>
          <div className="flex flex-wrap gap-2">
            {CARRIERS.map(c => (
              <button key={c} onClick={() => toggleCarrier(c)} className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${carriers.includes(c) ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-transparent hover:border-primary/30"}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Years */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-3">経験年数</h2>
          <div className="grid grid-cols-2 gap-2">
            {YEARS.map(y => (
              <button key={y} onClick={() => setYears(y)} className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${years === y ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-transparent hover:border-primary/30"}`}>{y}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Certs */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">保有資格</h2>
          <p className="text-xs text-muted-foreground mb-3">複数選択できます</p>
          <div className="flex flex-wrap gap-2">
            {CERTS.map(c => (
              <button key={c} onClick={() => toggleCert(c)} className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${certs.includes(c) ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-transparent hover:border-primary/30"}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly results */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-3">月間平均獲得実績</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16 shrink-0">MNP</span>
              <input type="number" value={mnp || ""} onChange={e => setMnp(Number(e.target.value))} placeholder="0" className="flex-1 px-3 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
              <span className="text-xs text-muted-foreground shrink-0">件/月</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16 shrink-0">光回線</span>
              <input type="number" value={fiber || ""} onChange={e => setFiber(Number(e.target.value))} placeholder="0" className="flex-1 px-3 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
              <span className="text-xs text-muted-foreground shrink-0">件/月</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">希望する最低入社祝い金</h2>
          <p className="text-xs text-muted-foreground mb-3">スカウト時の参考になります</p>
          <div className="grid grid-cols-3 gap-2">
            {BONUS.map(b => (
              <button key={b} onClick={() => setBonus(b)} className={`px-2 py-2.5 rounded-xl text-sm font-medium border transition-all ${bonus === b ? "bg-amber-500 text-white border-amber-500 shadow-md" : "bg-secondary text-foreground border-transparent hover:border-amber-300"}`}>{b}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">自己PR</h2>
          <p className="text-xs text-muted-foreground mb-3">あなたの強みをアピール</p>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="例：MNP獲得が得意で、月間30件以上を安定的に達成しています。チームマネジメント経験もあり、後輩育成にも力を入れています。" rows={4} className="w-full px-4 py-3 bg-secondary rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/50" />
        </div>
      </div>

      {/* Save */}
      <div className="px-4 py-4">
        <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 shadow-soft">
          {saving ? "保存中..." : "プロフィールを保存する"}
        </button>
        {saved && (
          <div className="mt-3 text-center animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              保存しました
            </span>
          </div>
        )}
      </div>
    </div>
  );
}