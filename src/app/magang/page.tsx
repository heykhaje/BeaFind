import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { OpportunityList } from "@/components/shared/OpportunityList";
import { getOpportunitiesByCategory } from "@/data/opportunities";

export const metadata: Metadata = {
  title: "Magang",
  description: "Dapatkan pengalaman profesional di perusahaan terkemuka dan startup inovatif.",
};

export const dynamic = "force-dynamic";

export default async function MagangPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const items = await getOpportunitiesByCategory("magang");

  return (
    <PageTransition className="mx-auto max-w-[1280px] px-4 py-8 md:py-12 md:px-8">
      <div className="card-shadow mb-8 md:mb-12 flex h-auto py-12 w-full items-center justify-center rounded-3xl border-4 border-black bg-[#fef08a] px-6 text-center dark:border-white md:h-[300px] md:p-8">
        <div className="font-[family-name:var(--font-fira-code)]">
          <h1 className="mb-2 md:mb-4 text-3xl font-black text-black md:text-6xl uppercase tracking-wider">MAGANG</h1>
          <p className="text-base font-bold text-black/80 md:text-2xl">Mulai Karir Profesionalmu dari Sekarang</p>
        </div>
      </div>
      <OpportunityList
        items={items}
        category="magang"
        title="Program Magang Profesional"
        description="Dapatkan pengalaman kerja nyata di perusahaan terkemuka dan startup inovatif di Indonesia."
      />
    </PageTransition>
  );
}

