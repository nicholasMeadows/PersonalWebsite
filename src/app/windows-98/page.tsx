"use client"
import StartBar from "@/app/components/start-bar";
import React, {useCallback, useState} from "react";
import DesktopShortcut from "@/app/components/desktop-shortcut"
import '../css/windows-98.css'
import Windows98AppWindow from "@/app/components/windows-98-app-window";
import WorkExperience from "@/app/personal-website/work-experience/page";
import AboutMe from "@/app/personal-website/about-me/page";
import Projects from "@/app/personal-website/projects/page";

export type ApplicationWindowModel = {
    iconUrl: string,
    appName: string,
    isOpen: boolean,
    isFocused: boolean,
    isMaximized: boolean,
    isMinimized: boolean
}
const ABOUT_ME_APPLICATION_NAME = "About Me";
const ABOUT_ME_APPLICATION_ICON_URL = "nicholas-picture-1.png"
const MY_PROJECTS_APPLICATION_NAME = "My Projects"
const MY_PROJECTS_APPLICATION_ICON_URL = "3d-print-ghost-shell/ghost-shell-first-assembly.png"
const WORK_EXPERIENCE_APPLICATION_NAME = "Work Experience";
const WORK_EXPERIENCE_APPLICATION_ICON_URL = "windows-icons/document-0.png";

export default function Windows98() {
    const openGithub = useCallback(() => {
        window.open('https://github.com/nicholasMeadows', "_blank")
    }, [])
    const openLinkedin = useCallback(() => {
        window.open('https://www.linkedin.com/in/nicholasmeadows/', "_blank")
    }, [])

    const [applicationWindows, setApplicationWindows] = useState<Map<string, ApplicationWindowModel>>(new Map());

    const closeWindow = useCallback((appName: string) => {
        console.log(1)
        applicationWindows.delete(appName);
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows])


    const setIsFocused = useCallback((appName: string, isFocused: boolean) => {
        console.log(2)
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
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows])

    const setIsMinimized = useCallback((appName: string, isMinimized: boolean) => {
        console.log(3)
        const applicationWindow = applicationWindows.get(appName);
        if (applicationWindow === undefined) {
            return;
        }
        applicationWindow.isMinimized = isMinimized;
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows])

    const setIsMaximized = useCallback((appName: string, isMaximized: boolean) => {
        console.log(4)
        const applicationWindow = applicationWindows.get(appName);
        if (applicationWindow === undefined) {
            return;
        }
        applicationWindow.isMaximized = isMaximized;
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows])


    const openWindow = useCallback((appName: string, iconUrl: string) => {
        if (applicationWindows.get(appName) !== undefined) {
            return;
        }
        const appWindowModel: ApplicationWindowModel = {
            iconUrl: iconUrl,
            appName: appName,
            isOpen: true,
            isFocused: true,
            isMaximized: false,
            isMinimized: false,
        }
        applicationWindows.set(appName, appWindowModel);
        setApplicationWindows(new Map(applicationWindows));
    }, [applicationWindows])

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

    return <div className={'desktop'}>
        <div className={'desktop-icons'}>
            <DesktopShortcut iconSrc={'nicholas-picture-1.png'} iconTxt={'About-Me'} onClick={openAboutMePage}/>
            <a href={"/resume/Fullstack Engineer Resume.pdf"} target={'_blank'} style={{
                color: 'inherit',
                textDecoration: 'inherit'
            }}>
                <DesktopShortcut iconSrc={'windows-icons/document-0.png'} iconTxt={'Fullstack Developer Resume'}/>
            </a>
            <DesktopShortcut iconSrc={'windows-icons/document-0.png'} iconTxt={'Work Experience'}
                             onClick={openWorkExperiencePage}/>
            <DesktopShortcut iconSrc={'github-logo-dark.png'} iconTxt={'Github'} onClick={openGithub}/>
            <DesktopShortcut iconSrc={'linkedin-logo.png'} iconTxt={'Linkedin'} onClick={openLinkedin}/>
            <DesktopShortcut iconSrc={'3d-print-ghost-shell/ghost-shell-first-assembly.png'} iconTxt={'Projects'}
                             onClick={openMyProjectsPage}/>
        </div>

        {applicationWindows.get(ABOUT_ME_APPLICATION_NAME) !== undefined &&
            // @ts-ignore
            <Windows98AppWindow appWindowModel={applicationWindows.get(ABOUT_ME_APPLICATION_NAME)}
                                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                                setIsMaximized={setIsMaximized} closeWindow={closeWindow}>
                <AboutMe/>
            </Windows98AppWindow>
        }
        {applicationWindows.get(MY_PROJECTS_APPLICATION_NAME) !== undefined &&
            // @ts-ignore
            <Windows98AppWindow appWindowModel={applicationWindows.get(MY_PROJECTS_APPLICATION_NAME)}
                                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                                setIsMaximized={setIsMaximized} closeWindow={closeWindow}>
                <Projects/>
            </Windows98AppWindow>
        }

        {applicationWindows.get(WORK_EXPERIENCE_APPLICATION_NAME) !== undefined &&
            // @ts-ignore
            <Windows98AppWindow appWindowModel={applicationWindows.get(WORK_EXPERIENCE_APPLICATION_NAME)}
                                setIsFocused={setIsFocused} setIsMinimized={setIsMinimized}
                                setIsMaximized={setIsMaximized} closeWindow={closeWindow}>
                <WorkExperience/>
            </Windows98AppWindow>
        }
        <StartBar applicationWindows={applicationWindows} setIsMinimized={setIsMinimized}
                  setIsFocused={setIsFocused}></StartBar>
    </div>
}