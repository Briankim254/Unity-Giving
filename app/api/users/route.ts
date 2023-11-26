import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest, res: Response) {
  const page = req.nextUrl.searchParams.get("page") || "1";
  // const pageSize = req.nextUrl.searchParams.get('pageSize') || '10';
  const pageSize = 10;

  const offset = (Number(page) - 1) * Number(pageSize);

  const users = await prisma.user.findMany({
    skip: offset,
    take: Number(pageSize),
  });

  const count = await prisma.user.count();
  const responseData = {
    count,
    results: users,
  };

  return NextResponse.json(responseData, { status: 200 });
}
