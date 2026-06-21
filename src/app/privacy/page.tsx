import { PageTransition } from "@/components/ui/PageTransition";
import { siteConfig } from "@/lib/constants";

export const metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: "Kebijakan Privasi platform BeaFind.",
};

export default function PrivacyPage() {
  return (
    <PageTransition className="mx-auto max-w-4xl px-4 py-8 md:py-16 md:px-8">
      <div className="mx-auto max-w-4xl card-shadow rounded-3xl border-4 border-black bg-white p-6 md:p-12 dark:border-white dark:bg-[#1e293b]">
        <h1 className="mb-8 text-3xl font-bold uppercase tracking-tight md:text-4xl">
          Kebijakan Privasi
        </h1>
        
        <div className="prose prose-base dark:prose-invert max-w-none font-normal text-gray-700 dark:text-gray-300">
          <p className="mb-6 font-semibold text-lg text-black dark:text-white">
            Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">1. Pengumpulan Data</h2>
            <p className="mb-4">
              Kami ({siteConfig.name}) mengumpulkan informasi pribadi yang Anda berikan secara langsung kepada kami saat membuat akun, mengisi profil, dan menghubungi kami. Informasi tersebut meliputi nama, email, dan data terkait pendidikan yang secara sukarela Anda cantumkan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">2. Penggunaan Informasi</h2>
            <p className="mb-4">
              Informasi yang kami kumpulkan digunakan untuk:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
              <li>Mempersonalisasi pengalaman Anda dalam mencari peluang akademik.</li>
              <li>Berkomunikasi dengan Anda terkait layanan, pembaruan, dan notifikasi penting.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">3. Berbagi Informasi</h2>
            <p className="mb-4">
              Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak ketiga. Data yang Anda publikasikan pada profil atau form pengajuan informasi mungkin dapat dilihat oleh administrator kami untuk keperluan moderasi (ACC).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">4. Keamanan Data</h2>
            <p className="mb-4">
              Kami mengimplementasikan langkah-langkah keamanan yang wajar untuk melindungi informasi Anda dari akses yang tidak sah, perubahan, atau penghancuran.
            </p>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

