"use client";
const COMPANIES=[
{id:"1",name:"モバイルフロンティア株式会社",carrier:"au",area:"東京・神奈川",verified:true,commitment:"残業なし（定時18時退社を確約）",retention:94,employees:120,tags:["完全週休2日","研修充実","有給消化率90%"],description:"「働く人が幸せでなければ、お客様を幸せにはできない」をモットーに、定時退社を創業から徹底。"},
{id:"2",name:"コミュニケーションパートナー",carrier:"docomo",area:"大阪・兵庫",verified:true,commitment:"給与保証28万円（試用期間中も同額）",retention:91,employees:85,tags:["転勤なし","インセンティブ明確開示"],description:"地域密着型で15年。転勤なし・地元で長く働ける環境を大切にしています。"},
{id:"3",name:"スマートライフ株式会社",carrier:"SoftBank",area:"愛知・三重",verified:true,commitment:"完全週休2日（シフト変更なしを確約）",retention:88,employees:200,tags:["副業OK","資格取得支援"],description:"大手SoftBank代理店。社員の副業を推奨し、多様な働き方を支援。"},
{id:"4",name:"ネクストモバイル",carrier:"au / UQ mobile",area:"福岡・熊本",verified:true,commitment:"インセンティブ計算式を入社前に完全開示",retention:92,employees:60,tags:["残業月10h以下","有給消化率85%"],description:"「見せかけの高給に騙されない」。入社前にインセンティブの計算根拠を全て開示します。"}];
export default function CompaniesPage(){return(
<div className="min-h-screen bg-background pb-20">
<header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-4 py-4"><h1 className="text-lg font-bold">優良代理店を探す</h1></header>
<div className="m-4 bg-primary/5 border border-primary/20 rounded-2xl p-5">
<div className="flex items-start gap-3"><div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0"><svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg></div>
<div><h2 className="text-sm font-bold text-primary mb-1">運営が厳正に審査しています</h2><p className="text-xs text-muted-foreground leading-relaxed">CareerConnectに掲載されている企業は、すべて運営チームが<span className="font-bold text-foreground">書類審査・面談・入社後モニタリング</span>を実施。<span className="font-bold text-amber-600">確約条件に違反した企業は即時掲載停止</span>します。</p></div></div>
<div className="grid grid-cols-3 gap-2 mt-4">{[{icon:"📋",label:"書類審査",desc:"財務・労務を確認"},{icon:"🎙️",label:"経営者面談",desc:"理念と実態を検証"},{icon:"📊",label:"入社後調査",desc:"3ヶ月・半年・1年"}].map((item,i)=>(<div key={i} className="bg-card rounded-xl border p-3 text-center"><div className="text-xl mb-1">{item.icon}</div><div className="text-[10px] font-bold">{item.label}</div><div className="text-[9px] text-muted-foreground mt-0.5">{item.desc}</div></div>))}</div>
</div>
<div className="px-4 space-y-4 pb-4">{COMPANIES.map(co=>(
<div key={co.id} className="bg-card rounded-2xl border overflow-hidden hover:shadow-md transition-shadow"><div className="p-4">
<div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-sm">{co.name}</h3>{co.verified&&<svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/></svg>}</div>
<div className="flex items-center gap-2 text-xs text-muted-foreground mb-3"><span>{co.carrier}</span><span>·</span><span>{co.area}</span><span>·</span><span>社員数 {co.employees}名</span></div>
<div className="mb-3 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-2.5 rounded-r-lg"><p className="text-[10px] text-amber-600 dark:text-amber-500 font-bold mb-0.5">🛡️ 入社時確約オファー</p><p className="text-sm font-bold">{co.commitment}</p></div>
<div className="flex items-center gap-2 mb-3"><div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950/20 px-2.5 py-1 rounded-full"><div className="w-2 h-2 bg-green-500 rounded-full"/><span className="text-xs font-bold text-green-700 dark:text-green-400">定着率 {co.retention}%</span></div></div>
<p className="text-xs text-muted-foreground leading-relaxed mb-3">{co.description}</p>
<div className="flex flex-wrap gap-1.5">{co.tags.map((tag,i)=>(<span key={i} className="text-[10px] font-medium px-2 py-1 rounded-md bg-secondary">{tag}</span>))}</div>
</div>
<div className="border-t px-4 py-3 flex items-center justify-between bg-secondary/30"><span className="text-[10px] text-muted-foreground">あなたの希望条件に合致しています</span><button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold hover:opacity-90 transition">詳しく見る</button></div>
</div>))}</div>
</div>);}
