"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { PageTransition } from "@/components/ui/PageTransition";

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/users/profile-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengunggah foto.");
      }

      setUser(data.user);
      setSuccess("Foto profil berhasil diperbarui!");
      
      // Auto reload header or app state by refreshing after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <PageTransition className="mx-auto max-w-[1280px] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-black md:text-4xl">Profil Saya</h1>

        <div className="card-shadow rounded-2xl border-4 border-black bg-surface-white p-8 dark:border-white dark:bg-[#1e293b]">
          
          {error && <div className="mb-6 rounded-lg bg-red-100 p-4 text-sm font-bold text-red-700">{error}</div>}
          {success && <div className="mb-6 rounded-lg bg-green-100 p-4 text-sm font-bold text-green-700">{success}</div>}
          
          <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-black bg-primary dark:border-white">
              {user.image ? (
                <Image src={user.image} alt={user.name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl font-black text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <MaterialIcon name="sync" className="animate-spin text-3xl" />
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-center sm:pt-4 text-center sm:text-left">
              <h2 className="text-2xl font-black">{user.name}</h2>
              <p className="mb-4 text-on-surface-variant dark:text-[#94a3b8]">{user.email}</p>
              
              <div className="relative inline-block">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                />
                <label
                  htmlFor="profileImage"
                  className="card-hover inline-flex cursor-pointer items-center gap-2 rounded-lg border-2 border-black bg-white px-4 py-2 text-sm font-bold transition-colors hover:bg-gray-100 dark:bg-[#334155] dark:text-white dark:hover:bg-[#475569]"
                >
                  <MaterialIcon name="photo_camera" />
                  {uploading ? "Mengunggah..." : "Ganti Foto Profil"}
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border-2 border-black bg-surface-container-low p-6 dark:border-white dark:bg-[#334155]">
            <h3 className="mb-4 text-xl font-bold">Informasi Akun</h3>
            
            <div>
              <label className="text-xs font-bold uppercase text-on-surface-variant dark:text-[#cbd5e1]">Nama Lengkap</label>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            
            <div>
              <label className="text-xs font-bold uppercase text-on-surface-variant dark:text-[#cbd5e1]">Alamat Email</label>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
          </div>
          
        </div>
      </div>
    </PageTransition>
  );
}

