import React, {useCallback, useEffect, useRef, useState} from "react";
import DesktopShortcut from "@/app/components/windows-98/desktop-shortcut";
import Windows98AppWindow from "@/app/components/windows-98/windows-98-app-window";
import Home from "@/app/personal-website/home-page/page";
import AboutMe from "@/app/personal-website/about-me/page";
import Projects from "@/app/personal-website/projects/page";
import WorkExperience from "@/app/personal-website/work-experience/page";
import NanoRacksAndRobotics from "@/app/personal-website/nanoracks-and-robotics/page";
import StartBar from "@/app/components/windows-98/start-bar";
import '../../css/windows-desktop.css'

const INTRO_APPLICATION_NAME = "Nicholas Meadows"
const INTRO_APPLICATION_ICON_URL = "nicholas-picture-1.png"
const ABOUT_ME_APPLICATION_NAME = "About Me";
const ABOUT_ME_APPLICATION_ICON_URL = "about-me-header.png"
const MY_PROJECTS_APPLICATION_NAME = "My Projects"
const MY_PROJECTS_APPLICATION_ICON_URL = "3d-print-ghost-shell/ghost-shell-first-assembly.png"
const WORK_EXPERIENCE_APPLICATION_NAME = "Work Experience";
const WORK_EXPERIENCE_APPLICATION_ICON_URL = "windows-icons/document-0.png";
const NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME = "Nano Racks and Robotics"
const NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL = "FRC Team 4353 2016 Robot.png"

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
    onShutDownClick: () => void
}
export default function WindowsDesktop({onShutDownClick}: Props) {
    const mouseClickSoundEffectAudioRef = useRef<HTMLAudioElement>(null)
    const playMouseClickSoundEffect = useCallback(() => {
        const mouseCLickSoundEffectAudio = mouseClickSoundEffectAudioRef.current;
        if (mouseCLickSoundEffectAudio !== null) {
            mouseCLickSoundEffectAudio.play().catch(() => {
                console.log('failed to play mouse click sound effect');
            })
        }
    }, [])

    const openGithub = useCallback(() => {
        window.open('https://github.com/nicholasMeadows', "_blank")
    }, [])
    const openLinkedin = useCallback(() => {
        window.open('https://www.linkedin.com/in/nicholasmeadows/', "_blank")
    }, [])

    const [applicationWindows, setApplicationWindows] = useState<Map<string, ApplicationWindowModel>>(new Map());

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

    const openIntroPage = useCallback(() => {
        openWindow(INTRO_APPLICATION_NAME, INTRO_APPLICATION_ICON_URL)
        setIsFocused(INTRO_APPLICATION_NAME, true);
    }, [openWindow, setIsFocused])
    const openAboutMePage = useCallback(() => {
        openWindow(ABOUT_ME_APPLICATION_NAME, ABOUT_ME_APPLICATION_ICON_URL)
        setIsFocused(ABOUT_ME_APPLICATION_NAME, true);
    }, [openWindow, setIsFocused]);
    const openMyProjectsPage = useCallback(() => {
        openWindow(MY_PROJECTS_APPLICATION_NAME, MY_PROJECTS_APPLICATION_ICON_URL)
        setIsFocused(MY_PROJECTS_APPLICATION_NAME, true);
    }, [openWindow, setIsFocused]);
    const openWorkExperiencePage = useCallback(() => {
        openWindow(WORK_EXPERIENCE_APPLICATION_NAME, WORK_EXPERIENCE_APPLICATION_ICON_URL)
        setIsFocused(WORK_EXPERIENCE_APPLICATION_NAME, true);
    }, [openWindow, setIsFocused]);

    const openNanoRacksAndRoboticsPage = useCallback(() => {
        openWindow(NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME, NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL)
        setIsFocused(NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME, true);
    }, [openWindow, setIsFocused]);

    useEffect(() => {
        openIntroPage();
    }, []);

    return <div className={'desktop'}>
        <audio src={'mouse-click-sound-effect.mp3'} ref={mouseClickSoundEffectAudioRef}/>
        <div className={'desktop-icons'}>
            <DesktopShortcut iconSrc={INTRO_APPLICATION_ICON_URL} iconTxt={'Intro'} onClick={openIntroPage}/>
            <DesktopShortcut iconSrc={ABOUT_ME_APPLICATION_ICON_URL} iconTxt={'About-Me'}
                             onClick={openAboutMePage}/>
            <a href={"/resume/Fullstack Engineer Resume.pdf"} target={'_blank'} style={{
                color: 'inherit',
                textDecoration: 'inherit'
            }}>
                <DesktopShortcut iconSrc={'windows-icons/document-0.png'}
                                 iconTxt={'Fullstack Developer Resume'}/>
            </a>
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
        <StartBar applicationWindows={applicationWindows} setIsMinimized={setIsMinimized}
                  setIsFocused={setIsFocused} onShutDownClick={onShutDownClick}></StartBar>
    </div>
}