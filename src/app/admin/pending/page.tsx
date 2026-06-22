"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminPendingPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [actionData, setActionData] = useState<{ id: string; status: "APPROVED" | "REJECTED" } | null>(null);

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/admin/pending-opportunities");
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

  const requestAction = (id: string, status: "APPROVED" | "REJECTED") => {
    setActionData({ id, status });
    setModalOpen(true);
  };

  const executeAction = async () => {
    if (!actionData) return;
    const { id, status } = actionData;
    setModalOpen(false);

    try {
      const res = await fetch(`/api/admin/opportunities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        // Remove from list
        setOpportunities(opportunities.filter((o) => o.id !== id));
      } else {
        alert("Gagal memperbarui status.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div>Memuat data...</div>;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-black">Pengajuan Menunggu ACC</h1>
      
      {opportunities.length === 0 ? (
        <div className="rounded-xl border-2 border-black bg-white p-8 text-center font-bold dark:border-white dark:bg-[#1e293b]">
          Tidak ada pengajuan yang menunggu saat ini.
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
                  onClick={() => requestAction(opp.id, "REJECTED")}
                  className="rounded-xl border-2 border-black bg-red-100 px-4 py-2 font-bold text-red-700 transition-transform hover:-translate-y-1 active:translate-y-0 dark:border-white dark:bg-red-900/30 dark:text-red-400"
                >
                  Tolak
                </button>
                <button 
                  onClick={() => requestAction(opp.id, "APPROVED")}
                  className="rounded-xl border-2 border-black bg-green-500 px-4 py-2 font-bold text-white transition-transform hover:-translate-y-1 active:translate-y-0 dark:border-white"
                >
                  Terima (ACC)
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        title={actionData?.status === "APPROVED" ? "Terima Pengajuan" : "Tolak Pengajuan"}
        message={`Yakin ingin ${actionData?.status === "APPROVED" ? "Menerima (ACC)" : "Menolak"} pengajuan ini?`}
        onConfirm={executeAction}
        onCancel={() => setModalOpen(false)}
        confirmText={actionData?.status === "APPROVED" ? "Terima" : "Tolak"}
        type={actionData?.status === "APPROVED" ? "success" : "danger"}
      />
    </div>
  );
}

