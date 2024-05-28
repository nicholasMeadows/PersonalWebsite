import React, {useCallback, useEffect, useRef, useState} from "react";
import DesktopShortcut from "@/app/components/windows-98/desktop-shortcut";
import Windows98AppWindow from "@/app/components/windows-98/windows-98-app-window";
import Home from "@/app/personal-website/home-page/page";
import AboutMe from "@/app/personal-website/about-me/page";
import Projects from "@/app/personal-website/projects/page";
import WorkExperience from "@/app/personal-website/work-experience/page";
import NanoRacksAndRobotics from "@/app/personal-website/nanoracks-and-robotics/page";
import StartBar, {StartMenuSideSectionState} from "@/app/components/windows-98/start-bar";
import '../../css/windows-desktop.css'
import useWindows98Windows from "@/app/hooks/use-windows-98-windows";

export const INTRO_APPLICATION_NAME = "Nicholas Meadows"
export const INTRO_APPLICATION_ICON_URL = "nicholas-picture-1.png"
export const ABOUT_ME_APPLICATION_NAME = "About Me";
export const ABOUT_ME_APPLICATION_ICON_URL = "about-me-header.png"
export const MY_PROJECTS_APPLICATION_NAME = "My Projects"
export const MY_PROJECTS_APPLICATION_ICON_URL = "3d-print-ghost-shell/ghost-shell-first-assembly.png"
export const WORK_EXPERIENCE_APPLICATION_NAME = "Work Experience";
export const WORK_EXPERIENCE_APPLICATION_ICON_URL = "windows-icons/document-0.png";
export const NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME = "Nano Racks and Robotics"
export const NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL = "FRC Team 4353 2016 Robot.png"

