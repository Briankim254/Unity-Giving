"use client";
import { Tabs, Tab } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
} from "@nextui-org/react";
import { BsFillPatchCheckFill } from "react-icons/bs";
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
}

export const TabBar = ({ campaigns }: { campaigns: campaignProps[] }) => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col ">
      <Tabs aria-label="Options" size="lg" color="secondary" fullWidth>
        <Tab key="Featured" title="Featured">
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
                        <h4>Nawaf El Azam</h4>
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
        <Tab key="Trending" title="Trending">
          <section>
            <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card
                  isHoverable
                  isPressable
                  isFooterBlurred
                  onPress={() => {
                    window.location.href = "/details";
                  }}
                >
                  <CardHeader>
                    <h4>Kimutai brian</h4>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptates.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Progress
                      label="Raised"
                      size="md"
                      value={4000}
                      maxValue={10000}
                      color="warning"
                      formatOptions={{ style: "currency", currency: "Kes" }}
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </CardFooter>
                </Card>
                <Card
                  isHoverable
                  isPressable
                  isFooterBlurred
                  onPress={() => {
                    window.location.href = "/details";
                  }}
                >
                  <CardHeader>
                    <h4>Kimutai brian</h4>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptates.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Progress
                      label="Raised"
                      size="md"
                      value={4000}
                      maxValue={10000}
                      color="warning"
                      formatOptions={{ style: "currency", currency: "Kes" }}
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </CardFooter>
                </Card>
                <Card
                  isHoverable
                  isPressable
                  isFooterBlurred
                  onPress={() => {
                    window.location.href = "/details";
                  }}
                >
                  <CardHeader>
                    <h4>Kimutai brian</h4>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptates.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Progress
                      label="Raised"
                      size="md"
                      value={4000}
                      maxValue={10000}
                      color="warning"
                      formatOptions={{ style: "currency", currency: "Kes" }}
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </CardFooter>
                </Card>
                <Card
                  isHoverable
                  isPressable
                  isFooterBlurred
                  onPress={() => {
                    window.location.href = "/details";
                  }}
                >
                  <CardHeader>
                    <h4>Kimutai brian</h4>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptates.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Progress
                      label="Raised"
                      size="md"
                      value={4000}
                      maxValue={10000}
                      color="warning"
                      formatOptions={{ style: "currency", currency: "Kes" }}
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </CardFooter>
                </Card>
                <Card
                  isHoverable
                  isPressable
                  isFooterBlurred
                  onPress={() => {
                    window.location.href = "/details";
                  }}
                >
                  <CardHeader>
                    <h4>Kimutai brian</h4>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptates.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Progress
                      label="Raised"
                      size="md"
                      value={4000}
                      maxValue={10000}
                      color="warning"
                      formatOptions={{ style: "currency", currency: "Kes" }}
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </CardFooter>
                </Card>
                <Card
                  isHoverable
                  isPressable
                  isFooterBlurred
                  onPress={() => {
                    window.location.href = "/details";
                  }}
                >
                  <CardHeader>
                    <h4>Kimutai brian</h4>
                  </CardHeader>
                  <CardBody>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptates.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Progress
                      label="Raised"
                      size="md"
                      value={4000}
                      maxValue={10000}
                      color="warning"
                      formatOptions={{ style: "currency", currency: "Kes" }}
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        </Tab>
      </Tabs>
    </div>
  );
};
