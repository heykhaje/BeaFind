"use client";

import { useState } from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { helpArticles } from "@/lib/constants";

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(helpArticles[0]?.id ?? null);

  return (
    <PageTransition className="mx-auto max-w-4xl px-4 py-8 md:py-16 md:px-8">
      <div className="mb-12 text-center">
        <span className="mb-4 inline-block rounded-full border-2 border-black bg-tertiary/20 px-4 py-2 text-sm font-bold uppercase tracking-widest text-tertiary dark:border-white">
          FAQ
        </span>
        <h1 className="mb-4 text-3xl font-bold md:text-5xl uppercase tracking-tight">
          Pertanyaan Umum
        </h1>
        <p className="mx-auto max-w-2xl text-lg font-normal text-on-surface-variant dark:text-[#94a3b8]">
          Temukan jawaban cepat untuk hal-hal yang sering ditanyakan oleh pengguna BeaFind.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {helpArticles.map((article) => (
          <div key={article.id} className="card-shadow overflow-hidden rounded-xl border-4 border-black bg-white transition-all dark:border-white dark:bg-[#1e293b]">
            <button
              type="button"
              onClick={() => setOpenId(openId === article.id ? null : article.id)}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 md:px-6 md:py-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div>
                <span className="mb-1 block text-sm font-bold text-primary">{article.category}</span>
                <span className="text-lg font-bold">{article.question}</span>
              </div>
              <MaterialIcon
                name={openId === article.id ? "expand_less" : "expand_more"}
                className="shrink-0 text-2xl text-on-surface-variant"
              />
            </button>
            {openId === article.id && (
              <div className="border-t-4 border-black px-4 py-4 md:px-6 md:py-5 text-base font-normal text-gray-700 dark:border-white dark:text-gray-300">
                {article.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageTransition>
  );
}

