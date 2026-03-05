"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [step, setStep] = useState<"type" | "form">("type");
  const [userType, setUserType] = useState<"seeker" | "company">("seeker");
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
      email,
      password,
      options: {
        data: { user_type: userType, nickname },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      if (userType === "seeker") {
        await supabase.from("seekers").insert({
          auth_user_id: data.user.id,
          nickname,
          carrier_experience: "",
        });
      } else {
        await supabase.from("companies").insert({
          auth_user_id: data.user.id,
          company_name: nickname,
          carrier: "",
        });
      }
    }

    router.push("/feed");
    router.refresh();
  };

  if (step === "type") {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center">
                <span className="text-brand-dark font-black text-xl">C</span>
              </div>
              <span className="font-extrabold text-white text-xl">Career</span>
              <span className="font-extrabold text-brand-gold text-xl">Connect</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold text-center mb-2">新規登録</h1>
            <p className="text-gray-500 text-center text-sm mb-8">
              アカウントタイプを選択してください
            </p>

            <div className="space-y-4">
              {[
                {
                  type: "seeker" as const,
                  icon: "👤",
                  title: "個人（スタッフ）",
                  desc: "匿名で投稿・交流。企業からスカウトを受け取れます。",
                },
                {
                  type: "company" as const,
                  icon: "🏢",
                  title: "企業（代理店）",
                  desc: "企業ページを作成し、優秀な人材に直接アプローチ。",
                },
              ].map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => {
                    setUserType(opt.type);
                    setStep("form");
                  }}
                  className="w-full p-5 rounded-xl border-2 border-gray-200 hover:border-brand-gold text-left transition group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{opt.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-brand-cta transition">
                        {opt.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{opt.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              既にアカウントをお持ちの方は
              <Link href="/auth/login" className="text-brand-cta font-semibold ml-1 hover:underline">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-light flex items-center justify-center">
              <span className="text-brand-dark font-black text-xl">C</span>
            </div>
            <span className="font-extrabold text-white text-xl">Career</span>
            <span className="font-extrabold text-brand-gold text-xl">Connect</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <button
            onClick={() => setStep("type")}
            className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1"
          >
            ← タイプ選択に戻る
          </button>

          <h1 className="text-2xl font-bold mb-1">
            {userType === "seeker" ? "個人アカウント" : "企業アカウント"}の作成
          </h1>
          <p className="text-gray-500 text-sm mb-6">無料で始められます</p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {userType === "seeker" ? "ニックネーム" : "企業名"}
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition"
                placeholder={userType === "seeker" ? "匿名のニックネーム" : "株式会社〇〇"}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition"
                placeholder="8文字以上"
                minLength={8}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-cta text-white rounded-xl font-bold text-lg hover:bg-brand-cta-hover transition disabled:opacity-50 shadow-lg shadow-brand-cta/30"
            >
              {loading ? "登録中..." : "アカウントを作成"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            登録することで
            <span className="underline cursor-pointer">利用規約</span>と
            <span className="underline cursor-pointer">プライバシーポリシー</span>
            に同意したことになります
          </p>
        </div>
      </div>
    </div>
  );
}
