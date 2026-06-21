import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTransition } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { getLombaSlugs, getOpportunityBySlug } from "@/data/opportunities";
import { categoryBadgeStyles, categoryLabels } from "@/lib/utils";
import { SaveButton } from "@/components/ui/SaveButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);

  if (!opportunity) {
    return { title: "Lomba Tidak Ditemukan" };
  }

  return {
    title: opportunity.title,
    description: opportunity.description,
  };
}

export default async function LombaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);

  if (!opportunity || opportunity.category !== "lomba") {
    notFound();
  }

  return (
    <PageTransition className="mx-auto max-w-[1280px] px-4 py-12 md:px-8">
      <Link
        href="/lomba"
        className="mb-8 inline-flex items-center gap-2 text-label-md text-primary transition-colors hover:underline"
      >
        <MaterialIcon name="arrow_back" className="text-sm" />
        Kembali ke Lomba
      </Link>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span
            className={`mb-4 inline-block rounded-full px-3 py-1 text-label-sm font-medium ${categoryBadgeStyles.lomba}`}
          >
            {categoryLabels.lomba}
          </span>
          <h1 className="mb-4 text-headline-lg font-bold md:text-[40px]">{opportunity.title}</h1>
          <p className="mb-2 text-body-lg text-on-surface-variant dark:text-[#94a3b8]">
            {opportunity.organization}
          </p>
          {opportunity.location && (
            <p className="mb-6 flex items-center gap-2 text-body-md text-on-surface-variant dark:text-[#94a3b8]">
              <MaterialIcon name="location_on" className="text-sm" />
              {opportunity.location}
            </p>
          )}
          <p className="mb-8 text-body-lg leading-relaxed">{opportunity.description}</p>

          {opportunity.requirements && (
            <section className="mb-8">
              <h2 className="mb-4 text-headline-sm font-semibold">Persyaratan</h2>
              <ul className="space-y-2">
                {(opportunity.requirements as string[])?.map((req) => (
                  <li
                    key={req}
                    className="flex items-start gap-2 text-body-md text-on-surface-variant dark:text-[#94a3b8]"
                  >
                    <MaterialIcon name="check_circle" className="mt-0.5 text-sm text-success" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {opportunity.benefits && (
            <section>
              <h2 className="mb-4 text-headline-sm font-semibold">Benefit</h2>
              <ul className="space-y-2">
                {(opportunity.benefits as string[])?.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-body-md text-on-surface-variant dark:text-[#94a3b8]"
                  >
                    <MaterialIcon name="star" className="mt-0.5 text-sm text-tertiary-container" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-outline-variant bg-surface-white p-6 dark:border-[#334155] dark:bg-[#1e293b]">
          <div
            className={`mb-6 flex items-center gap-2 ${opportunity.deadlineUrgent ? "text-error" : "text-on-surface-variant"}`}
          >
            <MaterialIcon name="timer" />
            <span className="text-label-md font-semibold">Deadline: {opportunity.deadline}</span>
          </div>
          <button
            type="button"
            className="mb-4 w-full rounded-lg bg-primary py-3 text-label-md font-semibold text-on-primary transition-all hover:opacity-90"
          >
            Daftar Sekarang
          </button>
          <SaveButton opportunityId={opportunity.id} />
        </aside>
      </div>
    </PageTransition>
  );
}
