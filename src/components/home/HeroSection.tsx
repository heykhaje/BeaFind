"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FadeIn } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import {  siteConfig  } from "@/lib/constants";

export function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/beasiswa?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <section className="relative mx-auto max-w-[1280px] overflow-hidden px-4 pb-16 pt-10 md:pb-24 md:pt-16 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <FadeIn className="z-10">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-on-background md:mb-6 md:text-[48px] md:leading-[56px] dark:text-white">
            Temukan Beasiswa, Magang, dan Lomba Terbaik untuk Masa Depanmu
          </h1>
          <p className="mb-10 max-w-xl text-body-lg text-on-surface-variant dark:text-[#94a3b8] font-[family-name:var(--font-fira-code)]">
            {siteConfig.description}
          </p>
          <form
            onSubmit={handleSearch}
            className="relative flex max-w-xl gap-2 rounded-xl border border-outline-variant bg-surface-white p-2 shadow-lg dark:border-[#334155] dark:bg-[#1e293b]"
          >
            <div className="flex flex-1 items-center gap-2 px-4">
              <MaterialIcon name="search" className="text-outline" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari beasiswa, magang, atau lomba..."
                className="w-full border-none bg-transparent text-body-md outline-none focus:ring-0"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-all hover:bg-surface-tint md:px-8"
            >
              Mulai Cari
            </button>
          </form>
        </FadeIn>
        <FadeIn delay={0.15} className="relative mt-8 lg:mt-0">
          <div className="relative inline-block w-full">
            <Image
              src={siteConfig.heroImage}
              alt="Mahasiswa berkolaborasi mengeksplorasi peluang pendidikan"
              width={640}
              height={480}
              className="card-shadow h-auto w-full rounded-2xl border-4 border-black object-cover dark:border-white"
              priority
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

