"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLoader, LuArrowLeft, LuLock } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { attemptLogin, checkLockoutStatus } from "@/app/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const router = useRouter();

  // On mount, check if server has already locked us out
  useEffect(() => {
    async function checkStatus() {
      try {
        const status = await checkLockoutStatus();
        if (status.isLockedOut) {
          setLockoutTime(Date.now() + (status.timeLeft * 1000));
        }
      } catch (err) {
        console.error("Failed to check lockout status", err);
      }
    }
    checkStatus();
  }, []);

  // Timer countdown effect for lockout
  useEffect(() => {
    if (!lockoutTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= lockoutTime) {
        setLockoutTime(null);
        clearInterval(interval);
      } else {
        setTimeLeft(Math.ceil((lockoutTime - now) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockoutTime]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await attemptLogin(formData);

      if (result.success) {
        // Automatically redirects to dashboard via middleware, but we push just in case
        router.push("/dashboard");
        router.refresh();
      } else {
        if (result.isLockedOut) {
          setLockoutTime(Date.now() + ((result.timeLeft || 450) * 1000));
        }
        setError(result.error || "Gagal masuk.");
        setLoading(false);
      }
    } catch (err: any) {
      setError("Terjadi kesalahan sistem. Coba lagi nanti.");
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} menit ${s} detik`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f1f1] px-4 relative">
      <Link 
        href="/"
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-dark transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50"
      >
        <LuArrowLeft className="w-4 h-4" />
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-gray-100">
        
        <div className="text-center mb-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold mb-6">Admin Panel</p>
          <div className="flex items-center justify-center mb-6">
            <Image 
              src="/images/kamibanturenovasi-logo.PNG" 
              alt="Logo" 
              width={160} 
              height={160} 
              className="w-32 h-auto md:w-40 object-contain drop-shadow-sm"
              priority 
            />
          </div>
          <p className="text-gray-500 text-sm">Masuk untuk mengelola testimoni</p>
        </div>

        {error && !lockoutTime && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        {lockoutTime ? (
          <div className="mt-4 p-6 rounded-2xl bg-red-50 border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-100/80 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
              <LuLock className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-red-800 font-bold mb-2">Akses Dikunci</h3>
            <p className="text-red-600 text-sm mb-4 leading-relaxed">
              Anda telah salah memasukkan data batas maksimal (2 kali).
            </p>
            <div className="bg-white py-2 px-4 rounded-lg inline-block text-red-700 font-mono font-bold tracking-widest border border-red-100 shadow-sm">
              {formatTime(timeLeft)}
            </div>
          </div>
        ) : (
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
                disabled={loading}
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
                disabled={loading}
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
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          Halaman ini dilindungi dan hanya untuk pengurus resmi.
        </p>
      </div>
    </div>
  );
}
