import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./css/globals.css";
import NavigationBar from "@/app/components/navigation-bar";
import {NAVIGATION_BAR_HEIGHT} from "@/app/constants/navigation-bar";
import ThemeProvider from "@/app/components/ThemeProvider";
import Script from "next/script";

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
        <head>
            <Script async src={"https://www.googletagmanager.com/gtag/js?id=G-GDJW8VGVTY"}/>
            <Script id="google-analytics">
                {`
               window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GDJW8VGVTY');
          `}
            </Script>
        </head>
        <body className={inter.className}>
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
        </body>
        </html>
    );
}
