import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(
  req: NextApiRequest, res: NextApiResponse
) {
  const { slug } = req.query;
  const campaign = await prisma.campaign.findUnique({
    where: {
      id: Number(slug),
    },
  });
  console.log(campaign);
  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }
  return NextResponse.json(campaign, { status: 200 });
}
