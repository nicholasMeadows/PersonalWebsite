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
            <Script>
                {
                    '<!-- Google Tag Manager -->\n' +
                    '                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n' +
                    '                    new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\n' +
                    '                    j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n' +
                    '                    \'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n' +
                    '                })(window,document,\'script\',\'dataLayer\',\'GTM-KFTG4XHK\');'
                }

            </Script>
        </head>
        <body className={inter.className}>

        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFTG4XHK"
                    height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>

        {/*<GoogleTagManager gtmId='GTM-KFTG4XHK'/>*/}
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
        {/*<GoogleAnalytics gaId="G-GDJW8VGVTY"/>*/}
        </body>
        </html>
    );
}
