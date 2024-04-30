import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./css/globals.css";
import NavigationBar from "@/app/components/navigation-bar";
import {NAVIGATION_BAR_HEIGHT} from "@/app/constants/navigation-bar";
import ThemeProvider from "@/app/components/ThemeProvider";
import {GoogleAnalytics, GoogleTagManager} from "@next/third-parties/google"

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
        <GoogleTagManager gtmId='GTM-KFTG4XHK'/>
        <ThemeProvider>
            <div style={{height: '100vh'}}>
                <NavigationBar/>
                <div style={{
                    marginTop: `${NAVIGATION_BAR_HEIGHT}`,
                    minHeight: `calc(100% - ${NAVIGATION_BAR_HEIGHT})`,
                }} className={'content-div'}>
                    {children}
                </div>
            </div>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-GDJW8VGVTY"/>
        </body>
        </html>
    );
}
