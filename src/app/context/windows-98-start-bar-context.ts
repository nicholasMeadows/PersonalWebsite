import {createContext, MutableRefObject} from "react";
import {ApplicationWindowModel} from "@/app/components/windows-98/windows-desktop";
import {StartMenuSideSectionState} from "@/app/components/windows-98/start-bar";

interface Windows98StartBarContextData {
    startBarElementRef: MutableRefObject<HTMLDivElement | null>
    applicationWindows: Map<String, ApplicationWindowModel>,
    setIsFocused: (appName: string, isFocused: boolean) => void,
    setIsMinimized: (appName: string, isMinimized: boolean) => void,
    onShutDownClick: () => void,
    startMenuOpen: boolean,
    setStartMenuOpen: (startMenuOpen: boolean) => void
    openMyProjectsPage: () => void,
    openAboutMePage: () => void,
    openIntroPage: () => void,
    openNanoRacksAndRoboticsPage: () => void,
    startMenuSideSection: StartMenuSideSectionState | undefined,
    setStartMenuSideSection: (startMenuSideSection: StartMenuSideSectionState | undefined) => void,
    openWorkExperiencePage: () => void,
    downloadFullstackEngineerResume: () => void,
    isMuted: boolean,
    setIsMuted: (isMuted: boolean) => void
}

const Windows98StartBarContext = createContext<Windows98StartBarContextData>({} as Windows98StartBarContextData);
export default Windows98StartBarContext;