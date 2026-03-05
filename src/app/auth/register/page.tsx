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
        // @ts-ignore
        await supabase.from("seekers" as any).insert({
          auth_user_id: data.user.id,
          nickname,
          carrier_experience: "",
        });
      } else {
        // @ts-ignore
        await supabase.from("companies" as any).insert({
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
            <h1 className="text-2xl font-bold text-center mb-2">New Registration</h1>
            <p className="text-gray-500 text-center text-sm mb-8">Select your account type</p>
            <div className="space-y-4">
              <button onClick={() => { setUserType("seeker"); setStep("form"); }} className="w-full p-5 rounded-xl border-2 border-gray-200 hover:border-brand-gold text-left transition group">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">&#x1F464;</span>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-brand-cta transition">Individual (Staff)</h3>
                    <p className="text-gray-500 text-sm mt-1">Post and interact anonymously. Receive scout messages from companies.</p>
                  </div>
                </div>
              </button>
              <button onClick={() => { setUserType("company"); setStep("form"); }} className="w-full p-5 rounded-xl border-2 border-gray-200 hover:border-brand-gold text-left transition group">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">&#x1F3E2;</span>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-brand-cta transition">Company (Agency)</h3>
                    <p className="text-gray-500 text-sm mt-1">Create a company page and directly approach talented people.</p>
                  </div>
                </div>
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?
              <Link href="/auth/login" className="text-brand-cta font-semibold ml-1 hover:underline">Login</Link>
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
          <button onClick={() => setStep("type")} className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1">Back</button>
          <h1 className="text-2xl font-bold mb-1">{userType === "seeker" ? "Individual Account" : "Company Account"}</h1>
          <p className="text-gray-500 text-sm mb-6">Free to get started</p>
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{userType === "seeker" ? "Nickname" : "Company Name"}</label>
              <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition" minLength={8} required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-brand-cta text-white rounded-xl font-bold text-lg hover:bg-brand-cta-hover transition disabled:opacity-50 shadow-lg shadow-brand-cta/30">
              {loading ? "Creating..." : "Create Account"}
            </button>