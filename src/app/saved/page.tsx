"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/PageTransition";
import { OpportunityCard } from "@/components/ui/OpportunityCard";

export default function SavedPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savedOpportunities, setSavedOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/saved")
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) router.push("/login");
          throw new Error("Gagal mengambil data");
        }
        return res.json();
      })
      .then((data) => {
        // data berbentuk [{ opportunity: { ... } }, ...]
        setSavedOpportunities(data.map((item: any) => item.opportunity));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <PageTransition className="mx-auto max-w-[1280px] px-4 py-12 md:px-8">
      <div className="mb-8 md:mb-12">
        <h1 className="mb-4 text-3xl font-bold md:text-[40px]">Tersimpan</h1>
        <p className="text-body-lg text-on-surface-variant dark:text-[#94a3b8] max-w-2xl">
          Daftar beasiswa, magang, dan lomba yang telah Anda simpan.
        </p>
      </div>

      {savedOpportunities.length === 0 ? (
        <div className="card-shadow flex flex-col items-center justify-center rounded-3xl border-4 border-black bg-surface-white py-20 text-center dark:border-white dark:bg-[#1e293b]">
          <h2 className="mb-2 text-2xl font-bold">Belum ada info yang disimpan</h2>
          <p className="text-on-surface-variant dark:text-[#94a3b8]">
            Anda bisa menyimpan info peluang menarik dengan menekan tombol "Simpan" di halaman detail.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </PageTransition>
  );
}
