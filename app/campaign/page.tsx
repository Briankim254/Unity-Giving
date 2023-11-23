"use client";

import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller, set } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";

enum CurrencyEnum {
  KES = "KES",
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

// type Inputs = {
//   title: string;
//   currency: CurrencyEnum;
//   deadline: Date;
//   phone: string;
//   amount: number;
//   description: string;
// };

const schema = z.object({
  title: z.string().min(3).max(100),
  currency: z.nativeEnum(CurrencyEnum),
  deadline: z.date(),
  phone: z.string().min(10).max(13),
  amount: z.number().min(1),
  description: z.string().min(10).max(1000),
  userId: z.string(),
});

type CampaignProps = z.infer<typeof schema>;

function Campaign() {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignProps>();
  const onSubmit: SubmitHandler<CampaignProps> = async (data) => {
    data.deadline = new Date(data.deadline);
    data.amount = Number(data.amount);
    data.userId = user?.id || "";
    await axios
      .post("/api/campaigns", data)
      .then((res) => {
        toast.info("You will be redirected back shortly.");
        setTimeout(() => {
          toast.success(
            "Congragulations, campaign has been created succesfully."
          );
        }, 2000);

        console.log("campaign created. Response:" + res);
        router.push("/");
      })
      .catch((err) => {
        toast.error("An error occured while creating your campaign.");
        console.log("error creating campaign. Error:" + err);
      });
  };

  const currencyOptions = Object.keys(CurrencyEnum).map((key) => {
    return {
      label: CurrencyEnum[key as keyof typeof CurrencyEnum],
      value: CurrencyEnum[key as keyof typeof CurrencyEnum],
    };
  });

  return (
    <>
      <h1 className="text-3xl font-bold  ">Create Campaign</h1>
      <p className="text-default-500 pb-4">
        Create a campaign to raise funds for your cause.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 ">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <Input
              label="Campaign Title"
              isRequired
              placeholder="Enter your campaign title here..."
              {...register("title", { required: true })}
            />
            <Input
              label="Amount"
              isRequired
              placeholder="0.00"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">$</span>
                </div>
              }
              {...register("amount", { required: true })}
            />
            <Select label="Currency" isRequired {...register("currency")}>
              {currencyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>{" "}
            <Input
              label="Phone"
              isRequired
              placeholder="Enter your phone number here..."
              {...register("phone", { required: true })}
            />
            <Input
              label="Deadline"
              type="date"
              isRequired
              placeholder="nextui.org"
              {...register("deadline", { required: true })}
            />
          </div>
          <Textarea
            label="Description"
            isRequired
            placeholder="Enter your campaign description here..."
            {...register("description", { required: true })}
          />
          <div className="flex justify-center">
            <Button
              color="primary"
              type="submit"
              startContent={<FaPaperPlane />}
              className="w-fit bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Campaign;
