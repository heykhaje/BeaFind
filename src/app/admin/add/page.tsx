"use client";

import { useState } from "react";
import { PageTransition } from "@/components/ui/PageTransition";

export default function AdminAddPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/admin/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      
      if (res.ok) {
        setMessage({ type: "success", text: result.message });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan server." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <h1 className="mb-4 text-3xl font-black">Tambah Informasi Langsung</h1>
      <p className="mb-8 text-on-surface-variant dark:text-[#94a3b8]">
        Informasi yang ditambahkan di sini akan langsung berstatus <span className="font-bold text-green-600">APPROVED</span> dan tayang di website.
      </p>

      {message.text && (
        <div className={`mb-8 p-4 rounded-xl border-2 border-black font-bold ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card-shadow space-y-6 rounded-2xl border-4 border-black bg-white p-8 dark:border-white dark:bg-[#1e293b]">
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-bold">Judul Program</label>
            <input required name="title" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Contoh: Beasiswa Unggulan 2024" />
          </div>
          <div>
            <label className="mb-2 block font-bold">Instansi / Penyelenggara</label>
            <input required name="organization" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Contoh: Kemendikbud" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-bold">Kategori</label>
            <select required name="category" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]">
              <option value="beasiswa">Beasiswa</option>
              <option value="magang">Magang</option>
              <option value="lomba">Lomba</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block font-bold">Batas Waktu (Deadline)</label>
            <input required name="deadline" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Contoh: 30 Agustus 2024" />
          </div>
          <div>
            <label className="mb-2 block font-bold">Lokasi / Tipe</label>
            <input required name="location" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Online / Offline / Jakarta" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-bold">Akun Sosial Media</label>
            <input name="socialMedia" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="IG: @beasiswa_id (Opsional)" />
          </div>
          <div>
            <label className="mb-2 block font-bold">Website Penyelenggara</label>
            <input type="url" name="website" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="https://... (Opsional)" />
          </div>
          <div>
            <label className="mb-2 block font-bold">Link Pendaftaran Resmi</label>
            <input required type="url" name="registrationLink" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="https://..." />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-bold">Deskripsi</label>
          <textarea required name="description" rows={4} className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Jelaskan secara singkat tentang program ini..." />
        </div>

        <div>
          <label className="mb-2 block font-bold">Persyaratan (Tulis per baris)</label>
          <textarea required name="requirements" rows={3} className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Mahasiswa aktif S1&#10;IPK minimal 3.0" />
        </div>

        <div>
          <label className="mb-2 block font-bold">Keuntungan / Benefit (Tulis per baris)</label>
          <textarea required name="benefits" rows={3} className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Biaya pendidikan penuh&#10;Mentoring" />
        </div>

        <button disabled={submitting} type="submit" className="w-full rounded-xl border-4 border-black bg-primary py-4 text-lg font-black text-white transition-transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50">
          {submitting ? "Menyimpan..." : "Tambahkan & Tayangkan"}
        </button>
      </form>
    </PageTransition>
  );
}

