"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { LuLoader } from "react-icons/lu";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      // Automatically redirects to dashboard via middleware, but we push just in case
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1] px-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-gray-100">
        
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-2">Admin Panel</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            <span className="gold-gradient-text">KAMI</span>BANTU
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Masuk untuk mengelola testimoni</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-gray-900"
              placeholder="admin@kamibanturenovasi.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-gray-900"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 bg-dark text-white rounded-xl font-medium tracking-wide hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <LuLoader className="w-5 h-5 animate-spin text-white" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Halaman ini dilindungi dan hanya untuk pengurus resmi.
        </p>
      </div>
    </div>
  );
}
