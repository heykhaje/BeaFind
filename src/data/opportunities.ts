import { prisma } from "@/lib/prisma";

export async function getOpportunitiesByCategory(category: string) {
  return prisma.opportunity.findMany({
    where: { category, status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getFeaturedOpportunities() {
  return prisma.opportunity.findMany({
    where: { featured: true, status: "APPROVED" },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOpportunityBySlug(slug: string) {
  return prisma.opportunity.findUnique({
    where: { slug },
  });
}

export async function getLombaSlugs() {
  const lombas = await prisma.opportunity.findMany({
    where: { category: "lomba", status: "APPROVED" },
    select: { slug: true },
  });
  return lombas;
}


