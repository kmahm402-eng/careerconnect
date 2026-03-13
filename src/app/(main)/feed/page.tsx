"use client";
import { useState } from "react";

const TABS = ["🔥 トレンド", "💡 Q&A・相談", "📚 ノウハウ", "📝 資格・勉強", "☕️ ほっと一息"];

const RANKS: Record<string, {label:string,color:string}> = {
  bronze: {label:"ブロンズ",color:"bg-orange-100 text-orange-700 border-orange-300"},
  silver: {label:"シルバー",color:"bg-slate-100 text-slate-600 border-slate-300"},
  gold: {label:"ゴールド",color:"bg-yellow-100 text-yellow-700 border-yellow-300"},
  platinum: {label:"プラチナ",color:"bg-purple-100 text-purple-700 border-purple-300"},
};

const POSTS = [
  { id:"1", tab:0, badge:"📚 ノウハウ", badgeColor:"bg-emerald-100 text-emerald-700", author:{name:"Yuki.T",role:"au販売 3年",score:480,rank:"gold"}, content:"今月MNP 32件獲得！コツは料金の安さじゃなくて「乗り換えたら生活がどう変わるか」を伝えること。価格訴求だけだと他店に取られます。", likes:48, comments:12, time:"2時間前" },
  { id:"2", tab:1, badge:"💡 Q&A", badgeColor:"bg-blue-100 text-blue-700", author:{name:"Rina.S",role:"docomo販売 1年",score:120,rank:"bronze"}, content:"質問です。副店長になるか过移するかで悩んでいます。副店長は月+3万、でも責任が重い。過移先は未知数。みなさんならどうしますか？", likes:31, comments:18, time:"5時間前" },
  { id:"3", tab:2, badge:"📚 ノウハウ", badgeColor:"bg-emerald-100 text-emerald-700", author:{name:"Ken.M",role:"SB販売 5年",score:720,rank:"platinum"}, content:"光回線の提案：「スマホ代はそのまま、でもお家のネット代が月2,000円下がります」って言うと成約率70%超え。お客様の「お得感」がポイント。", likes:67, comments:14, time:"8時間前" },
  { id:"4", tab:3, badge:"📝 資格", badgeColor:"bg-purple-100 text-purple-700", author:{name:"Hana.K",role:"UQ販売 2年",score:250,rank:"silver"}, content:"チーフアドバイザー試験、一発合格しました！勉強法は公式テキスト3周+過去問3年分。通勤中にアプリで単語帳を回すのがおすすめ。", likes:42, comments:8, time:"1日前" },
  { id:"5", tab:4, badge:"☕️ ほっと一息", badgeColor:"bg-orange-100 text-orange-600", author:{name:"Saki.H",role:"docomo販売 4年",score:380,rank:"gold"}, content:"月末にまたノルマ変更…。先月達成したのに今月はさらに上乗せ。みんなもこんな感じですか？正直モチベ下がる…", likes:89, comments:24, time:"14時間前" },
];

export default function FeedPage() {
  const [tab, setTab] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const filtered = tab === 0 ? POSTS : POSTS.filter(p => p.tab === tab);

  return (
    <div>
      <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-900/30 px-4 py-3">
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed"><span className="font-bold">🏆 スコアを貯めよう！</span> 良い回答やノウハウ共有で貢献度スコアがアップ。スコアが高いと<span className="font-bold">確約オファー付きスカウト</span>が届きやすくなります。</p>
      </div>

      <div className="border-b overflow-x-auto">
        <div className="flex px-2">{TABS.map((t,i)=>(<button key={i} onClick={()=>setTab(i)} className={"px-3 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors "+(tab===i?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground")}>{t}</button>))}</div>
      </div>

      <div className="border-b p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">Y</div>
          <input placeholder="今の気持ちをシェアしよう..." className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground" />
        </div>
        <div className="flex justify-between items-center mt-3 pl-[52px]">
          <span className="text-xs text-muted-foreground">24時間で消えます</span>
          <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold hover:opacity-90 transition">投稿する</button>
        </div>
      </div>

      {filtered.map(post => {
        const rank = RANKS[post.author.rank];
        return (
          <article key={post.id} className="border-b p-4 hover:bg-secondary/30 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className={"text-[10px] font-bold px-2 py-0.5 rounded-md "+post.badgeColor}>{post.badge}</div>
                  <span className="text-xs font-bold">{post.author.name}</span>
                  <span className="text-[10px] text-muted-foreground">({post.author.role})</span>
                </div>
                <div className="flex items-center gap-1.5 ml-1">
                  <div className={"text-[9px] font-bold px-1.5 py-0.5 rounded border "+rank.color}>{rank.label}</div>
                  <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-0.5">
                    <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    {post.author.score} pt
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground">{post.time}</span>
            </div>
            <p className="text-sm leading-relaxed mb-3">{post.content}</p>
            <div className="flex items-center gap-6">
              <button onClick={()=>setLiked(p=>({...p,[post.id]:!p[post.id]}))} className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition text-sm"><svg className="w-4 h-4" fill={liked[post.id]?"currentColor":"none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg><span>{post.likes+(liked[post.id]?1:0)}</span></button>
              <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition text-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/></svg><span>{post.comments}</span></button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
