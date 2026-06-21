import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-jwt";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    if (decoded.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const body = await req.json();
    const { title, organization, category, deadline, location, description, requirements, benefits, socialMedia, website, registrationLink } = body;

    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    let existing = await prisma.opportunity.findUnique({ where: { slug } });
    let counter = 1;
    while (existing) {
      slug = `${slug}-${counter}`;
      existing = await prisma.opportunity.findUnique({ where: { slug } });
      counter++;
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        slug,
        organization,
        category,
        deadline,
        location,
        description,
        requirements: requirements.split("\n").filter((r: string) => r.trim() !== ""),
        benefits: benefits.split("\n").filter((b: string) => b.trim() !== ""),
        socialMedia: socialMedia || null,
        website: website || null,
        registrationLink: registrationLink || null,
        authorId: decoded.id,
        status: "APPROVED", // Directly approved because it's from Admin
      },
    });

    return NextResponse.json({ message: "Informasi berhasil ditambahkan langsung!", opportunity }, { status: 201 });
  } catch (error) {
    console.error("Admin add error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}
