import {useEffect, useState} from "react";

export function useDarkMode() {
    const isDarkMode = (): boolean => {
        const theme = localStorage.getItem('theme');
        if (theme !== undefined) {
            return theme === 'dark';
        }

        if (window && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }
    const [darkMode, setDarkMode] = useState(isDarkMode())

    useEffect(() => {
        const onMutation = (mutations: MutationRecord[], mutationObserver: MutationObserver) => {
            const mutation = mutations.find(mutation => mutation.type === 'attributes');
            if (mutation !== undefined) {
                setDarkMode((mutation.target as HTMLBodyElement).classList.contains('dark'))
            }
        }
        const mutationObserver = new MutationObserver(onMutation);
        mutationObserver.observe(document.body, {attributes: true});
        return () => {
            mutationObserver.disconnect();
        }
    }, []);

    return {
        darkModeOn: darkMode,
        toggleDarkMode: () => {
            const bodyClassList = document.body.classList;
            if (darkMode) {
                localStorage.setItem('theme', 'light');
                if (bodyClassList.contains('dark')) {
                    bodyClassList.remove('dark');
                }
            } else {
                localStorage.setItem('theme', 'dark');
                if (!bodyClassList.contains('dark')) {
                    bodyClassList.add('dark');
                }
            }
        }
    }
}