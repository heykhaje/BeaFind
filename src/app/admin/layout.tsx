import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-jwt";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    if (decoded.role !== "ADMIN") redirect("/");
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen pt-20">
      <aside className="w-64 border-r-2 border-black bg-surface-container-low p-6 dark:border-white dark:bg-[#1e293b] hidden md:block">
        <h2 className="mb-8 text-xl font-black">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin/pending" className="flex items-center gap-3 rounded-xl p-3 font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/10">
            <MaterialIcon name="pending_actions" /> Menunggu ACC
          </Link>
          <Link href="/admin/published" className="flex items-center gap-3 rounded-xl p-3 font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/10">
            <MaterialIcon name="published_with_changes" /> Diterbitkan
          </Link>
          <Link href="/admin/add" className="flex items-center gap-3 rounded-xl p-3 font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/10">
            <MaterialIcon name="post_add" /> Tambah Info Baru
          </Link>
          <Link href="/" className="flex items-center gap-3 rounded-xl p-3 font-bold text-primary transition-colors hover:bg-black/5 dark:hover:bg-white/10">
            <MaterialIcon name="arrow_back" /> Kembali ke Web
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-surface-white p-4 md:p-8 dark:bg-[#0f172a]">
        {children}
      </main>
    </div>
  );
}
