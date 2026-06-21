"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pesan Anda telah berhasil dikirim. Kami akan membalas secepatnya!");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <PageTransition className="mx-auto max-w-5xl px-4 py-8 md:py-16 md:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <span className="mb-4 inline-block rounded-full border-2 border-black bg-secondary/20 px-4 py-2 text-sm font-bold uppercase tracking-widest text-secondary dark:border-white">
            Hubungi Kami
          </span>
          <h1 className="mb-6 text-3xl font-bold md:text-5xl uppercase tracking-tight">
            Mari Terhubung!
          </h1>
          <p className="mb-8 font-[family-name:var(--font-fira-code)] text-lg font-normal text-on-surface-variant dark:text-[#94a3b8]">
            Ada pertanyaan, saran, atau ingin menjalin kerja sama? Tim kami siap membantu Anda. Silakan isi form di samping atau hubungi kami melalui kontak di bawah ini.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black bg-[#fef08a] dark:border-white dark:bg-yellow-600/20">
                <MaterialIcon name="email" className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold">Email</h3>
                <p className="text-on-surface-variant dark:text-gray-400">hello@beafind.id</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border-2 border-black bg-[#fed7aa] dark:border-white dark:bg-orange-600/20">
                <MaterialIcon name="location_on" className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold">Kantor Pusat</h3>
                <p className="text-on-surface-variant dark:text-gray-400">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-shadow space-y-6 rounded-3xl border-4 border-black bg-white p-6 md:p-8 dark:border-white dark:bg-[#1e293b]">
          <h2 className="text-xl font-bold">Kirim Pesan</h2>
          <div>
            <label className="mb-2 block font-bold">Nama Lengkap</label>
            <input required type="text" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Masukkan nama Anda" />
          </div>
          <div>
            <label className="mb-2 block font-bold">Alamat Email</label>
            <input required type="email" className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="contoh@email.com" />
          </div>
          <div>
            <label className="mb-2 block font-bold">Pesan Anda</label>
            <textarea required rows={5} className="w-full rounded-xl border-2 border-black bg-surface-container-low px-4 py-3 outline-none focus:ring-2 focus:ring-primary dark:border-[#334155] dark:bg-[#334155]" placeholder="Tulis pesan atau pertanyaan Anda di sini..."></textarea>
          </div>
          <button type="submit" className="w-full rounded-xl border-4 border-black bg-primary py-4 text-lg font-black text-white transition-transform hover:-translate-y-1 active:translate-y-0">
            Kirim Sekarang
          </button>
        </form>
      </div>
    </PageTransition>
  );
}

