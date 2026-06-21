import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-jwt";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Harap login terlebih dahulu." }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    
    const body = await req.json();
    const { title, organization, category, deadline, location, description, requirements, benefits, socialMedia, website, registrationLink } = body;

    // Generate slug from title
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    // Ensure slug is unique
    const existing = await prisma.opportunity.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        slug,
        title,
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
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Pengajuan berhasil dikirim dan menunggu persetujuan Admin.", opportunity }, { status: 201 });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}
