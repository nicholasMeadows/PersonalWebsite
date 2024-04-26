import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/app/components/navigation-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Nicholas Meadows",
    description: "Personal Portfolio Website for Nicholas Meadows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <NavigationBar/>
      {children}
      </body>
      </html>
  );
}
