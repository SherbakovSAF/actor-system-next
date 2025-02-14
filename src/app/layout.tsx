import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils.lib";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(pixelifySans.className, "antialiased h-dvh bg-screen")}
      >
        {children}
      </body>
    </html>
  );
}
