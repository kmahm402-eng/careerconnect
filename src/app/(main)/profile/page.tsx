"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const CARRIERS = ["docomo", "au", "SoftBank", "Y!mobile", "UQ mobile", "楽天モバイル", "その他"];
const YEARS = ["1年未満", "1〜3年", "3〜5年", "5年以上"];
const CERTS = ["エキスパート", "チーフアドバイザー", "グランメダリスト", "その他", "特になし"];
const CONDITIONS = ["残業なし", "給与保証25万円以上", "完全週休2日", "インセンティブ透明化", "副店長以上ポジション", "入社祈い金10万円以上", "転勤なし", "社保完備", "研修制度あり"];

export default function ProfilePage() {
  const [carriers, setCarriers] = useState<string[]>([]);
  const [expYears, setExpYears] = useState("");
  const [certs, setCerts] = useState<string[]>([]);
  const [mnp, setMnp] = useState("");
  const [internet, setInternet] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [aboutMe, setAboutMe] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadProfile(); }, []);

  async function loadProfile() {
    const s = createClient();
    const { data: { user } } = await s.auth.getUser();
    if (!user) return;
    const { data } = await (s.from("seekers") as any).select("*").eq("auth_user_id", user.id).single();
    if (data) {
      if (data.carriers) setCarriers(data.carriers);
      if (data.experience_years) setExpYears(data.experience_years);
      if (data.certifications) setCerts(data.certifications);
      if (data.mnp_count) setMnp(String(data.mnp_count));
      if (data.internet_count) setInternet(String(data.internet_count));
      if (data.desired_conditions) setConditions(data.desired_conditions);
      if (data.about_me) setAboutMe(data.about_me);
    }
    setLoaded(true);
  }

  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string, max?: number) => {
    if (arr.includes(val)) setArr(arr.filter(x => x !== val));
    else if (!max || arr.length < max) setArr([...arr, val]);
  };

  const progress = () => {
    let s = 0;
    if (carriers.length > 0) s += 15;
    if (expYears) s += 15;
    if (certs.length > 0) s += 10;
    if (mnp || internet) s += 15;
    if (conditions.length > 0) s += 25;
    if (aboutMe.length > 10) s += 20;
    return s;
  };

  const handleSave = async () => {
    setSaving(true);
    const s = createClient();
    const { data: { user } } = await s.auth.getUser();
    if (user) {
      await (s.from("seekers") as any).update({
        carriers, experience_years: expYears, certifications: certs,
        mnp_count: Number(mnp) || 0, internet_count: Number(internet) || 0,
        desired_conditions: conditions, about_me: aboutMe
      }).eq("auth_user_id", user.id);
    }
    setSaving(false);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const p = progress();

  if (!loaded) return <div className="flex items-center justify-center h-screen"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-4 py-4"><h1 className="text-lg font-bold">プロフィール編集</h1></header>
      <div className="p-4 space-y-6">
        {/* 充実度 */}
        <div className="bg-card p-5 rounded-2xl border">
          <div className="flex justify-between items-end mb-2"><h2 className="text-sm font-bold">プロフィール充実度</h2><span className="text-lg font-bold text-primary">{p}%</span></div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-3"><div className="h-full bg-primary transition-all duration-500" style={{width:p+"%"}}></div></div>
          <p className="text-xs text-muted-foreground">充実度を上げると、<span className="text-amber-500 font-bold">確約条件付きスカウト</span>が届きやすくなります！</p>
        </div>

        {/* 経験キャリア */}
        <section><h3 className="text-sm font-bold mb-3 flex items-center"><span className="w-1 h-4 bg-primary rounded-full mr-2"></span>経験キャリア（複数選択可）</h3>
          <div className="flex flex-wrap gap-2">{CARRIERS.map(c=>(<button key={c} onClick={()=>toggleArr(carriers,setCarriers,c)} className={"px-4 py-2 rounded-full text-sm font-medium transition-all "+(carriers.includes(c)?"bg-primary text-primary-foreground shadow-md":"bg-card border hover:border-primary/50")}>{c}</button>))}</div>
        </section>

        {/* 経験年数 */}
        <section><h3 className="text-sm font-bold mb-3 flex items-center"><span className="w-1 h-4 bg-primary rounded-full mr-2"></span>販売経験年数</h3>
          <div className="grid grid-cols-2 gap-2">{YEARS.map(y=>(<button key={y} onClick={()=>setExpYears(y)} className={"px-3 py-3 rounded-xl text-sm font-medium transition-all text-center "+(expYears===y?"bg-primary/10 border-2 border-primary text-primary":"bg-card border hover:border-primary/50")}>{y}</button>))}</div>
        </section>

        {/* 保有資格 */}
        <section><h3 className="text-sm font-bold mb-3 flex items-center"><span className="w-1 h-4 bg-primary rounded-full mr-2"></span>保有資格</h3>
          <div className="flex flex-wrap gap-2">{CERTS.map(c=>(<button key={c} onClick={()=>toggleArr(certs,setCerts,c)} className={"px-4 py-2 rounded-full text-sm font-medium transition-all "+(certs.includes(c)?"bg-primary text-primary-foreground shadow-md":"bg-card border hover:border-primary/50")}>{c}</button>))}</div>
        </section>

        {/* 月間実績 */}
        <section><h3 className="text-sm font-bold mb-3 flex items-center"><span className="w-1 h-4 bg-primary rounded-full mr-2"></span>月間平均獲得実績（任意）</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><label className="text-xs text-muted-foreground font-medium">MNP (乗り換え)</label><div className="relative"><input type="number" value={mnp} onChange={e=>setMnp(e.target.value)} placeholder="20" className="w-full bg-card border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"/><span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">件/月</span></div></div>
            <div className="space-y-1"><label className="text-xs text-muted-foreground font-medium">光回線</label><div className="relative"><input type="number" value={internet} onChange={e=>setInternet(e.target.value)} placeholder="10" className="w-full bg-card border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"/><span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">件/月</span></div></div>
          </div>
        </section>

        {/* ⭐ 確約条件（最重要） */}
        <section className="bg-amber-50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/30">
          <h3 className="text-sm font-bold mb-1 flex items-center"><span className="mr-2">⭐</span>次の職場で絶対に確約してほしい条件</h3>
          <p className="text-xs text-muted-foreground mb-1">最大<span className="font-bold text-amber-600"> 3つ </span>まで選択できます。企業はこの条件を確約した上でスカウトを送ります。</p>
          <p className="text-[10px] text-amber-600 mb-4">選択中: {conditions.length}/3</p>
          <div className="grid grid-cols-1 gap-2">
            {CONDITIONS.map(cd=>(<button key={cd} onClick={()=>toggleArr(conditions,setConditions,cd,3)} className={"px-4 py-3 rounded-xl text-sm font-bold transition-all text-left flex items-center justify-between "+(conditions.includes(cd)?"bg-amber-500 text-white shadow-md border-transparent":"bg-white dark:bg-card text-foreground border border-border hover:border-amber-500/50")}><span>{cd}</span>{conditions.includes(cd)&&<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>}</button>))}
          </div>
        </section>

        {/* 自己PR */}
        <section><h3 className="text-sm font-bold mb-3 flex items-center"><span className="w-1 h-4 bg-primary rounded-full mr-2"></span>自己PR・その他アピールポイント（任意）</h3>
          <textarea value={aboutMe} onChange={e=>setAboutMe(e.target.value)} placeholder="例：過去に店舗MVPを獲得。店長経験2年。" className="w-full bg-card border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[120px] resize-y"/>
        </section>

        {/* 保存 */}
        <div className="pt-4 pb-8"><button onClick={handleSave} disabled={saving} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">{saving?<span>保存中...</span>:"プロフィールを保存する"}</button></div>
      </div>
      {toast&&(<div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl text-sm font-medium z-50 flex items-center gap-2"><svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>保存しました</div>)}
    </div>
  );
}
