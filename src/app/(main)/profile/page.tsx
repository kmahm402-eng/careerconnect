```

郢晢ｽ｡郢晢ｽ｢陝ｶ・ｳ邵ｺ遒∝ｹ慕ｸｺ繝ｻ笳・ｹｧ蟲ｨﾂ繝ｻ*闕ｳ・ｭ髴・ｽｫ郢ｧ蛛ｵ笘・ｸｺ・ｹ邵ｺ・ｦ雎ｸ蛹ｻ・邵ｺ・ｦ**繝ｻ繝ｻtrl+A 遶翫・Delete繝ｻ蟲ｨﾂ竏ｽ・ｻ・･闕ｳ荵晢ｽ・*郢晢ｽ｡郢晢ｽ｢陝ｶ・ｳ邵ｺ・ｰ邵ｺ莉｣竊・*髮具ｽｼ郢ｧ雍具ｽｻ蛟･・邵ｺ・ｦ **Ctrl+S** 邵ｺ・ｧ闖ｫ譎擾ｽｭ蛟･・邵ｺ・ｦ邵ｺ荳岩味邵ｺ霈費ｼ樒ｸｲ繝ｻ*PowerShell邵ｺ・ｫ邵ｺ・ｯ髮具ｽｼ郢ｧ雍具ｽｻ蛟･・邵ｺ・ｪ邵ｺ繝ｻ縲堤ｸｺ荳岩味邵ｺ霈費ｼ樒ｸｲ繝ｻ*
```
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const CARRIERS = ["docomo", "au", "SoftBank", "Y!mobile", "UQ mobile", "隶鯉ｽｽ陞滂ｽｩ郢晢ｽ｢郢晁・縺・ｹ晢ｽｫ", "邵ｺ譏ｴ繝ｻ闔峨・];
const YEARS = ["1陝ｷ・ｴ隴幢ｽｪ雋・", "1邵ｲ繝ｻ陝ｷ・ｴ", "3邵ｲ繝ｻ陝ｷ・ｴ", "5陝ｷ・ｴ闔会ｽ･闕ｳ繝ｻ];
const CERTS = ["郢ｧ・ｨ郢ｧ・ｭ郢ｧ・ｹ郢昜ｻ｣繝ｻ郢昴・, "郢昶・繝ｻ郢晁ｼ斐＞郢晏ｳｨ繝ｰ郢ｧ・､郢ｧ・ｶ郢晢ｽｼ", "郢晄ｧｭ縺・ｹｧ・ｹ郢ｧ・ｿ郢晢ｽｼ", "陷亥ｳｨ縺・ｹ晏ｳｨ繝ｰ郢ｧ・､郢ｧ・ｶ郢晢ｽｼ", "郢ｧ・ｹ郢晄ｧｭ繝ｻ郢晏現繝ｵ郢ｧ・ｩ郢晢ｽｳ郢ｧ・｢郢晏ｳｨ繝ｰ郢ｧ・､郢ｧ・ｶ郢晢ｽｼ"];
const BONUS = ["陝ｶ譴ｧ謔咲ｸｺ・ｪ邵ｺ繝ｻ, "5闕ｳ繝ｻ繝ｻ", "10闕ｳ繝ｻ繝ｻ", "20闕ｳ繝ｻ繝ｻ", "30闕ｳ繝ｻ繝ｻ闔会ｽ･闕ｳ繝ｻ];

function calcProgress(d: any) {
  let t = 0, f = 0;
  if (d.carriers.length) { t++; f++; } else t++;
  if (d.years) { t++; f++; } else t++;
  if (d.certs.length) { t++; f++; } else t++;
  if (d.mnp > 0) { t++; f++; } else t++;
  if (d.fiber > 0) { t++; f++; } else t++;
  if (d.bonus !== "陝ｶ譴ｧ謔咲ｸｺ・ｪ邵ｺ繝ｻ) { t++; f++; } else t++;
  if (d.bio) { t++; f++; } else t++;
  return Math.round((f / t) * 100);
}

export default function ProfilePage() {
  const [carriers, setCarriers] = useState<string[]>([]);
  const [years, setYears] = useState("");
  const [certs, setCerts] = useState<string[]>([]);
  const [mnp, setMnp] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [bonus, setBonus] = useState("陝ｶ譴ｧ謔咲ｸｺ・ｪ邵ｺ繝ｻ);
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
        <h1 className="text-lg font-semibold">郢晏干ﾎ溽ｹ晁ｼ斐≦郢晢ｽｼ郢晢ｽｫ驍ｱ・ｨ鬮ｮ繝ｻ/h1>
      </div>

      {/* Progress */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-card rounded-2xl border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">郢晏干ﾎ溽ｹ晁ｼ斐≦郢晢ｽｼ郢晢ｽｫ陷医・・ｮ貅ｷ・ｺ・ｦ</span>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
            <span>&#x2728;</span> 陷医・・ｮ貅ｷ・ｺ・ｦ郢ｧ蜑・ｽｸ鄙ｫ・｡郢ｧ荵昶・邵ｲ繝ｻ・ｫ蛟ｬ・｡髦ｪ竊鷹ｾ譏ｴ・樣ｩ･莉｣縺帷ｹｧ・ｫ郢ｧ・ｦ郢晏現窶ｲ陞ｻ鄙ｫ窶ｳ郢ｧ繝ｻ笘・ｸｺ荳岩・郢ｧ鄙ｫ竏ｪ邵ｺ蜻ｻ・ｼ繝ｻ
          </p>
        </div>
      </div>

      {/* Scout toggle */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">郢ｧ・ｹ郢ｧ・ｫ郢ｧ・ｦ郢晏現・定愾蜉ｱ・陷ｿ謔ｶ・・/p>
            <p className="text-xs text-muted-foreground">闔ｨ竏ｵ・･・ｭ邵ｺ荵晢ｽ臥ｸｺ・ｮDM郢ｧ螳夲ｽｨ・ｱ陷ｿ・ｯ</p>
          </div>
          <button onClick={() => setScout(!scout)} className={`w-12 h-7 rounded-full transition-colors relative ${scout ? "bg-primary" : "bg-secondary"}`}>
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform ${scout ? "translate-x-5.5 left-0.5" : "left-0.5"}`} style={{ transform: scout ? "translateX(22px)" : "translateX(2px)" }} />
          </button>
        </div>
      </div>

      {/* Carriers */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">驍ｨ遒・ｽｨ阮吶￥郢晢ｽ｣郢晢ｽｪ郢ｧ・｢</h2>
          <p className="text-xs text-muted-foreground mb-3">髫阪・辟夐ｩ包ｽｸ隰壽ｧｭ縲堤ｸｺ髦ｪ竏ｪ邵ｺ繝ｻ/p>
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
          <h2 className="text-sm font-semibold mb-3">驍ｨ遒・ｽｨ轣假ｽｹ・ｴ隰ｨ・ｰ</h2>
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
          <h2 className="text-sm font-semibold mb-1">闖ｫ譎・城實繝ｻ・ｰ・ｼ</h2>
          <p className="text-xs text-muted-foreground mb-3">髫阪・辟夐ｩ包ｽｸ隰壽ｧｭ縲堤ｸｺ髦ｪ竏ｪ邵ｺ繝ｻ/p>
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
          <h2 className="text-sm font-semibold mb-3">隴帷｣ｯ菫｣陝ｷ・ｳ陜ｮ繝ｻ菴占墓懶ｽｮ貅ｽ・ｸ・ｾ</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16 shrink-0">MNP</span>
              <input type="number" value={mnp || ""} onChange={e => setMnp(Number(e.target.value))} placeholder="0" className="flex-1 px-3 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
              <span className="text-xs text-muted-foreground shrink-0">闔会ｽｶ/隴帙・/span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-16 shrink-0">陷育甥螻馴こ繝ｻ/span>
              <input type="number" value={fiber || ""} onChange={e => setFiber(Number(e.target.value))} placeholder="0" className="flex-1 px-3 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
              <span className="text-xs text-muted-foreground shrink-0">闔会ｽｶ/隴帙・/span>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus */}
      <div className="px-4 py-2">
        <div className="bg-card rounded-2xl border p-4">
          <h2 className="text-sm font-semibold mb-1">陝ｶ譴ｧ謔咲ｸｺ蜷ｶ・玖ｭ崢闖ｴ荳ｻ繝ｻ驕会ｽｾ騾ｾ譏ｴ・樣ｩ･繝ｻ/h2>
          <p className="text-xs text-muted-foreground mb-3">郢ｧ・ｹ郢ｧ・ｫ郢ｧ・ｦ郢晏沺蜃ｾ邵ｺ・ｮ陷ｿ繧環繝ｻ竊鍋ｸｺ・ｪ郢ｧ鄙ｫ竏ｪ邵ｺ繝ｻ/p>
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
          <h2 className="text-sm font-semibold mb-1">髢ｾ・ｪ陝ｾ・ｱPR</h2>
          <p className="text-xs text-muted-foreground mb-3">邵ｺ繧・・邵ｺ貅倥・陟托ｽｷ邵ｺ・ｿ郢ｧ蛛ｵ縺・ｹ晄鱒繝ｻ郢晢ｽｫ</p>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="關灘・・ｼ蜩ｺNP霑ｯ・ｲ陟募干窶ｲ陟慕軸ﾑ咲ｸｺ・ｧ邵ｲ竏ｵ諤ｦ鬮｢繝ｻ0闔会ｽｶ闔会ｽ･闕ｳ鄙ｫ・定楜迚呻ｽｮ螟ょ飭邵ｺ・ｫ鬩慕夢繝ｻ邵ｺ蜉ｱ窶ｻ邵ｺ繝ｻ竏ｪ邵ｺ蜷ｶﾂ繧・Γ郢晢ｽｼ郢晢｣ｰ郢晄ｧｭ繝ｭ郢ｧ・ｸ郢晢ｽ｡郢晢ｽｳ郢晁ご・ｵ遒・ｽｨ阮呻ｽらｸｺ繧・ｽ顔ｸｲ竏晢ｽｾ迹夲ｽｼ・ｩ髢ｧ・ｲ隰瑚・竊鍋ｹｧ繧・ｴｨ郢ｧ雋槭・郢ｧ蠕娯ｻ邵ｺ繝ｻ竏ｪ邵ｺ蜷ｶﾂ繝ｻ rows={4} className="w-full px-4 py-3 bg-secondary rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition placeholder:text-muted-foreground/50" />
        </div>
      </div>

      {/* Save */}
      <div className="px-4 py-4">
        <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 shadow-soft">
          {saving ? "闖ｫ譎擾ｽｭ蛟・ｽｸ・ｭ..." : "郢晏干ﾎ溽ｹ晁ｼ斐≦郢晢ｽｼ郢晢ｽｫ郢ｧ蜑・ｽｿ譎擾ｽｭ蛟･笘・ｹｧ繝ｻ}
        </button>
        {saved && (
          <div className="mt-3 text-center animate-fade-up">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              闖ｫ譎擾ｽｭ蛟･・邵ｺ・ｾ邵ｺ蜉ｱ笳・
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
