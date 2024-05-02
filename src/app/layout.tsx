import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./css/globals.css";
import NavigationBar from "@/app/components/navigation-bar";
import ThemeProvider from "@/app/components/ThemeProvider";
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

        <ThemeProvider>
            <div style={{height: '100vh'}}>
                <NavigationBar/>
                <div className={'content-div'}>
                    {children}
                </div>
            </div>
        </ThemeProvider>
        {process.env.GOOGLE_TAG_MANAGER_ID !== undefined &&
            <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID}/>
        }
        </body>
        </html>
    );
}
