import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";

export const getUserRole = async (userId: string | undefined) => {
  if (!userId) {
    return null;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user?.role || null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
};

const { userId } = auth();

export const isAdmin = async () => {
  const role = await getUserRole(userId || "");
  return role === "ADMIN";
};
