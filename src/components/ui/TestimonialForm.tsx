"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/supabase";
import { LuStar, LuSend, LuCheck, LuX } from "react-icons/lu";

const JENIS_PROYEK = [
  "Bangun Rumah",
  "Renovasi Rumah",
  "Membangun Kos",
  "Ruko & Toko",
  "Pengecatan",
  "Instalasi",
  "Lainnya",
];

export default function TestimonialForm({ onClose }: { onClose: () => void }) {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [jenisProyek, setJenisProyek] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nama.trim() || !pesan.trim() || rating === 0) {
      setError("Mohon isi nama, ulasan, dan rating bintang.");
      return;
    }

    // Tampilkan prompt konfirmasi sebelum upload ke DB
    setShowConfirmation(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { error: supabaseError } = await supabase
        .from("testimonials")
        .insert({
          nama: nama.trim(),
          pesan: pesan.trim(),
          rating,
          jenis_proyek: jenisProyek || null,
          approved: false, // Set false by default, admin must approve
        });

      if (supabaseError) throw supabaseError;

      setShowConfirmation(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch {
      setError("Gagal mengirim ulasan. Silakan coba lagi.");
      setShowConfirmation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Tulis Ulasan</h3>
            <p className="text-xs text-gray-400 mt-1">Bagikan pengalaman Anda bersama kami</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <LuX className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              className="px-6 py-16 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LuCheck className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Terima Kasih! 🙏</h4>
              <p className="text-sm text-gray-500 mb-4 px-4 leading-relaxed">
                Kami sangat berterima kasih atas kepercayaan Anda menggunakan jasa KamiBantuRenovasi.
              </p>
              <p className="text-xs text-gray-400 bg-gray-50 py-2 px-3 rounded-lg inline-block">
                Ulasan Anda sedang ditinjau dan akan segera ditampilkan.
              </p>
            </motion.div>
          ) : showConfirmation ? (
            <motion.div
              key="confirmation"
              className="px-6 py-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center mb-6">
                <h4 className="text-lg font-bold text-amber-900 mb-3">Konfirmasi Ulasan</h4>
                <p className="text-amber-800 text-sm leading-relaxed mb-4">
                  Pastikan data ulasan Anda diisi dengan baik dan sopan. Mohon dikoreksi kembali bila ada salah ketik (typo).
                </p>
                <div className="bg-white/60 rounded-xl p-4 text-left border border-amber-200/50">
                  <p className="text-xs text-amber-900/50 uppercase tracking-widest font-semibold mb-1">Pratinjau Ulasan</p>
                  <p className="text-gray-700 text-sm italic">"{pesan}"</p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  Edit Lagi
                </button>
                <button
                  type="button"
                  onClick={confirmSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-dark text-white text-sm font-semibold rounded-xl hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-dark/20"
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <LuSend className="w-4 h-4" />
                      Yakin, Kirim
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Rating Stars */}
              <div>
                <label className="text-xs font-medium text-gray-500 tracking-wide uppercase mb-2 block">
                  Rating <span className="text-red-400">*</span>
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <LuStar
                        className={`w-7 h-7 transition-colors duration-150 ${
                          star <= (hoverRating || rating)
                            ? "fill-gold text-gold"
                            : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-gray-400 self-center">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Nama */}
              <div>
                <label className="text-xs font-medium text-gray-500 tracking-wide uppercase mb-2 block">
                  Nama <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                  maxLength={100}
                />
              </div>

              {/* Jenis Proyek */}
              <div>
                <label className="text-xs font-medium text-gray-500 tracking-wide uppercase mb-2 block">
                  Jenis Proyek
                </label>
                <div className="flex flex-wrap gap-2">
                  {JENIS_PROYEK.map((jenis) => (
                    <button
                      key={jenis}
                      type="button"
                      onClick={() => setJenisProyek(jenisProyek === jenis ? "" : jenis)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                        jenisProyek === jenis
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-gray-200 text-gray-400 hover:border-gray-300"
                      }`}
                    >
                      {jenis}
                    </button>
                  ))}
                </div>
              </div>



              {/* Pesan */}
              <div>
                <label className="text-xs font-medium text-gray-500 tracking-wide uppercase mb-2 block">
                  Ulasan <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Ceritakan pengalaman Anda menggunakan jasa kami..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all resize-none"
                  maxLength={500}
                />
                <p className="text-[10px] text-gray-300 mt-1 text-right">{pesan.length}/500</p>
              </div>

              {/* Error */}
              {error && (
                <motion.p
                  className="text-xs text-red-500 bg-red-50 px-4 py-2 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-dark text-white text-sm font-semibold rounded-xl hover:bg-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <LuSend className="w-4 h-4" />
                    Kirim Ulasan
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
