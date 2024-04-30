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
        <body className={inter.className}>


        {/*<Script async src="https://www.googletagmanager.com/gtag/js?id=G-YTLWWK4PC9"></Script>*/}
        {/*<Script id={'google-analytics'}>*/}
        {/*    {`*/}
        {/*    window.dataLayer = window.dataLayer || [];*/}
        {/*    function gtag(){dataLayer.push(arguments);}*/}
        {/*    gtag('js', new Date());*/}

        {/*    gtag('config', 'G-YTLWWK4PC9');*/}
        {/*    `}*/}
        {/*</Script>*/}


        <Script id={'google-tag-manager'}>
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TRX4R5R8');
`}</Script>
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TRX4R5R8"
                    height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>

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
