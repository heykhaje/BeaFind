"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { helpArticles } from "@/lib/constants";

export function HelpCentreContent() {
  const [openId, setOpenId] = useState<string | null>(helpArticles[0]?.id ?? null);
  const categories = [...new Set(helpArticles.map((a) => a.category))];

  return (
    <div>
      <FadeIn>
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-label-sm font-semibold text-primary">
            Help Centre
          </span>
          <h1 className="mb-4 text-headline-lg font-bold">Pusat Bantuan BeaFind</h1>
          <p className="mx-auto max-w-2xl text-body-lg text-on-surface-variant dark:text-[#94a3b8]">
            Temukan jawaban untuk pertanyaan umum seputar beasiswa, magang, lomba, dan penggunaan
            platform BeaFind.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-outline-variant px-4 py-2 text-label-sm dark:border-[#475569]"
            >
              {cat}
            </span>
          ))}
        </div>
      </FadeIn>

      <div className="mx-auto max-w-3xl space-y-4">
        {helpArticles.map((article, index) => (
          <FadeIn key={article.id} delay={index * 0.05}>
            <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-white dark:border-[#334155] dark:bg-[#1e293b]">
              <button
                type="button"
                onClick={() => setOpenId(openId === article.id ? null : article.id)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <div>
                  <span className="mb-1 block text-label-sm text-primary">{article.category}</span>
                  <span className="text-headline-sm font-semibold">{article.question}</span>
                </div>
                <MaterialIcon
                  name={openId === article.id ? "expand_less" : "expand_more"}
                  className="shrink-0 text-on-surface-variant"
                />
              </button>
              {openId === article.id && (
                <div className="border-t border-outline-variant px-6 py-5 text-body-md text-on-surface-variant dark:border-[#334155] dark:text-[#94a3b8]">
                  {article.answer}
                </div>
              )}
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-surface-container-low p-8 text-center dark:bg-[#1e293b]/50">
          <MaterialIcon name="support_agent" className="mb-4 text-4xl text-primary" />
          <h2 className="mb-2 text-headline-sm font-bold">Masih butuh bantuan?</h2>
          <p className="mb-6 text-body-md text-on-surface-variant dark:text-[#94a3b8]">
            Tim support kami siap membantu kamu. Hubungi kami di support@beafind.id
          </p>
          <a
            href="mailto:support@beafind.id"
            className="inline-block rounded-lg bg-primary px-6 py-3 text-on-primary transition-all hover:opacity-90"
          >
            Hubungi Support
          </a>
        </div>
      </FadeIn>
    </div>
  );
}

