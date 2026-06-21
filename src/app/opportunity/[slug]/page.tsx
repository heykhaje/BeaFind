import { notFound } from "next/navigation";
import { getOpportunityBySlug } from "@/data/opportunities";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { categoryBadgeStyles, categoryLabels } from "@/lib/utils";
import Link from "next/link";

interface OpportunityPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OpportunityPage({ params }: OpportunityPageProps) {
  const { slug } = await params;
  const opportunity = await getOpportunityBySlug(slug);

  if (!opportunity) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 font-bold text-on-surface hover:text-primary dark:text-white">
        <MaterialIcon name="arrow_back" />
        Kembali ke Beranda
      </Link>

      <div className="card-shadow rounded-xl border-4 border-black bg-surface-white p-8 dark:border-white dark:bg-[#1e293b]">
        <div className="mb-6 flex items-center justify-between">
          <span
            className={`rounded-full border-2 border-black px-4 py-2 text-sm font-bold uppercase tracking-wider ${categoryBadgeStyles[opportunity.category]}`}
          >
            {categoryLabels[opportunity.category]}
          </span>
          {opportunity.deadlineUrgent && (
            <span className="rounded-full border-2 border-error bg-error/10 px-4 py-2 text-sm font-bold text-error">
              Deadline Segera!
            </span>
          )}
        </div>

        <h1 className="mb-4 text-4xl font-black md:text-5xl">{opportunity.title}</h1>
        <p className="mb-8 text-xl font-medium text-on-surface-variant dark:text-[#94a3b8]">
          {opportunity.organization} • {opportunity.location}
        </p>

        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div className="card-shadow rounded-xl border-2 border-black bg-primary/10 p-6 dark:border-white dark:bg-primary/20">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
              <MaterialIcon name="event" /> Deadline
            </h3>
            <p className="text-on-surface-variant dark:text-white">{opportunity.deadline}</p>
          </div>
          <div className="card-shadow md:col-span-2 rounded-xl border-2 border-black bg-surface-container p-6 dark:border-white dark:bg-[#334155]">
            <h3 className="mb-2 text-lg font-bold">Deskripsi</h3>
            <p className="text-on-surface-variant dark:text-white">{opportunity.description}</p>
            
            {(opportunity.socialMedia || opportunity.website) && (
              <div className="mt-4 flex flex-wrap gap-4 pt-4 border-t border-black/10 dark:border-white/10">
                {opportunity.website && (
                  <a href={opportunity.website} target="_blank" className="font-bold text-primary hover:underline flex items-center gap-1">
                    <MaterialIcon name="language" className="text-sm" /> Website Resmi
                  </a>
                )}
                {opportunity.socialMedia && (
                  <span className="font-bold text-secondary flex items-center gap-1">
                    <MaterialIcon name="share" className="text-sm" /> {opportunity.socialMedia}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div className="card-shadow rounded-xl border-2 border-black bg-surface-container p-6 dark:border-white dark:bg-[#334155]">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <MaterialIcon name="fact_check" /> Persyaratan
            </h3>
            <ul className="list-inside list-disc space-y-2 text-on-surface-variant dark:text-white">
              {(opportunity.requirements as string[])?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="card-shadow rounded-xl border-2 border-black bg-surface-container p-6 dark:border-white dark:bg-[#334155]">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <MaterialIcon name="redeem" /> Keuntungan
            </h3>
            <ul className="list-inside list-disc space-y-2 text-on-surface-variant dark:text-white">
              {(opportunity.benefits as string[])?.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center">
          <a 
            href={opportunity.registrationLink || "#"} 
            target={opportunity.registrationLink ? "_blank" : "_self"}
            className="card-hover card-shadow w-full max-w-md rounded-xl border-4 border-black bg-primary px-8 py-4 text-center text-xl font-black text-white hover:bg-surface-tint dark:border-white"
          >
            DAFTAR SEKARANG
          </a>
          <p className="mt-4 text-center text-sm text-outline dark:text-[#94a3b8]">Anda akan diarahkan ke halaman pendaftaran resmi penyelenggara.</p>
        </div>
      </div>
    </main>
  );
}
