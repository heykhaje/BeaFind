import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { OpportunityList } from "@/components/shared/OpportunityList";
import { getOpportunitiesByCategory } from "@/data/opportunities";

export const metadata: Metadata = {
  title: "Beasiswa",
  description: "Temukan bantuan dana pendidikan dari berbagai instansi nasional maupun internasional.",
};

export const dynamic = "force-dynamic";

export default async function BeasiswaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const items = await getOpportunitiesByCategory("beasiswa");

  return (
    <PageTransition className="mx-auto max-w-[1280px] px-4 py-8 md:py-12 md:px-8">
      <div className="card-shadow mb-8 md:mb-12 flex h-auto py-12 w-full items-center justify-center rounded-3xl border-4 border-black bg-[#bfdbfe] px-6 text-center dark:border-white md:h-[300px] md:p-8">
        <div className="font-[family-name:var(--font-fira-code)]">
          <h1 className="mb-2 md:mb-4 text-3xl font-black text-black md:text-6xl uppercase tracking-wider">BEASISWA</h1>
          <p className="text-base font-bold text-black/80 md:text-2xl">Raih Dana Pendidikan untuk Masa Depanmu</p>
        </div>
      </div>
      <OpportunityList
        items={items}
        category="beasiswa"
        title="Beasiswa Terbaik untuk Masa Depanmu"
        description="Temukan bantuan dana pendidikan dari berbagai instansi nasional maupun internasional. Filter dan cari beasiswa yang sesuai dengan profilmu."
        initialQuery={params.q ?? ""}
      />
    </PageTransition>
  );
}

