import { cn } from "@/lib/utils.lib";
import "@/styles/globals.css";
import { Pixelify_Sans } from "next/font/google";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          pixelifySans.className,
          "relative h-dvh antialiased bg-screen flex flex-col"
        )}
      >
        {children}
      </body>
    </html>
  );
}
