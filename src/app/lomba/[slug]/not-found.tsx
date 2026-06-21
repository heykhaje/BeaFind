import Link from "next/link";
import { PageTransition } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export default function LombaNotFound() {
  return (
    <PageTransition className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <MaterialIcon name="search_off" className="mb-4 text-6xl text-outline" />
      <h1 className="mb-2 text-headline-md font-bold">Lomba Tidak Ditemukan</h1>
      <p className="mb-6 text-body-md text-on-surface-variant">
        Halaman lomba yang kamu cari tidak tersedia atau sudah dihapus.
      </p>
      <Link href="/lomba" className="rounded-lg bg-primary px-6 py-3 text-on-primary">
        Lihat Semua Lomba
      </Link>
    </PageTransition>
  );
}
