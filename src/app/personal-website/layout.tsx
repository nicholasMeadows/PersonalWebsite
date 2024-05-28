import type {Metadata} from "next";
import {Inter} from "next/font/google";
import '../css/personal-website-global.css'
import React from "react";
import NavigationBar from "@/app/components/navigation-bar";
import ThemeProvider from "@/app/components/ThemeProvider";

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
        <ThemeProvider>
            <div style={{height: '100vh'}}>
                <NavigationBar/>
                <div className={'content-div'}>
                    {children}
                </div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
