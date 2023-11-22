import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { HeartFilledIcon } from "@/components/icons";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";

const getUserRole = async (userId: string | undefined) => {
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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  const adminPromise = getUserRole(userId || "").then(
    (role) => role === "ADMIN"
  );
  const isAdmin = await adminPromise;
  console.log("isAdmin", isAdmin);
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <Navbar isAdmin={isAdmin} />
              <Toaster position="top-right" richColors />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  className="flex items-center gap-1 text-current"
                  href="#"
                  title="nextui.org homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-danger">YOU</p>
                  <HeartFilledIcon className="text-danger" />
                </Link>
              </footer>
            </div>
          </Providers>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
