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

export async function PUT(req: NextRequest, res: NextResponse) {
  if (req.method === "PUT") {
    const body = await req.json();
    try {
      const updatedCampaign = await prisma.campaign.update({
        where: { id: body.id },
        data: { status: body.status },
      });
      return NextResponse.json(updatedCampaign, { status: 200 });
    } catch (error) {
      console.error("Error updating campaign status:", error);
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
