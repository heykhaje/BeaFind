"use client";

import { useMemo, useState } from "react";
import { OpportunityCard } from "@/components/ui/OpportunityCard";
import { FadeIn } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { Opportunity, OpportunityCategory } from "@/types";
import { categoryLabels } from "@/lib/utils";

interface OpportunityListProps {
  items: Opportunity[];
  category: OpportunityCategory;
  title: string;
  description: string;
  initialQuery?: string;
}

export function OpportunityList({
  items,
  category,
  title,
  description,
  initialQuery = "",
}: OpportunityListProps) {
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <FadeIn>
        <div className="mb-10">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-label-sm font-semibold text-primary">
            {categoryLabels[category]}
          </span>
          <h1 className="mb-4 text-3xl font-bold md:text-[40px]">{title}</h1>
          <p className="max-w-2xl text-body-lg text-on-surface-variant dark:text-[#94a3b8] font-[family-name:var(--font-fira-code)]">
            {description}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-8 flex max-w-xl items-center gap-2 rounded-xl border border-outline-variant bg-surface-white px-4 py-3 dark:border-[#334155] dark:bg-[#1e293b]">
          <MaterialIcon name="search" className="text-outline" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Cari ${categoryLabels[category].toLowerCase()}...`}
            className="w-full border-none bg-transparent text-body-md outline-none"
          />
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <p className="text-body-md text-on-surface-variant">Tidak ada hasil untuk pencarian ini.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.05}>
              <OpportunityCard opportunity={item} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}

