"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError("Invalid email or password"); setLoading(false); return; }
    router.push("/feed");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-bold text-2xl text-primary">CareerConnect</Link>
        </div>
        <div className="bg-card rounded-2xl border p-6 shadow-soft">
          <h1 className="text-xl font-semibold text-center mb-6">Welcome back</h1>
          {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl mb-4">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2.5 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition disabled:opacity-50">{loading ? "Signing in..." : "Sign in"}</button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-5">No account? <Link href="/auth/register" className="text-primary font-semibold hover:underline">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}
