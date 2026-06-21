"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useRouter } from "next/navigation";

export function SaveButton({ opportunityId }: { opportunityId: string }) {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/saved/check?opportunityId=${opportunityId}`)
      .then((res) => res.json())
      .then((data) => {
        setIsSaved(data.isSaved);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [opportunityId]);

  const handleSaveToggle = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/saved", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opportunityId }),
      });

      if (res.status === 401) {
        alert("Silakan login terlebih dahulu untuk menyimpan peluang.");
        router.push("/login");
        return;
      }

      if (res.ok) {
        setIsSaved(!isSaved);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleSaveToggle}
      disabled={loading}
      className={`card-hover card-shadow flex items-center justify-center gap-2 rounded-xl border-4 border-black px-6 py-4 font-bold transition-colors dark:border-white ${
        isSaved 
          ? "bg-secondary text-white" 
          : "bg-white hover:bg-surface-container-low dark:bg-[#1e293b] dark:hover:bg-[#334155]"
      }`}
    >
      <MaterialIcon name={isSaved ? "bookmark" : "bookmark_border"} /> 
      {loading ? "Memproses..." : (isSaved ? "Tersimpan" : "Simpan")}
    </button>
  );
}
