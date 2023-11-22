import { CampaignDetails } from "@/components/campainDetails";
import prisma from "@/prisma/client";
import { clerkClient } from "@clerk/nextjs";

const getData = async (params: string) => {
  const campaign = await prisma.campaign
    .findUnique({
      where: {
        id: Number(params),
      },
      include:{
        beneficiary:true
      }
    })
    .catch((e) => {
      throw e;
    });
  if (!campaign) {
    throw new Error("Campaign not found");
  }
  return campaign;
};

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);
  const userId = data.user_id || "";
  const user = await clerkClient.users.getUser(userId) 
  const { firstName, lastName, imageUrl } = user
  return (
    <>
      {data && (
        <CampaignDetails
          firstName={firstName ? firstName : ""}
          lastName={lastName ? lastName : ""}
          imageUrl={imageUrl ? imageUrl : ""}
          title={data.title ? data.title : " No title provided"}
          description={
            data.description ? data.description : " No description provided"
          }
          amount={data.amount ? data.amount : 0}
        />
      )}
    </>
  );
}
