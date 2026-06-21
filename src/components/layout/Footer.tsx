import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import {  siteConfig  } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest px-4 py-12 dark:border-[#334155] dark:bg-[#0f172a] md:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-12 md:flex-row">
          <div className="max-w-xs">
            <Logo size={32} />
            <p className="mt-6 text-body-sm text-on-surface-variant dark:text-[#94a3b8]">
              Empowering student futures with the best academic and career opportunities across
              Indonesia.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3">
            <div>
              <h6 className="mb-6 text-label-md font-bold">Navigasi</h6>
              <ul className="space-y-4">
                <li>
                  <Link href="/beasiswa" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    Beasiswa
                  </Link>
                </li>
                <li>
                  <Link href="/magang" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    Magang
                  </Link>
                </li>
                <li>
                  <Link href="/lomba" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    Lomba
                  </Link>
                </li>
                <li>
                  <Link href="/helpcentre" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    Help Centre
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="mb-6 text-label-md font-bold">Perusahaan</h6>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-body-sm text-on-surface-variant transition-colors hover:text-primary dark:text-[#94a3b8]">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant pt-8 md:flex-row dark:border-[#334155]">
          <p className="text-label-sm text-on-surface-variant dark:text-[#64748b]">
            © 2026 {siteConfig.name} by Khaje&apos;Studio. Empowering student futures.
          </p>
        </div>
      </div>
    </footer>
  );
}

