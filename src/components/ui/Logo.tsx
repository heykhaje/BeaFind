import Image from "next/image";
import Link from "next/link";
import {  siteConfig  } from "@/lib/constants";

export function Logo({ size }: { size?: number }) {
  const imgWidth = size ? size * 3 : 200;
  const imgHeight = size ? size * 3 : 80;

  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/logoo.png"
        alt={`${siteConfig.name} Logo`}
        width={imgWidth}
        height={imgHeight}
        className="h-16 w-auto object-contain scale-110 md:h-[72px] md:scale-125 origin-left"
        priority
      />
    </Link>
  );
}

