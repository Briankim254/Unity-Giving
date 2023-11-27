import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

const CreateCampaignschema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(1000),
  amount: z.number().min(1),
  deadline: z.string().transform((str) => new Date(str)),
  status: z
    .enum(["DRAFT", "PAUSED", "COMPLETE", "ACTIVE", "DELETED"])
    .default("DRAFT"),
  userId: z.string(),
  phone: z.string().min(3).max(255),
});

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const validation = CreateCampaignschema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  // const newCampaign = await prisma.campaign.create({
  //   data: {
  //     title: body.title,
  //     description: body.description,
  //     amount: body.amount,
  //     start_date: new Date(),
  //     end_date: body.deadline,
  //     status: body.status,
  //     user_id : body.userId,
  //   },
  // });
  const newCampaign = await prisma.campaign.create({
    data: {
      title: body.title,
      description: body.description,
      amount: body.amount,
      phone: body.phone,
      start_date: new Date(),
      end_date: body.deadline,
      beneficiary: {
        connect: { id: body.userId },
      },
    },
  });

  return NextResponse.json(newCampaign, { status: 201 });
}

export async function GET(req: NextRequest, res: Response) {
  const campaigns = await prisma.campaign.findMany({
    include: {
      beneficiary: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(campaigns, { status: 200 });
}

export async function PUT(req: NextRequest, res: Response) {
  const body = await req.json();
  const validation = CreateCampaignschema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const updatedCampaign = await prisma.campaign.update({
    where: {
      id: Number(body.id),
    },
    data: {
      title: body.title,
      description: body.description,
      amount: body.amount,
      start_date: new Date(),
      end_date: body.deadline,
      status: body.status,
    },
  });

  return NextResponse.json(updatedCampaign, { status: 200 });
}
