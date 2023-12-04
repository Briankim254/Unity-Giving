"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  Chip,
  User,
  Tooltip,
  Dropdown,
  ChipProps,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import useSWR, { mutate } from "swr";
import { FaEye as EyeIcon, FaCheckCircle } from "react-icons/fa";
import { FaCheckCircle as EditIcon } from "react-icons/fa";
import { FaPauseCircle as DeleteIcon } from "react-icons/fa";
import { FaEllipsisV as VerticalDotsIcon } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { IconWrapper } from "./iconWrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { tr } from "date-fns/locale";

interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  [key: string]: string;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  DRAFT: "secondary",
  ACTIVE: "success",
  PAUSED: "warning",
  COMPLETED: "success",
  DELETED: "danger",
};

interface AdminPageProps {
  // Add any props if needed
}

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

export const CampaignsTable: React.FC<AdminPageProps> = () => {
  const [page, setPage] = useState<number>(1);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const { data, error } = useSWR<{ count: number; results: [] }>(
    `${appUrl}/api/admin/campaign?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
      refreshInterval: 1000,
      revalidateIfStale: true,
    }
  );

  const rowsPerPage = 10;
  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState =
    !data && !error
      ? "loading"
      : data?.results.length === 0
      ? "loading"
      : "idle";

  const handleCampaignStatus = async (id: string, status: string) => {
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(loadingPromise, {
      loading: "Updating campaign status...",
      success: async () => {
        const res = await fetch(`${appUrl}/api/admin/campaign`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
            id: id,
          }),
        });

        const data = await res.json();

        return `Campaign status updated to ${data.status}`;
      },
      error: "Error updating campaign status",
    });
    mutate(`${appUrl}/api/admin/campaign?page=${page}`);
  };

  const router = useRouter();

  return (
    <>
      <Table
        aria-label="Example table with client async pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="amount">Amount</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="beneficiary?.firstName">Beneficiary</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.results ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item: { id: string; [key: string]: any; role: string }) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "status" ? (
                    <Chip
                      className="capitalize"
                      color={statusColorMap[item.status]}
                      size="sm"
                      variant="flat"
                    >
                      {item.status}
                    </Chip>
                  ) : columnKey === "beneficiary?.firstName" ? (
                    <User
                      avatarProps={{
                        radius: "lg",
                        src: item.beneficiary?.imageUrl,
                      }}
                      description={item.beneficiary?.email}
                      name={`${item.beneficiary?.firstName} ${item.beneficiary?.lastName}`}
                    >
                      {item.beneficiary?.email}
                    </User>
                  ) : columnKey === "amount" ? (
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "KES",
                    }).format(item.amount)
                  ) : columnKey === "actions" ? (
                    <div className="relative flex justify-end items-center gap-2">
                      <Dropdown backdrop="blur">
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu disabledKeys={[item.status]}>
                          <DropdownItem
                            description="View campaign details"
                            startContent={
                              <IconWrapper className="bg-primary/10 text-primary">
                                <EyeIcon className="text-lg " />
                              </IconWrapper>
                            }
                            onClick={() => router.push("/donate/" + item.id)}
                          >
                            View Campaign
                          </DropdownItem>
                          <DropdownItem
                            key="ACTIVE"
                            description="Update campaign status to approved"
                            startContent={
                              <IconWrapper className="bg-secondary/10 text-secondary">
                                <EditIcon className="text-lg " />
                              </IconWrapper>
                            }
                            onClick={() =>
                              handleCampaignStatus(item.id, "ACTIVE")
                            }
                          >
                            Approve Campaign
                          </DropdownItem>
                          <DropdownItem
                            key="PAUSED"
                            description="Update campaign status to paused"
                            startContent={
                              <IconWrapper className="bg-warning/10 text-warning">
                                <DeleteIcon className="text-lg " />
                              </IconWrapper>
                            }
                            onClick={() =>
                              handleCampaignStatus(item.id, "PAUSED")
                            }
                          >
                            Suspend Campaign
                          </DropdownItem>
                          <DropdownItem
                            key="COMPLETED"
                            description="Update campaign status to completed"
                            startContent={
                              <IconWrapper className="bg-success/10 text-success">
                                <FaCheckCircle className="text-lg " />
                              </IconWrapper>
                            }
                            onClick={() =>
                              handleCampaignStatus(item.id, "COMPLETED")
                            }
                          >
                            Mark as Completed
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  ) : item ? (
                    item[columnKey]
                  ) : (
                    ""
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
