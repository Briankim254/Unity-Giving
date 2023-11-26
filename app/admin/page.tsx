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
  Dropdown,
  ChipProps,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import useSWR from "swr";
import { title } from "@/components/primitives";
import { FaEye as EyeIcon } from "react-icons/fa";
import { FaUserPlus as EditIcon } from "react-icons/fa";
import { FaTrashAlt as DeleteIcon } from "react-icons/fa";
import { FaEllipsisV as VerticalDotsIcon } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { IconWrapper } from "./iconWrapper";
interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  [key: string]: string;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  ADMIN: "success",
  USER: "secondary",
};

interface AdminPageProps {
  // Add any props if needed
}

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

const AdminPage: React.FC<AdminPageProps> = () => {
  const [page, setPage] = useState<number>(1);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const { data, error } = useSWR<{ count: number; results: [] }>(
    `${appUrl}/api/users?page=${page}`,
    fetcher,
    {
      keepPreviousData: true,
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

  return (
    <>
      <div className="pb-8">
        <h1 className={title()}>Admin Dash.</h1>
      </div>
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
          <TableColumn key="firstName">FirstName</TableColumn>
          <TableColumn key="lastName">LastName</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="role">role</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.results ?? []}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item: { id: string; [key: string]: any }) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "actions" ? (
                    <div className="relative flex justify-end items-center gap-2">
                      <Dropdown backdrop="blur">
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            description="Create a new file"
                            startContent={
                              <IconWrapper className="bg-success/10 text-success">
                                <EyeIcon className="text-lg " />
                              </IconWrapper>
                            }
                          >
                            View
                          </DropdownItem>
                          <DropdownItem
                            description="Upgrade this user to Admin"
                            startContent={
                              <IconWrapper className="bg-secondary/10 text-secondary">
                                <EditIcon className="text-lg " />
                              </IconWrapper>
                            }
                          >
                            Ugrade
                          </DropdownItem>
                          <DropdownItem
                            description="Delete this user "
                            startContent={
                              <IconWrapper className="bg-danger/10 text-danger">
                                <DeleteIcon className="text-lg " />
                              </IconWrapper>
                            }
                          >
                            Delete
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

export default AdminPage;
