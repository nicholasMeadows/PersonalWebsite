import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NavigationBar from "@/app/components/navigation-bar";
import {NAVIGATION_BAR_HEIGHT} from "@/app/constants/navigation-bar";

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
        <div style={{height: '100vh'}}>
            <NavigationBar/>
            <div style={{
                marginTop: `${NAVIGATION_BAR_HEIGHT}`,
                height: `calc(100% - ${NAVIGATION_BAR_HEIGHT})`,
                position: 'absolute'
            }}>
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
