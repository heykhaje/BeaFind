import type { Metadata } from "next";
import { PageTransition } from "@/components/ui/PageTransition";
import { HelpCentreContent } from "@/components/help/HelpCentreContent";

export const metadata: Metadata = {
  title: "Help Centre",
  description: "Pusat bantuan UniPath untuk pertanyaan seputar beasiswa, magang, dan lomba.",
};

export default function HelpCentrePage() {
  return (
    <PageTransition className="mx-auto max-w-[1280px] px-4 py-12 md:px-8">
      <HelpCentreContent />
    </PageTransition>
  );
}

