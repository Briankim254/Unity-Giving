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
  Tooltip,
  User,
  Dropdown,
  ChipProps,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import useSWR, { mutate } from "swr";
import { FaEye as EyeIcon } from "react-icons/fa";
import { FaUserPlus as EditIcon } from "react-icons/fa";
import { FaTrashAlt as DeleteIcon } from "react-icons/fa";
import { FaEllipsisV as VerticalDotsIcon } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { IconWrapper } from "./iconWrapper";
import { toast } from "sonner";

interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  [key: string]: string;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  Deleted: "warning",
};
const roleColorMap: Record<string, ChipProps["color"]> = {
  ADMIN: "success",
  USER: "warning",
};
interface AdminPageProps {
  // Add any props if needed
}

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

export const UserTable: React.FC<AdminPageProps> = () => {
  const [page, setPage] = useState<number>(1);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const { data, error } = useSWR<{ count: number; results: [] }>(
    `${appUrl}/api/users?page=${page}`,
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

  const handleUpgradeUser = async (id: string, role: string) => {
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    toast.promise(loadingPromise, {
      loading: `Updating user to ${
        role === "ADMIN" ? "user" : "admin"
      }  role...`,
      success: async () => {
        const res = await fetch(`${appUrl}/api/user/role`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: role === "ADMIN" ? "USER" : "ADMIN",
            id: id,
          }),
        });
        const data = await res.json();
        return `User ${data.firstName} ${data.lastName} is now ${data.role}!`;
      },
      error: `Failed to update user role!`,
    });
    mutate(`${appUrl}/api/users?page=${page}`);
  };

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
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="role">Role</TableColumn>
          <TableColumn key="status">Status</TableColumn>
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
                  {columnKey === "role" ? (
                    <Chip
                      className="capitalize"
                      color={roleColorMap[item.role]}
                      size="sm"
                      variant="flat"
                    >
                      {item.role}
                    </Chip>
                  ) : columnKey === "status" ? (
                    <Chip
                      className="capitalize border-none gap-1 text-default-600"
                      color={statusColorMap["active"]}
                      size="sm"
                      variant="dot"
                    >
                      Active
                    </Chip>
                  ) : columnKey === "name" ? (
                    <User
                      avatarProps={{
                        radius: "lg",
                        src: item.imageUrl,
                      }}
                      description={item.email}
                      name={`${item.firstName} ${item.lastName}`}
                    >
                      {item.email}
                    </User>
                  ) : columnKey === "actions" ? (
                    <div className="relative flex justify-end items-center gap-2">
                      <Dropdown backdrop="blur">
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            key={item.id}
                            description="View this user"
                            startContent={
                              <IconWrapper className="bg-success/10 text-success">
                                <EyeIcon className="text-lg " />
                              </IconWrapper>
                            }
                            onClick={() => toast("This function is not ready!")}
                          >
                            View User
                          </DropdownItem>
                          <DropdownItem
                            key={item.id}
                            description="Update users role between admin and user"
                            startContent={
                              <IconWrapper className="bg-secondary/10 text-secondary">
                                <EditIcon className="text-lg " />
                              </IconWrapper>
                            }
                            onClick={() =>
                              handleUpgradeUser(item.id, item.role)
                            }
                          >
                            Toggle Admin
                          </DropdownItem>
                          <DropdownItem
                            key={item.id}
                            description="Update user status to suspended"
                            startContent={
                              <IconWrapper className="bg-danger/10 text-danger">
                                <DeleteIcon className="text-lg " />
                              </IconWrapper>
                            }
                            onClick={() => toast("This function is not ready!")}
                          >
                            Suspend User
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
