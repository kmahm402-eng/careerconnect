notepad "src\app\(main)\profile\page.tsx"
```

繝｡繝｢蟶ｳ縺碁幕縺・◆繧峨・*荳ｭ霄ｫ繧偵☆縺ｹ縺ｦ豸医＠縺ｦ**・・trl+A 竊・Delete・峨∽ｻ･荳九ｒ**繝｡繝｢蟶ｳ縺縺代↓**雋ｼ繧贋ｻ倥￠縺ｦ **Ctrl+S** 縺ｧ菫晏ｭ倥＠縺ｦ縺上□縺輔＞縲・*PowerShell縺ｫ縺ｯ雋ｼ繧贋ｻ倥￠縺ｪ縺・〒縺上□縺輔＞縲・*
```
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const CARRIERS = ["docomo", "au", "SoftBank", "Y!mobile", "UQ mobile", "讌ｽ螟ｩ繝｢繝舌う繝ｫ", "縺昴・莉・];
const YEARS = ["1蟷ｴ譛ｪ貅", "1縲・蟷ｴ", "3縲・蟷ｴ", "5蟷ｴ莉･荳・];
const CERTS = ["繧ｨ繧ｭ繧ｹ繝代・繝・, "繝√・繝輔い繝峨ヰ繧､繧ｶ繝ｼ", "繝槭う繧ｹ繧ｿ繝ｼ", "蜈峨い繝峨ヰ繧､繧ｶ繝ｼ", "繧ｹ繝槭・繝医ヵ繧ｩ繝ｳ繧｢繝峨ヰ繧､繧ｶ繝ｼ"];
const BONUS = ["蟶梧悍縺ｪ縺・, "5荳・・", "10荳・・", "20荳・・", "30荳・・莉･荳・];

function calcProgress(d: any) {
  let t = 0, f = 0;
  if (d.carriers.length) { t++; f++; } else t++;
  if (d.years) { t++; f++; } else t++;
  if (d.certs.length) { t++; f++; } else t++;
  if (d.mnp > 0) { t++; f++; } else t++;
  if (d.fiber > 0) { t++; f++; } else t++;
  if (d.bonus !== "蟶梧悍縺ｪ縺・) { t++; f++; } else t++;
  if (d.bio) { t++; f++; } else t++;
  return Math.round((f / t) * 100);
}

export default function ProfilePage() {
  const [carriers, setCarriers] = useState<string[]>([]);
  const [years, setYears] = useState("");
  const [certs, setCerts] = useState<string[]>([]);
  const [mnp, setMnp] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [bonus, setBonus] = useState("蟶梧悍縺ｪ縺・);
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
        <h1 className="text-lg font-semibold">繝励Ο繝輔ぅ繝ｼ繝ｫ邱ｨ髮・/h1>
      </div>

      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-card rounded-2xl border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">繝励Ο繝輔ぅ繝ｼ繝ｫ蜈・ｮ溷ｺｦ</span>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <span>&#x2728;</span> 蜈・ｮ溷ｺｦ繧剃ｸ翫￡繧九→縲・ｫ倬｡阪↑逾昴＞驥代せ繧ｫ繧ｦ繝医′螻翫″繧・☆縺上↑繧翫∪縺呻ｼ・
          </p>
        </div>
      </div>

      {/* Scout toggle */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">繧ｹ繧ｫ繧ｦ繝医ｒ蜿励￠蜿悶ｋ</p>
            <p className="text-xs text-muted-foreground">莨∵･ｭ縺九ｉ縺ｮDM繧定ｨｱ蜿ｯ</p>
          </div>
          <button onClick={() => setScout(!scout)} className={`w-12 h-7 rounded-full transition-colors relative ${scout ? "bg-primary" : "bg-secondary"}`}>
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${scout ? "translate-x-5.5 left-0.5" : "left-0.5"}`} style={{ transform: scout ? "translateX(22px)" : "translateX(2px)" }} />
          </button>
        </div>
      </div>

      {/* Carriers */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">邨碁ｨ薙く繝｣繝ｪ繧｢</h2>
          <p className="text-xs text-muted-foreground mb-3">隍・焚驕ｸ謚槭〒縺阪∪縺・/p>
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
          <h2 className="text-sm font-semibold mb-3">邨碁ｨ灘ｹｴ謨ｰ</h2>
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
          <h2 className="text-sm font-semibold mb-1">菫晄怏雉・ｼ</h2>
          <p className="text-xs text-muted-foreground mb-3">隍・焚驕ｸ謚槭〒縺阪∪縺・/p>
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
          <h2 className="text-sm font-semibold mb-3">譛磯俣蟷ｳ蝮・佐蠕怜ｮ溽ｸｾ</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16 shrink-0">MNP</span>
              <input type="number" value={mnp || ""} onChange={e => setMnp(Number(e.target.value))} placeholder="0" className="flex-1 px-3 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
              <span className="text-xs text-muted-foreground shrink-0">莉ｶ/譛・/span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16 shrink-0">蜈牙屓邱・/span>
              <input type="number" value={fiber || ""} onChange={e => setFiber(Number(e.target.value))} placeholder="0" className="flex-1 px-3 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
              <span className="text-xs text-muted-foreground shrink-0">莉ｶ/譛・/span>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">蟶梧悍縺吶ｋ譛菴主・遉ｾ逾昴＞驥・/h2>
          <p className="text-xs text-muted-foreground mb-3">繧ｹ繧ｫ繧ｦ繝域凾縺ｮ蜿り・↓縺ｪ繧翫∪縺・/p>
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
          <h2 className="text-sm font-semibold mb-1">閾ｪ蟾ｱPR</h2>
          <p className="text-xs text-muted-foreground mb-3">縺ゅ↑縺溘・蠑ｷ縺ｿ繧偵い繝斐・繝ｫ</p>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="萓具ｼ哺NP迯ｲ蠕励′蠕玲э縺ｧ縲∵怦髢・0莉ｶ莉･荳翫ｒ螳牙ｮ夂噪縺ｫ驕疲・縺励※縺・∪縺吶ゅメ繝ｼ繝繝槭ロ繧ｸ繝｡繝ｳ繝育ｵ碁ｨ薙ｂ縺ゅｊ縲∝ｾ瑚ｼｩ閧ｲ謌舌↓繧ょ鴨繧貞・繧後※縺・∪縺吶・ rows={4} className="w-full px-4 py-3 bg-secondary rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/50" />
        </div>
      </div>

      {/* Save */}
      <div className="px-4 py-4">
        <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 shadow-soft">
          {saving ? "菫晏ｭ倅ｸｭ..." : "繝励Ο繝輔ぅ繝ｼ繝ｫ繧剃ｿ晏ｭ倥☆繧・}
        </button>
        {saved && (
          <div className="mt-3 text-center animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              菫晏ｭ倥＠縺ｾ縺励◆
            </span>
          </div>
        )}
      </div>
    </div>
  );
}