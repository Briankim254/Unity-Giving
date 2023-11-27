import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PUT(req: NextRequest, res: NextResponse) {
  if (req.method === "PUT") {
    const body = await req.json();
    try {
      const updatedUser = await prisma.user.update({
        where: { id: body.id },
        data: { role: body.role },
      });
      return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
      console.error("Error upgrading user:", error);
      return NextResponse.json(
        { error: "Failed to upgrade user" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
