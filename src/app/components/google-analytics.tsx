'use client'
import React from 'react';
import Script from "next/script";

function GoogleAnalytics() {
    return <>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-YTLWWK4PC9"></Script>
        <Script id={'google-analytics'}>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YTLWWK4PC9', { 'debug_mode':true });
            `}
        </Script>
    </>;
}

export default GoogleAnalytics;