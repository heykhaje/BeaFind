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

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = await req.json();
    const { opportunityId } = body;

    const saved = await prisma.savedOpportunity.create({
      data: {
        userId: decoded.id,
        opportunityId,
      },
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const body = await req.json();
    const { opportunityId } = body;

    await prisma.savedOpportunity.delete({
      where: {
        userId_opportunityId: {
          userId: decoded.id,
          opportunityId,
        },
      },
    });

    return NextResponse.json({ message: "Dihapus dari tersimpan" }, { status: 200 });
  } catch (error) {
    console.error("Unsave error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const saved = await prisma.savedOpportunity.findMany({
      where: { userId: decoded.id },
      include: { opportunity: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(saved, { status: 200 });
  } catch (error) {
    console.error("Get saved error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan." }, { status: 500 });
  }
}
