import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { OpportunityList } from "@/components/shared/OpportunityList";
import { getOpportunitiesByCategory } from "@/data/opportunities";

export const metadata: Metadata = {
  title: "Lomba",
  description: "Asah kemampuanmu dan raih prestasi di berbagai kompetisi bergengsi.",
};

export default async function LombaPage() {
  const items = await getOpportunitiesByCategory("lomba");

  return (
    <PageTransition className="mx-auto max-w-[1280px] px-4 py-8 md:py-12 md:px-8">
      <div className="card-shadow mb-8 md:mb-12 flex h-auto py-12 w-full items-center justify-center rounded-3xl border-4 border-black bg-[#fca5a5] px-6 text-center dark:border-white md:h-[300px] md:p-8">
        <div className="font-[family-name:var(--font-fira-code)]">
          <h1 className="mb-2 md:mb-4 text-3xl font-black text-black md:text-6xl uppercase tracking-wider">LOMBA</h1>
          <p className="text-base font-bold text-black/80 md:text-2xl">Buktikan Kemampuanmu di Tingkat Nasional</p>
        </div>
      </div>
      <OpportunityList
        items={items}
        category="lomba"
        title="Kompetisi & Lomba Bergengsi"
        description="Tunjukkan kemampuan terbaikmu dan raih prestasi di berbagai kompetisi akademik dan profesional."
      />
    </PageTransition>
  );
}

