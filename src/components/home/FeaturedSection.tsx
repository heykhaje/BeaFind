import Link from "next/link";
import { OpportunityCard } from "@/components/ui/OpportunityCard";
import { FadeIn } from "@/components/ui/PageTransition";
import { getFeaturedOpportunities } from "@/data/opportunities";

export async function FeaturedSection() {
  const featured = await getFeaturedOpportunities();

  return (
    <section className="mx-auto mb-20 max-w-[1280px] rounded-3xl bg-surface-container-low px-4 py-20 dark:bg-[#1e293b]/40 md:px-8">
      <FadeIn>
        <div className="mb-12 flex flex-col items-end justify-between px-2 md:flex-row md:px-6">
          <div>
            <h2 className="mb-2 text-headline-lg font-bold">Peluang Unggulan</h2>
            <p className="text-body-md text-on-surface-variant dark:text-[#94a3b8]">
              Peluang paling populer minggu ini yang mungkin cocok untukmu.
            </p>
          </div>
          <Link
            href="/beasiswa"
            className="mt-4 rounded-lg border border-primary px-6 py-2 text-label-md text-primary transition-all hover:bg-primary/5 md:mt-0"
          >
            Lihat Semua
          </Link>
        </div>
      </FadeIn>
      <div className="grid gap-8 px-2 md:grid-cols-2 md:px-6 lg:grid-cols-3">
        {featured.map((opportunity, index) => (
          <FadeIn key={opportunity.id} delay={index * 0.08}>
            <OpportunityCard opportunity={opportunity} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

