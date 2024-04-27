'use client'
import React, {useEffect} from 'react';


function ThemeProvider({
                           children,
                       }: Readonly<{
    children: React.ReactNode;
}>) {
    useEffect(() => {
        const bodyClassList = document.body.classList;
        const theme = localStorage.getItem('theme');
        if (theme !== undefined) {
            if (theme === 'dark' && !bodyClassList.contains('dark')) {
                bodyClassList.add('dark');
            } else if (theme === 'light' && bodyClassList.contains('dark')) {
                bodyClassList.remove('dark')
            }
        } else if (window && window.matchMedia) {
            const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (preferDark && !bodyClassList.contains('dark')) {
                bodyClassList.add('dark');
            } else if (!preferDark && bodyClassList.contains('dark')) {
                bodyClassList.remove('dark');
            }
        }
    }, []);
    return <>{children}</>
}

export default ThemeProvider;