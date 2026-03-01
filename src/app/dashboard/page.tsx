"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import ToastContainer, { ToastProps, ToastType } from "@/components/ui/Toast";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { LuTrash2, LuLogOut, LuRefreshCw, LuUser, LuMapPin, LuCalendar, LuStar, LuCircleCheck, LuCircleX, LuX } from "react-icons/lu";

type Testimonial = {
  id: string;
  created_at: string;
  nama: string;
  jenis_proyek: string;
  lokasi: string;
  pesan: string;
  rating: number;
  approved: boolean;
};

export default function DashboardPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const [selectedTesti, setSelectedTesti] = useState<Testimonial | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching testimonials:", error);
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const addToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto remove after 3.5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus testimoni ini secara permanen?")) return;
    
    setProcessingId(id);
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    
    if (error) {
      addToast("Gagal menghapus testimoni: " + error.message, "error");
    } else {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      addToast("Testimoni berhasil dihapus secara permanen.", "success");
    }
    setProcessingId(null);
  };

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    setProcessingId(id);
    const newStatus = !currentStatus;
    const { error } = await supabase
      .from("testimonials")
      .update({ approved: newStatus })
      .eq("id", id);
      
    if (error) {
      addToast("Gagal mengubah status publikasi.", "error");
    } else {
      setTestimonials((prev) => 
        prev.map((t) => (t.id === id ? { ...t, approved: newStatus } : t))
      );
      addToast(
        newStatus 
          ? "Testimoni berhasil dipublikasikan ke Website!" 
          : "Testimoni telah disembunyikan dari Website.", 
        "success"
      );
    }
    setProcessingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimoni Klien</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola ulasan yang masuk dari formulir website.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchTestimonials}
            className="p-2.5 text-gray-500 hover:text-dark hover:bg-gray-100 rounded-xl transition-colors"
            title="Refresh Data"
          >
            <LuRefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors text-sm"
          >
            <LuLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading && testimonials.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <LuRefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 opacity-50" />
            <p>Memuat data testimoni...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <p>Belum ada testimoni yang masuk.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="px-6 py-4 font-medium">Klien & Proyek</th>
                  <th className="px-6 py-4 font-medium">Ulasan</th>
                  <th className="px-6 py-4 font-medium whitespace-nowrap">Tanggal</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testimonials.map((testi) => (
                  <tr 
                    key={testi.id} 
                    onClick={() => setSelectedTesti(testi)}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-2 font-semibold text-gray-900 mb-1 capitalize">
                        <LuUser className="w-4 h-4 text-gold" />
                        {testi.nama}
                      </div>
                      <div className="text-xs text-gray-500 flex flex-col gap-1">
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-md w-fit">
                          {testi.jenis_proyek}
                        </span>
                        <span className="flex items-center gap-1 mt-1 capitalize">
                          <LuMapPin className="w-3.5 h-3.5" />
                          {testi.lokasi}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top max-w-md">
                      <div className="flex items-center gap-1 mb-2 text-gold">
                        {[...Array(5)].map((_, i) => (
                          <LuStar key={i} className={`w-4 h-4 ${i < testi.rating ? "fill-gold text-gold" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        "{testi.pesan}"
                      </p>
                      {testi.pesan.length > 80 && (
                        <span className="text-xs text-gold mt-1 font-medium inline-block">
                          Klik untuk baca selengkapnya
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-top text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          <LuCalendar className="w-4 h-4" />
                          {format(new Date(testi.created_at), "dd MMM yyyy", { locale: id })}
                        </div>
                        <div className={`mt-1 inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md w-fit ${testi.approved ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          {testi.approved ? (
                            <><LuCircleCheck className="w-3 h-3" /> Dipublikasi</>
                          ) : (
                            <><LuCircleX className="w-3 h-3" /> Disembunyikan</>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleApproval(testi.id, testi.approved);
                          }}
                          disabled={processingId === testi.id}
                          className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                            testi.approved 
                              ? "text-amber-600 hover:bg-amber-50" 
                              : "text-green-600 hover:bg-green-50"
                          }`}
                          title={testi.approved ? "Sembunyikan dari Website" : "Tampilkan di Website"}
                        >
                          {processingId === testi.id ? (
                            <LuRefreshCw className="w-5 h-5 animate-spin" />
                          ) : testi.approved ? (
                            <LuCircleX className="w-5 h-5" />
                          ) : (
                            <LuCircleCheck className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(testi.id);
                          }}
                          disabled={processingId === testi.id}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus Testimoni"
                        >
                          {processingId === testi.id && !testi.approved ? (
                            <LuRefreshCw className="w-5 h-5 animate-spin" />
                          ) : (
                            <LuTrash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail Testimoni */}
      {selectedTesti && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedTesti(null)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
              <h3 className="font-bold text-lg text-gray-900">Detail Ulasan</h3>
              <button 
                onClick={() => setSelectedTesti(null)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <LuX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center gap-1 mb-4 text-gold">
                {[...Array(5)].map((_, i) => (
                  <LuStar key={i} className={`w-5 h-5 ${i < selectedTesti.rating ? "fill-gold text-gold" : "text-gray-200"}`} />
                ))}
              </div>
              
              <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 italic border-l-4 border-gold pl-4">
                "{selectedTesti.pesan}"
              </blockquote>
              
              <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">Nama Klien</span>
                  <span className="col-span-2 font-medium text-gray-900 capitalize">{selectedTesti.nama}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">Jenis Proyek</span>
                  <span className="col-span-2 font-medium text-gray-900">{selectedTesti.jenis_proyek}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">Lokasi</span>
                  <span className="col-span-2 font-medium text-gray-900 capitalize">{selectedTesti.lokasi}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="text-gray-500">Tanggal</span>
                  <span className="col-span-2 font-medium text-gray-900">
                    {format(new Date(selectedTesti.created_at), "dd MMMM yyyy", { locale: id })}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm items-center pt-3 border-t border-gray-200">
                  <span className="text-gray-500">Status Publikasi</span>
                  <span className={`col-span-2 inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1.5 rounded-md w-fit ${selectedTesti.approved ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {selectedTesti.approved ? (
                      <><LuCircleCheck className="w-4 h-4" /> Ditampilkan di Website</>
                    ) : (
                      <><LuCircleX className="w-4 h-4" /> Disembunyikan</>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => {
                  handleDelete(selectedTesti.id);
                  setSelectedTesti(null);
                }}
                disabled={processingId === selectedTesti.id}
                className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processingId === selectedTesti.id && !selectedTesti.approved ? (
                  <LuRefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <LuTrash2 className="w-4 h-4" />
                )}
                Hapus Permanen
              </button>
              
              <button
                onClick={() => {
                  handleToggleApproval(selectedTesti.id, selectedTesti.approved);
                  setSelectedTesti({ ...selectedTesti, approved: !selectedTesti.approved });
                }}
                disabled={processingId === selectedTesti.id}
                className={`w-full sm:w-auto px-5 py-2.5 text-sm font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
                  selectedTesti.approved 
                    ? "bg-amber-50 text-amber-700 border border-amber-200/50 hover:bg-amber-100" 
                    : "bg-green-600 text-white shadow-md shadow-green-600/20 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20"
                }`}
              >
                {processingId === selectedTesti.id ? (
                  <LuRefreshCw className="w-4 h-4 animate-spin" />
                ) : selectedTesti.approved ? (
                  <><LuCircleX className="w-4 h-4" /> Sembunyikan</>
                ) : (
                  <><LuCircleCheck className="w-4 h-4" /> Publikasikan</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
