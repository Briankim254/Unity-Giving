import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest, res: Response) {
  const page = req.nextUrl.searchParams.get("page") || "1";
  // const pageSize = req.nextUrl.searchParams.get('pageSize') || '10';
  const pageSize = 10;

  const offset = (Number(page) - 1) * Number(pageSize);

  const campaigns = await prisma.campaign.findMany({
    skip: offset,
    take: Number(pageSize),
    include: {
      beneficiary: true,
    },
  });
  const count = await prisma.campaign.count();
  const responseData = {
    count,
    results: campaigns,
  };

  return NextResponse.json(responseData, { status: 200 });
}