export type ApplicationWindowModel = {
    openedWindowTimestamp: number,
    iconUrl: string,
    appName: string,
    isOpen: boolean,
    isFocused: boolean,
    isMaximized: boolean,
    isMinimized: boolean
    zIndex: number,
    size: { width: number, height: number },
    position: { top: number, left: number }
}
type Props = {
    onShutDownClick: () => void,
    startMenuOpen: boolean, setStartMenuOpen: (startMenuOpen: boolean) => void
}
export default function WindowsDesktop({
                                           onShutDownClick,
                                           startMenuOpen,
                                           setStartMenuOpen
                                       }: Props) {
    const mouseClickSoundEffectAudioRef = useRef<HTMLAudioElement>(null)
    const [startMenuSideSection, setStartMenuSideSection] = useState<StartMenuSideSectionState | undefined>();

    const playMouseClickSoundEffect = useCallback(() => {
        const mouseCLickSoundEffectAudio = mouseClickSoundEffectAudioRef.current;
        if (mouseCLickSoundEffectAudio !== null) {
            mouseCLickSoundEffectAudio.play().catch(() => {
                console.log('failed to play mouse click sound effect');
            })
        }
    }, [])

    const {
        applicationWindows,
        openWindow,
        closeWindow,
        setIsMinimized,
        setPosition,
        setIsFocused,
        setSize,
        setIsMaximized
    } = useWindows98Windows(playMouseClickSoundEffect);

    const openGithub = useCallback(() => {
        window.open('https://github.com/nicholasMeadows', "_blank")
        setStartMenuOpen(false);
        setStartMenuSideSection(undefined);
    }, [setStartMenuOpen])

    const openLinkedin = useCallback(() => {
        window.open('https://www.linkedin.com/in/nicholasmeadows/', "_blank")
        setStartMenuOpen(false);
        setStartMenuSideSection(undefined);
    }, [setStartMenuOpen])

    const openIntroPage = useCallback(() => {
        setStartMenuOpen(false);
        openWindow(INTRO_APPLICATION_NAME, INTRO_APPLICATION_ICON_URL)
        setIsFocused(INTRO_APPLICATION_NAME, true);
        setStartMenuSideSection(undefined);
    }, [openWindow, setIsFocused, setStartMenuOpen])

    const openAboutMePage = useCallback(() => {
        setStartMenuOpen(false);
        openWindow(ABOUT_ME_APPLICATION_NAME, ABOUT_ME_APPLICATION_ICON_URL)
        setIsFocused(ABOUT_ME_APPLICATION_NAME, true);
        setStartMenuSideSection(undefined);
    }, [openWindow, setIsFocused, setStartMenuOpen]);

    const downloadFile = useCallback((path: string, name: string) => {
        const aElement = document.createElement('a');
        aElement.setAttribute('download', name);
        aElement.href = path;
        aElement.setAttribute('target', '_blank');
        aElement.click();
    }, [])

    const downloadFullstackEngineerResume = useCallback(() => {
        downloadFile('/resume/Fullstack Engineer Resume.pdf', 'Fullstack Engineer Resume.pdf');
        setStartMenuOpen(false);
        setStartMenuSideSection(undefined);
    }, [downloadFile, setStartMenuOpen]);

    const openMyProjectsPage = useCallback(() => {
        setStartMenuOpen(false);
        openWindow(MY_PROJECTS_APPLICATION_NAME, MY_PROJECTS_APPLICATION_ICON_URL)
        setIsFocused(MY_PROJECTS_APPLICATION_NAME, true);
        setStartMenuSideSection(undefined);
    }, [openWindow, setIsFocused, setStartMenuOpen]);

    const openWorkExperiencePage = useCallback(() => {
        setStartMenuOpen(false);
        openWindow(WORK_EXPERIENCE_APPLICATION_NAME, WORK_EXPERIENCE_APPLICATION_ICON_URL)
        setIsFocused(WORK_EXPERIENCE_APPLICATION_NAME, true);
        setStartMenuSideSection(undefined);
    }, [openWindow, setIsFocused, setStartMenuOpen]);

    const openNanoRacksAndRoboticsPage = useCallback(() => {
        setStartMenuOpen(false);
        openWindow(NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME, NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL)
        setIsFocused(NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME, true);
        setStartMenuSideSection(undefined);
    }, [openWindow, setIsFocused, setStartMenuOpen]);

    useEffect(() => {
        openIntroPage();
    }, []);

    const startBarElementRef = useRef<HTMLDivElement>(null)
    return <div className={'desktop'} onMouseDown={(event) => {
        const startBarElement = startBarElementRef.current;
        console.log(startBarElement)
        if (startBarElement === null) {
            return;
        }
        if (!startBarElement.contains(event.target as HTMLElement)) {
            setStartMenuOpen(false)
            setStartMenuSideSection(undefined)
        }
    }}>
        <audio src={'mouse-click-sound-effect.mp3'} ref={mouseClickSoundEffectAudioRef}/>
        <div className={'desktop-icons'}>
            <DesktopShortcut iconSrc={INTRO_APPLICATION_ICON_URL} iconTxt={'Intro'} onClick={openIntroPage}/>
            <DesktopShortcut iconSrc={ABOUT_ME_APPLICATION_ICON_URL} iconTxt={'About-Me'}
                             onClick={openAboutMePage}/>
            <DesktopShortcut iconSrc={'windows-icons/document-0.png'}
                             iconTxt={'Fullstack Developer Resume'}
                             onClick={downloadFullstackEngineerResume}/>
            <DesktopShortcut iconSrc={WORK_EXPERIENCE_APPLICATION_ICON_URL} iconTxt={'Work Experience'}
                             onClick={openWorkExperiencePage}/>
            <DesktopShortcut iconSrc={NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL}
                             iconTxt={'Nano Racks and Robotics'} onClick={openNanoRacksAndRoboticsPage}/>
            <DesktopShortcut iconSrc={MY_PROJECTS_APPLICATION_ICON_URL} iconTxt={'Projects'}
                             onClick={openMyProjectsPage}/>
            <DesktopShortcut iconSrc={'github-logo-dark.png'} iconTxt={'Github'} onClick={openGithub}/>
            <DesktopShortcut iconSrc={'linkedin-logo.png'} iconTxt={'Linkedin'} onClick={openLinkedin}/>
        </div>

        {applicationWindows.get(INTRO_APPLICATION_NAME) !== undefined &&
            // @ts-ignore
            <Windows98AppWindow appWindowModel={applicationWindows.get(INTRO_APPLICATION_NAME)}
                                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                                setIsMaximized={setIsMaximized} closeWindow={closeWindow}
                                setPosition={setPosition} setSize={setSize}>
                <Home/>
            </Windows98AppWindow>
        }

        {applicationWindows.get(ABOUT_ME_APPLICATION_NAME) !== undefined &&
            // @ts-ignore
            <Windows98AppWindow appWindowModel={applicationWindows.get(ABOUT_ME_APPLICATION_NAME)}
                                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                                setIsMaximized={setIsMaximized} closeWindow={closeWindow}
                                setPosition={setPosition} setSize={setSize}>
                <AboutMe/>
            </Windows98AppWindow>
        }
        {applicationWindows.get(MY_PROJECTS_APPLICATION_NAME) !== undefined &&
            // @ts-ignore
            <Windows98AppWindow appWindowModel={applicationWindows.get(MY_PROJECTS_APPLICATION_NAME)}
                                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                                setIsMaximized={setIsMaximized} closeWindow={closeWindow}
                                setPosition={setPosition} setSize={setSize}>
                <Projects/>
            </Windows98AppWindow>
        }

        {applicationWindows.get(WORK_EXPERIENCE_APPLICATION_NAME) !== undefined &&
            // @ts-ignore
            <Windows98AppWindow appWindowModel={applicationWindows.get(WORK_EXPERIENCE_APPLICATION_NAME)}
                                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                                setIsMaximized={setIsMaximized} closeWindow={closeWindow}
                                setPosition={setPosition} setSize={setSize}>
                <WorkExperience/>
            </Windows98AppWindow>
        }

        {applicationWindows.get(NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME) !== undefined &&

            <Windows98AppWindow
                // @ts-ignore
                appWindowModel={applicationWindows.get(NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME)}
                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                setIsMaximized={setIsMaximized} closeWindow={closeWindow}
                setPosition={setPosition} setSize={setSize}>
                <NanoRacksAndRobotics/>
            </Windows98AppWindow>
        }
        <StartBar startBarElementRef={startBarElementRef} applicationWindows={applicationWindows}
                  setIsMinimized={setIsMinimized}
                  setIsFocused={setIsFocused} onShutDownClick={onShutDownClick}
                  startMenuOpen={startMenuOpen} setStartMenuOpen={(isOpen: boolean) => {
            playMouseClickSoundEffect();
            setStartMenuOpen(isOpen)
        }}
                  openNanoRacksAndRoboticsPage={openNanoRacksAndRoboticsPage} openIntroPage={openIntroPage}
                  openAboutMePage={openAboutMePage} openMyProjectsPage={openMyProjectsPage}
                  startMenuSideSection={startMenuSideSection}
                  setStartMenuSideSection={setStartMenuSideSection}
                  openWorkExperiencePage={openWorkExperiencePage}
                  downloadFullstackEngineerResume={downloadFullstackEngineerResume}></StartBar>
    </div>
}