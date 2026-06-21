import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-jwt";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const { searchParams } = new URL(req.url);
    const opportunityId = searchParams.get("opportunityId");

    if (!token || !opportunityId) {
      return NextResponse.json({ isSaved: false }, { status: 200 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const saved = await prisma.savedOpportunity.findUnique({
      where: {
        userId_opportunityId: {
          userId: decoded.id,
          opportunityId,
        },
      },
    });

    return NextResponse.json({ isSaved: !!saved }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ isSaved: false }, { status: 200 });
  }
}
