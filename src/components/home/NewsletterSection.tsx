"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/PageTransition";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-8">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center text-on-primary md:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
              <path d="M0 100 C 20 0 50 0 100 100" fill="transparent" stroke="white" strokeWidth="0.5" />
              <path d="M0 80 C 30 20 60 20 100 80" fill="transparent" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-4 text-headline-lg font-bold">Jangan Lewatkan Peluang Terbaru</h2>
            <p className="mb-10 text-body-lg text-on-primary/80">
              Langganan newsletter kami untuk mendapatkan update beasiswa, magang, dan lomba langsung
              ke emailmu setiap minggu.
            </p>
            {submitted ? (
              <p className="rounded-xl bg-white/20 px-6 py-4 font-semibold">
                Terima kasih! Kamu sudah terdaftar di newsletter BeaFind.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Masukkan email kamu..."
                  className="flex-1 rounded-xl border-none bg-white px-6 py-4 text-on-surface outline-none focus:ring-2 focus:ring-surface-container-high"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-on-primary px-8 py-4 text-label-md font-bold text-primary transition-all hover:bg-surface-container-low"
                >
                  Langganan Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

