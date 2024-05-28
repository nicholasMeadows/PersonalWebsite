import type {Metadata} from "next";
import {Inter} from "next/font/google";
import GoogleAnalytics from "@/app/components/google-analytics";
import React from "react";
import {GoogleTagManager} from "@next/third-parties/google"

const inter = Inter({subsets: ["latin"]});

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
        <GoogleAnalytics/>
        {children}
        {process.env.GOOGLE_TAG_MANAGER_ID !== undefined &&
            <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID}/>
        }
        </body>
        </html>
    );
}
