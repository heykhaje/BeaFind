import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/PageTransition";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const categories = [
  {
    href: "/beasiswa",
    imgSrc: "/icon-beasiswa.png",
    title: "Beasiswa",
    description:
      "Temukan bantuan dana pendidikan dari berbagai instansi nasional maupun internasional.",
    cta: "Lihat Beasiswa",
  },
  {
    href: "/magang",
    imgSrc: "/icon-magang.png",
    title: "Magang",
    description:
      "Dapatkan pengalaman profesional di perusahaan terkemuka dan startup inovatif.",
    cta: "Lihat Magang",
  },
  {
    href: "/lomba",
    imgSrc: "/icon-lomba.png",
    title: "Lomba",
    description: "Asah kemampuanmu dan raih prestasi di berbagai kompetisi bergengsi.",
    cta: "Lihat Lomba",
  },
];

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 md:px-8">
      <FadeIn>
        <h2 className="mb-12 text-center text-headline-lg font-bold">Jelajahi Berdasarkan Kategori</h2>
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-3">
        {categories.map((cat, index) => (
          <FadeIn key={cat.href} delay={index * 0.1}>
            <Link
              href={cat.href}
              className="group card-hover card-shadow block overflow-hidden rounded-xl border border-outline-variant bg-surface-white p-8 dark:border-[#334155] dark:bg-[#1e293b]"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center">
                <Image 
                  src={cat.imgSrc} 
                  alt={`Logo ${cat.title}`} 
                  width={80} 
                  height={80} 
                  className="object-contain"
                />
              </div>
              <h3 className="mb-3 text-headline-sm font-semibold">{cat.title}</h3>
              <p className="mb-6 text-body-md text-on-surface-variant dark:text-[#94a3b8]">
                {cat.description}
              </p>
              <span className="flex items-center gap-2 text-label-md font-semibold text-primary transition-all group-hover:gap-4">
                {cat.cta}
                <MaterialIcon name="arrow_forward" />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

