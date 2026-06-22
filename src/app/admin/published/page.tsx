"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminPublishedPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/admin/published-opportunities");
      if (res.ok) {
        const data = await res.json();
        setOpportunities(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const requestDelete = (id: string) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setModalOpen(false);

    try {
      const res = await fetch(`/api/admin/opportunities/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Remove from list
        setOpportunities(opportunities.filter((o) => o.id !== deleteId));
      } else {
        alert("Gagal menghapus info.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Memuat data...</div>;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-black">Peluang yang Diterbitkan</h1>
      
      {opportunities.length === 0 ? (
        <div className="rounded-xl border-2 border-black bg-white p-8 text-center font-bold dark:border-white dark:bg-[#1e293b]">
          Tidak ada info peluang yang diterbitkan saat ini.
        </div>
      ) : (
        <div className="grid gap-6">
          {opportunities.map((opp) => (
            <div key={opp.id} className="card-shadow flex flex-col gap-4 rounded-xl border-2 border-black bg-white p-6 dark:border-white dark:bg-[#1e293b] md:flex-row md:items-center md:justify-between">
              <div>
                <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary uppercase">
                  {opp.category}
                </span>
                <h3 className="text-xl font-black">{opp.title}</h3>
                <p className="font-medium text-gray-600 dark:text-gray-300">{opp.organization}</p>
                
                <div className="mt-4 flex flex-col gap-1 text-sm">
                  {opp.socialMedia && <p><strong>Sosmed:</strong> {opp.socialMedia}</p>}
                  {opp.website && <p><strong>Web:</strong> <a href={opp.website} target="_blank" className="text-primary hover:underline">{opp.website}</a></p>}
                  {opp.registrationLink && <p><strong>Daftar:</strong> <a href={opp.registrationLink} target="_blank" className="text-primary hover:underline">{opp.registrationLink}</a></p>}
                </div>
                
                <p className="mt-4 text-sm border-t border-gray-200 pt-2 dark:border-gray-700">Oleh: <span className="font-bold">{opp.author?.name || "Anonim"}</span></p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => requestDelete(opp.id)}
                  className="flex items-center gap-1 rounded-xl border-2 border-black bg-red-100 px-4 py-2 font-bold text-red-700 transition-transform hover:-translate-y-1 active:translate-y-0 dark:border-white dark:bg-red-900/30 dark:text-red-400"
                >
                  <MaterialIcon name="delete" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        title="Hapus Peluang"
        message="Yakin ingin menghapus peluang ini? Data tidak dapat dikembalikan."
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
        confirmText="Hapus"
        type="danger"
      />
    </div>
  );
}

