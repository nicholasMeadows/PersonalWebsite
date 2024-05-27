import {useCallback, useState} from "react";
import {ApplicationWindowModel} from "@/app/components/windows-98/windows-desktop";

export default function useWindows98Windows(playMouseClickSoundEffect: () => void) {
    const [applicationWindows, setApplicationWindows] = useState<Map<string, ApplicationWindowModel>>(new Map());

    const openWindow = useCallback((appName: string, iconUrl: string) => {
        playMouseClickSoundEffect()
        if (applicationWindows.get(appName) !== undefined) {
            return;
        }

        let windowEntityOnTop: [string, ApplicationWindowModel] | undefined;
        Array.from(applicationWindows.entries()).forEach((entity) => {
            if (windowEntityOnTop === undefined || entity[1].zIndex > windowEntityOnTop[1].zIndex) {
                windowEntityOnTop = entity;
            }
        });

        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const size = {
            width: windowWidth / 1.8,
            height: windowHeight / 1.5
        };
        const position = {
            top: windowHeight / 8,
            left: windowWidth / 6
        };

        if (windowEntityOnTop !== undefined) {
            position.top = windowEntityOnTop[1].position.top + 50;
            position.left = windowEntityOnTop[1].position.left + 50;
        }

        const appWindowModel: ApplicationWindowModel = {
            iconUrl: iconUrl,
            appName: appName,
            isOpen: true,
            isFocused: true,
            isMaximized: false,
            isMinimized: false,
            zIndex: windowEntityOnTop === undefined ? 80 : windowEntityOnTop[1].zIndex,
            position: position,
            size: size,
            openedWindowTimestamp: Date.now()
        }
        applicationWindows.set(appName, appWindowModel);
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows, playMouseClickSoundEffect])
    const setSize = useCallback((appName: string, size: { width: number, height: number }) => {
        const windowModel = applicationWindows.get(appName);
        if (windowModel !== undefined) {
            windowModel.size = size;
            setApplicationWindows(new Map(applicationWindows));
        }
    }, [applicationWindows])

    const setPosition = useCallback((appName: string, position: { top: number, left: number }) => {
        const windowModel = applicationWindows.get(appName);
        if (windowModel !== undefined) {
            windowModel.position = position;
            setApplicationWindows(new Map(applicationWindows));
        }
    }, [applicationWindows])

    const closeWindow = useCallback((appName: string) => {
        playMouseClickSoundEffect()
        applicationWindows.delete(appName);
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows, playMouseClickSoundEffect])


    const setIsFocused = useCallback((appName: string, isFocused: boolean) => {
        const applicationWindow = applicationWindows.get(appName);
        if (applicationWindow === undefined) {
            return;
        }
        applicationWindows.forEach((windowModel, key) => {
            if (key === appName) {
                windowModel.isFocused = isFocused;
            } else {
                windowModel.isFocused = false;
            }
        });

        const applicationWindowsArray = Array.from(applicationWindows.entries());
        applicationWindowsArray.sort((first, second) => {
            const firstZIndex = first[1].zIndex;
            const secondZIndex = second[1].zIndex;
            if (firstZIndex > secondZIndex) {
                return 1;
            } else if (firstZIndex < secondZIndex) {
                return -1;
            }
            return 0;
        });

        let zIndex = 80;
        const adjustedZIndexes = applicationWindowsArray.map((entity) => {
            if (entity[1].appName === appName) {
                entity[1].zIndex = 195;
                return entity;
            }
            entity[1].zIndex = zIndex;
            zIndex += 5
            return entity;
        });
        setApplicationWindows(new Map(adjustedZIndexes));
    }, [applicationWindows])

    const setIsMinimized = useCallback((appName: string, isMinimized: boolean) => {
        playMouseClickSoundEffect()
        const applicationWindow = applicationWindows.get(appName);
        if (applicationWindow === undefined) {
            return;
        }
        applicationWindow.isMinimized = isMinimized;
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows, playMouseClickSoundEffect])

    const setIsMaximized = useCallback((appName: string, isMaximized: boolean) => {
        playMouseClickSoundEffect()
        const applicationWindow = applicationWindows.get(appName);
        if (applicationWindow === undefined) {
            return;
        }
        applicationWindow.isMaximized = isMaximized;
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows, playMouseClickSoundEffect])

    return {
        applicationWindows: applicationWindows,
        openWindow: openWindow,
        setSize: setSize,
        setPosition: setPosition,
        closeWindow: closeWindow,
        setIsFocused: setIsFocused,
        setIsMinimized: setIsMinimized,
        setIsMaximized: setIsMaximized
    }
}