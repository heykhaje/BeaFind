import { PageTransition } from "@/components/ui/PageTransition";
import { siteConfig } from "@/lib/constants";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export const metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: "Pelajari lebih lanjut tentang visi, misi, dan tim di balik BeaFind.",
};

export default function AboutPage() {
  return (
    <PageTransition className="mx-auto max-w-5xl px-4 py-8 md:py-16 md:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-block rounded-full border-2 border-black bg-primary/20 px-4 py-2 text-sm font-bold uppercase tracking-widest text-primary dark:border-white">
          Tentang Kami
        </span>
        <h1 className="mb-6 text-3xl font-bold md:text-5xl uppercase tracking-tight">
          Membangun Masa Depan Pendidikan
        </h1>
        <p className="mb-12 text-lg font-normal text-on-surface-variant dark:text-[#94a3b8] leading-relaxed">
          {siteConfig.name} hadir sebagai platform terdepan yang menghubungkan mahasiswa dan pelajar Indonesia 
          dengan berbagai peluang beasiswa, magang, dan perlombaan terbaik untuk mengembangkan potensi maksimal mereka.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mt-8">
        <div className="card-shadow rounded-2xl border-4 border-black bg-primary-container/20 p-6 md:p-8 dark:border-white dark:bg-[#1e293b]">
          <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
            <MaterialIcon name="visibility" className="text-4xl text-primary" />
            Visi Kami
          </h2>
          <p className="font-[family-name:var(--font-fira-code)] text-base font-medium text-black/80 dark:text-gray-300">
            Menjadi katalisator utama pemerataan informasi pendidikan dan karier di seluruh penjuru Indonesia, memastikan tidak ada lagi talenta yang terlewatkan karena kurangnya akses informasi.
          </p>
        </div>
        <div className="card-shadow rounded-2xl border-4 border-black bg-secondary-container/20 p-6 md:p-8 dark:border-white dark:bg-[#1e293b]">
          <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
            <MaterialIcon name="rocket_launch" className="text-4xl text-secondary" />
            Misi Kami
          </h2>
          <ul className="font-[family-name:var(--font-fira-code)] list-inside list-disc space-y-2 text-base font-medium text-black/80 dark:text-gray-300">
            <li>Menyediakan platform informasi yang terpusat dan tervalidasi.</li>
            <li>Membangun komunitas pembelajar yang saling mendukung.</li>
            <li>Mendekatkan institusi penyedia peluang dengan kandidat potensial.</li>
          </ul>
        </div>
      </div>
    </PageTransition>
  );
}

