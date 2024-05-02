'use client'
import React from 'react';
import Script from "next/script";

function GoogleAnalytics() {
    return <>
        {process.env.GOOGLE_ANALYTICS_ID !== undefined &&
            <>
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YTLWWK4PC9"></Script>
                <Script id={'google-analytics'}>
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${process.env.GOOGLE_ANALYTICS_ID});
            `}
                </Script>
            </>
        }
    </>;
}

export default GoogleAnalytics;