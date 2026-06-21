import Link from "next/link";
import type { Opportunity } from "@/types";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { categoryBadgeStyles, categoryLabels } from "@/lib/utils";

interface OpportunityCardProps {
  opportunity: Opportunity;
  href?: string;
}

export function OpportunityCard({ opportunity, href }: OpportunityCardProps) {
  const link = href ?? `/opportunity/${opportunity.slug}`;

  return (
    <article className="card-hover card-shadow flex h-full flex-col rounded-xl border-2 border-black bg-surface-white p-6 dark:border-white dark:bg-[#1e293b]">
      <div className="mb-4 flex items-start justify-between">
        <span
          className={`rounded-full px-3 py-1 text-label-sm font-medium ${categoryBadgeStyles[opportunity.category]}`}
        >
          {categoryLabels[opportunity.category]}
        </span>
        <button
          type="button"
          className="text-outline transition-colors hover:text-primary"
          aria-label="Bookmark"
        >
          <MaterialIcon name="bookmark" />
        </button>
      </div>
      <h4 className="mb-2 text-headline-sm font-semibold">{opportunity.title}</h4>
      <p className="mb-6 text-body-sm text-on-surface-variant dark:text-[#94a3b8]">
        {opportunity.organization}
      </p>
      <div className="mt-auto space-y-4">
        <div
          className={`flex items-center gap-2 ${opportunity.deadlineUrgent ? "text-error" : "text-on-surface-variant dark:text-[#94a3b8]"}`}
        >
          <MaterialIcon name="timer" className="text-sm" />
          <span className="text-label-sm">Deadline: {opportunity.deadline}</span>
        </div>
        <Link
          href={link}
          className="block w-full rounded-lg bg-primary py-2.5 text-center text-label-md text-on-primary transition-all hover:opacity-90"
        >
          Apply Now
        </Link>
      </div>
    </article>
  );
}

