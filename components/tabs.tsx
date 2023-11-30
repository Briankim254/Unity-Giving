"use client";
import { Tabs, Tab } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
} from "@nextui-org/react";
import { BsFillPatchCheckFill, BsStars } from "react-icons/bs";
import { IoIosTrendingUp } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
export interface campaignProps {
  id: number;
  title: string;
  description: string;
  status: string;
  amount: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user_id: string;
  beneficiary: beneficiaryProps;
  firstName: string;
  lastName: string;
}

export interface beneficiaryProps {
  firstName: string;
  lastName: string;
}

export const TabBar = ({ campaigns }: { campaigns: campaignProps[] }) => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col ">
      <Tabs aria-label="Options" size="lg" color="secondary" fullWidth>
        <Tab key="Featured" title={
            <div className="flex items-center space-x-2">
              <BsStars size={30}/>
              <span>Featured</span>
            </div>
          }>
          <Suspense fallback={<div>Loading...</div>}>
            <section>
              <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {campaigns.map((campaign) => (
                    <Card
                      key={campaign.id}
                      isHoverable
                      isPressable
                      isFooterBlurred
                      onPress={() => {
                        router.push("/donate/" + campaign.id);
                      }}
                    >
                      <CardHeader>
                        <h4> {campaign.beneficiary.firstName} {campaign.beneficiary.lastName}</h4>
                        <span className="px-2">
                          <BsFillPatchCheckFill className="text-secondary" />
                        </span>
                      </CardHeader>
                      <CardBody>
                        <p>{campaign.title}</p>
                      </CardBody>
                      <CardFooter>
                        <Progress
                          label="Raised"
                          size="md"
                          value={100}
                          maxValue={campaign.amount}
                          color={
                            campaign.amount > campaign.amount / 2
                              ? "success"
                              : "danger"
                          }
                          formatOptions={{ style: "currency", currency: "Kes" }}
                          showValueLabel={true}
                          className="max-w-md"
                        />
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </Suspense>
        </Tab>
        <Tab key="Trending" title={
            <div className="flex items-center space-x-2">
              <IoIosTrendingUp size={30}/>
              <span>Trending</span>
            </div>
          }>
          <section>
            <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {campaigns.map((campaign) => (
                    <Card
                      key={campaign.id}
                      isHoverable
                      isPressable
                      isFooterBlurred
                      onPress={() => {
                        router.push("/donate/" + campaign.id);
                      }}
                    >
                      <CardHeader>
                        <h4> {campaign.beneficiary.firstName} {campaign.beneficiary.lastName}</h4>
                        <span className="px-2">
                          <BsFillPatchCheckFill className="text-secondary" />
                        </span>
                      </CardHeader>
                      <CardBody>
                        <p>{campaign.title}</p>
                      </CardBody>
                      <CardFooter>
                        <Progress
                          label="Raised"
                          size="md"
                          value={100}
                          maxValue={campaign.amount}
                          color={
                            campaign.amount > campaign.amount / 2
                              ? "success"
                              : "danger"
                          }
                          formatOptions={{ style: "currency", currency: "Kes" }}
                          showValueLabel={true}
                          className="max-w-md"
                        />
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          </section>
        </Tab>
      </Tabs>
    </div>
  );
};
