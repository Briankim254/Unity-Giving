"use client";

import {
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { toast } from "sonner";

type CampaignDetailsProps = {
  title: string;
  description: string | undefined;
  amount: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
};

export const CampaignDetails = ({
  firstName,
  lastName,
  imageUrl,
  title,
  description,
  amount,
}: CampaignDetailsProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <section>
        <div className="flex flex-col items-center px-5 py-8 mx-auto lg:px-24">
          <div>
            <div className="flex flex-wrap py-8 md:flex-nowrap">
              <div className="flex flex-col  px-4 mb-6 md:w-64 md:mb-0 sm:w-screen">
                <strong className="flex text-3xl font-thin leading-none text-left text-thin lg:text-4xl">
                  {" "}
                  {amount}
                  <span className="text-sm">Kes </span>
                </strong>
                <span className="mt-1 text-xs font-normal leading-relaxed ">
                  {title}
                </span>
                <div className="flex items-center mt-6 text-sm font-medium leading-none text-left text-gray-500">
                  <span className="ml-2"> 2 days ago </span>
                </div>
                <div className="flex  mt-6 text-sm font-medium leading-none text-left">
                  <User
                    name={firstName + " " + lastName}
                    description="Nairobi, Kenya"
                    avatarProps={{
                      src: imageUrl,
                    }}
                  />
                </div>
                <div className="flex  mt-6 ">
                  <Button onPress={onOpen} color="secondary">
                    <FaHandHoldingHeart size={20} />
                    Donate Now
                  </Button>
                </div>
              </div>
              <div className="prose md:flex-grow prose-md space-y-4">
                <p
                  className="first-letter:text-7xl first-letter:font-bold
  first-letter:mr-3 first-letter:float-left"
                >
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="auto"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=""></ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Phone"
                  placeholder="Enter your phone number"
                  type="phone"
                  variant="bordered"
                />
                <Input
                  label="Ammout"
                  placeholder="Enter the ammount you wish to donate in KES"
                  type="number"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <p className="text-xs text-gray-500">
                    By clicking Donate, you agree to our Terms and that you have
                    read our Data Use Policy, including our Cookie Use.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  onPress={onClose}
                  onClick={() =>
                    toast.success("Thank you! Donation Request has Been Sent.")
                  }
                >
                  Send Donation Request
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
