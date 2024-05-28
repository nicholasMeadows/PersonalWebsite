import {createContext} from "react";
import {ApplicationWindowModel} from "@/app/components/windows-98/windows-desktop";

export interface Windows98AppWindowContextDate {
    appWindowModel: ApplicationWindowModel,
    setIsFocused: (appName: string, isFocused: boolean) => void,
    setIsMaximized: (appName: string, isMaximized: boolean) => void,
    setIsMinimized: (appName: string, isMinimized: boolean) => void,
    closeWindow: (appName: string) => void,
    setPosition: (appName: string, position: { top: number, left: number }) => void
    setSize: (appName: string, size: { width: number, height: number }) => void
}

const Windows98AppWindowContext = createContext<Windows98AppWindowContextDate>({} as Windows98AppWindowContextDate)
export default Windows98AppWindowContext;