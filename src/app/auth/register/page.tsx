"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [step, setStep] = useState("type");
  const [userType, setUserType] = useState("seeker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email, password,
      options: { data: { user_type: userType, nickname }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (signUpError) { setError(signUpError.message); setLoading(false); return; }
    if (data.user) {
      const s = createClient();
      if (userType === "seeker") {
        await s.from("seekers").upsert({ auth_user_id: data.user.id, nickname, carrier_experience: "" } as any);
      } else {
        await s.from("companies").upsert({ auth_user_id: data.user.id, company_name: nickname, carrier: "" } as any);
      }
    }
    router.push("/feed");
    router.refresh();
  };

  if (step === "type") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8"><Link href="/" className="font-bold text-2xl text-primary">CareerConnect</Link></div>
          <div className="bg-card rounded-2xl border p-8 shadow-soft">
            <h1 className="text-2xl font-bold text-center mb-2">新規登録</h1>
            <p className="text-muted-foreground text-center text-sm mb-8">アカウントの種類を選択してください</p>
            <div className="space-y-4">
              <button onClick={() => { setUserType("seeker"); setStep("form"); }} className="w-full p-5 rounded-xl border-2 border-border hover:border-primary text-left transition group">
                <div className="flex items-start gap-4"><span className="text-3xl">👤</span><div><h3 className="font-bold text-lg group-hover:text-primary transition">個人（スタッフ）</h3><p className="text-muted-foreground text-sm mt-1">匿名で投稿・交流。企業からスカウトDMを受け取れます。</p></div></div>
              </button>
              <button onClick={() => { setUserType("company"); setStep("form"); }} className="w-full p-5 rounded-xl border-2 border-border hover:border-primary text-left transition group">
                <div className="flex items-start gap-4"><span className="text-3xl">🏢</span><div><h3 className="font-bold text-lg group-hover:text-primary transition">企業（代理店）</h3><p className="text-muted-foreground text-sm mt-1">企業ページを作成し、優秀な人材に直接アプローチ。</p></div></div>
              </button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">すでにアカウントをお持ちの方は <Link href="/auth/login" className="text-primary font-semibold hover:underline">ログイン</Link></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8"><Link href="/" className="font-bold text-2xl text-primary">CareerConnect</Link></div>
        <div className="bg-card rounded-2xl border p-8 shadow-soft">
          <button onClick={() => setStep("type")} className="text-sm text-muted-foreground hover:text-foreground mb-4">← 戻る</button>
          <h1 className="text-2xl font-bold mb-1">{userType === "seeker" ? "個人アカウント作成" : "企業アカウント作成"}</h1>
          <p className="text-muted-foreground text-sm mb-6">無料で始められます</p>
          {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4">{error}</div>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div><label className="block text-sm font-medium text-muted-foreground mb-1.5">{userType === "seeker" ? "ニックネーム" : "会社名"}</label><input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full px-4 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" required /></div>
            <div><label className="block text-sm font-medium text-muted-foreground mb-1.5">メールアドレス</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" required /></div>
            <div><label className="block text-sm font-medium text-muted-foreground mb-1.5">パスワード</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" minLength={8} required /></div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50">{loading ? "作成中..." : "アカウントを作成"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
