"use client";
import { useState } from "react";

const COMPANIES = [
  { id:"1", name:"モバイルフロンティア株式会社", carrier:"au", area:"東京都内 ・ 神奈川", verified:true, retention:"92%", commitment:"残業なし・給与保証25万円以上", tags:["残業なし","給与保証","完全週休2日"], scouts:24, staff:45 },
  { id:"2", name:"コミュニケーションパートナー", carrier:"docomo", area:"大阪府内 ・ 京都", verified:true, retention:"88%", commitment:"正社員採用・シフト固定・転勤なし", tags:["正社員","シフト固定","転勤なし"], scouts:18, staff:32 },
  { id:"3", name:"スマートライフ株式会社", carrier:"SoftBank", area:"福岡県内", verified:true, retention:"95%", commitment:"研修制度充実・副業可・インセンティブ透明化", tags:["研修充実","副業可","インセンティブ透明"], scouts:31, staff:58 },
];

export default function CompaniesPage() {
  const [filter, setFilter] = useState("");
  const filtered = filter ? COMPANIES.filter(c => c.carrier === filter) : COMPANIES;

  return (
    <div>
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-4 py-3"><h1 className="text-lg font-bold">優良代理店一覧</h1></header>

      <div className="bg-primary/5 border-b px-4 py-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg></div>
          <div>
            <h2 className="text-sm font-bold mb-1">運営が守る、安心の採用プラットフォーム</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">掲載企業はすべて<span className="font-semibold text-primary">運営による厳正な審査</span>を通過しています。入社後の<span className="font-semibold text-primary">定着率モニタリング</span>も実施中。「確約条件」に嘘があった場合は、運営が介入します。</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-4 py-3 border-b overflow-x-auto">
        {["",  "au", "docomo", "SoftBank"].map(c=>(<button key={c} onClick={()=>setFilter(c)} className={"px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap "+(filter===c?"bg-primary text-primary-foreground":"bg-secondary text-muted-foreground hover:text-foreground")}>{c || "すべて"}</button>))}
      </div>

      <div className="divide-y">
        {filtered.map(co => (
          <div key={co.id} className="p-4 hover:bg-secondary/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{co.name[0]}</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold">{co.name}</span>
                    {co.verified && <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/></svg>}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{co.carrier} ・ {co.area}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg><span className="text-xs font-bold text-green-600">定着率 {co.retention}</span></div>
                <p className="text-[10px] text-muted-foreground mt-0.5">在籍 {co.staff}名</p>
              </div>
            </div>

            <div className="mb-3 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-2.5 rounded-r-lg">
              <p className="text-[10px] text-amber-600 dark:text-amber-500 font-bold mb-0.5">入社時確約オファー</p>
              <p className="text-sm font-bold">{co.commitment}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">{co.tags.map((t,i)=>(<span key={i} className="text-[10px] font-medium bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">{t}</span>))}</div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">過去30日のスカウト: {co.scouts}件</span>
              <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold hover:opacity-90 transition">詳細を見る</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
