"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/beasiswa", label: "Beasiswa" },
  { href: "/magang", label: "Magang" },
  { href: "/lomba", label: "Lomba" },
];

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role?: string;
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setProfileOpen(false);
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface-white shadow-sm dark:border-[#334155] dark:bg-[#1e293b]">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-label-md font-semibold tracking-wide transition-colors",
                isActive(link.href)
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-on-surface-variant hover:text-primary dark:text-[#94a3b8]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="rounded-full p-2 transition-all hover:bg-surface-container-low dark:hover:bg-[#334155]"
              aria-label="Notifications"
            >
              <MaterialIcon name="notifications" className="text-on-surface-variant dark:text-[#cbd5e1]" />
            </button>
            
            {notifOpen && (
              <div className="card-shadow absolute right-0 mt-2 w-72 rounded-xl border-2 border-black bg-white p-4 dark:border-white dark:bg-[#1e293b]">
                <h4 className="mb-2 text-sm font-bold">Notifikasi</h4>
                <div className="flex flex-col gap-2">
                  <div className="rounded border-b border-gray-100 p-2 text-xs hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span className="font-bold">Beasiswa Baru!</span> Djarum Plus 2024 telah dibuka.
                  </div>
                  <div className="rounded p-2 text-xs hover:bg-gray-50 dark:hover:bg-gray-800">
                    <span className="font-bold">Reminder:</span> Deadline Business Plan UI 2 hari lagi.
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <ThemeToggle />
          <div className="mx-2 hidden h-8 w-px bg-outline-variant md:block dark:bg-[#475569]" />
          
          {user ? (
            <div className="relative hidden md:block">
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-black bg-primary text-white font-bold dark:border-white"
              >
                {user.image ? (
                  <Image src={user.image} alt="Profile" width={40} height={40} className="object-cover h-full w-full" />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </button>
              
              {profileOpen && (
                <div className="card-shadow absolute right-0 mt-2 w-48 rounded-xl border-2 border-black bg-white py-2 dark:border-white dark:bg-[#1e293b]">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-bold truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                  </div>
                  {user.role === "ADMIN" && (
                    <Link 
                      href="/admin" 
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <MaterialIcon name="admin_panel_settings" className="text-lg" />
                      Panel Admin
                    </Link>
                  )}
                  <Link 
                    href="/submit" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <MaterialIcon name="add_circle" className="text-lg" />
                    Buat Pengajuan
                  </Link>
                  <Link 
                    href="/profile" 
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <MaterialIcon name="person" className="text-lg" />
                    Lihat Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-error hover:bg-red-50 dark:hover:bg-red-900/20 text-left"
                  >
                    <MaterialIcon name="logout" className="text-lg" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-label-md text-on-surface-variant transition-colors hover:text-primary md:block dark:text-[#94a3b8]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hidden rounded-lg border-2 border-black bg-primary px-4 py-2.5 text-label-md font-bold text-white transition-all active:scale-95 md:block md:px-6 dark:border-white"
              >
                Register
              </Link>
            </>
          )}

          <button
            type="button"
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <MaterialIcon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-outline-variant bg-surface-white px-4 py-4 md:hidden dark:border-[#334155] dark:bg-[#1e293b]">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-label-md font-semibold",
                  isActive(link.href) ? "text-primary" : "text-on-surface-variant"
                )}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="text-label-md font-semibold text-on-surface-variant"
                >
                  Profile Saya ({user.name})
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="text-label-md font-semibold text-error text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="text-label-md font-semibold text-on-surface-variant">Login</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="text-label-md font-semibold text-on-surface-variant">Register</Link>
              </>
            )}
            <Link
              href="/helpcentre"
              onClick={() => setMobileOpen(false)}
              className="text-label-md font-semibold text-on-surface-variant"
            >
              Help Centre
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

