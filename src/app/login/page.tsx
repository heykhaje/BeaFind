"use client";

import { PageTransition } from "@/components/ui/PageTransition";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await res.json()) as { message?: string };

      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan.");
      }

      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center px-4 py-12 md:px-8">
      <div className="mb-8 flex justify-center">
        <Logo size={48} />
      </div>
      <div className="card-shadow rounded-2xl border-4 border-black bg-surface-white p-8 dark:border-white dark:bg-[#1e293b]">
        <h1 className="mb-2 text-center text-headline-sm font-bold">Selamat Datang Kembali</h1>
        <p className="mb-8 text-center text-body-md text-on-surface-variant dark:text-[#94a3b8]">
          Masuk untuk melanjutkan ke akun Anda
        </p>

        {error && <p className="mb-4 text-center text-sm font-bold text-error">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-label-md font-bold text-on-surface">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border-2 border-black bg-transparent px-4 py-2.5 outline-none focus:border-primary dark:border-white"
              placeholder="Masukkan email Anda"
            />
          </div>
          <div>
            <label className="mb-1 block text-label-md font-bold text-on-surface">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full rounded-lg border-2 border-black bg-transparent px-4 py-2.5 outline-none focus:border-primary dark:border-white"
              placeholder="Masukkan password Anda"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="card-hover w-full rounded-lg border-2 border-black bg-primary py-3 text-label-md font-black text-white transition-all hover:bg-surface-tint disabled:opacity-70 dark:border-white"
          >
            {loading ? "Login..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-body-sm text-on-surface-variant dark:text-[#94a3b8]">
          Belum punya akun?{" "}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </PageTransition>
  );
}

