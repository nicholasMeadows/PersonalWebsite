import "../../css/start-bar.css";
import {useEffect, useRef, useState} from "react";
import {
    ABOUT_ME_APPLICATION_ICON_URL,
    ABOUT_ME_APPLICATION_NAME,
    ApplicationWindowModel,
    INTRO_APPLICATION_ICON_URL,
    MY_PROJECTS_APPLICATION_ICON_URL,
    MY_PROJECTS_APPLICATION_NAME,
    NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL,
    NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME
} from "@/app/components/windows-98/windows-desktop";

type Props = {
    applicationWindows: Map<String, ApplicationWindowModel>,
    setIsFocused: (appName: string, isFocused: boolean) => void,
    setIsMinimized: (appName: string, isMinimized: boolean) => void,
    onShutDownClick: () => void,
    startMenuOpen: boolean,
    setStartMenuOpen: (startMenuOpen: boolean) => void
    openMyProjectsPage: () => void,
    openAboutMePage: () => void,
    openIntroPage: () => void,
    openNanoRacksAndRoboticsPage: () => void
}
export default function StartBar({
                                     applicationWindows,
                                     setIsFocused,
                                     setIsMinimized,
                                     onShutDownClick,
                                     startMenuOpen,
                                     setStartMenuOpen,
                                     openMyProjectsPage, openAboutMePage, openIntroPage, openNanoRacksAndRoboticsPage
                                 }: Props) {
    const [time, setTime] = useState<string>();

    useEffect(() => {
        const generateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours < 12 ? 'AM' : 'PM';
            setTime(`${(hours + 24) % 12 || 12}:${String(minutes).padStart(2, '0')} ${ampm}`)
        }
        generateTime();
        const interval = setInterval(() => {
            generateTime();
        }, 1000);
        return () => {
            clearTimeout(interval);
        }
    }, []);
    const startMenuMainDivRef = useRef<HTMLDivElement>(null)

    return <div className={'start-bar'} onMouseDown={(event) => {
        event.stopPropagation();
        event.preventDefault()
    }}>
        {startMenuOpen &&
            <div className={'start-menu'}>
                <div className={'windows-side-bar'}>
                    <p>Windows 98</p>
                </div>
                <div className={'start-menu-main'} ref={startMenuMainDivRef}>
                    <div className={'start-menu-app'} onClick={openIntroPage}>
                        <img src={INTRO_APPLICATION_ICON_URL}/>
                        <p>Intro</p>
                    </div>
                    <div className={'start-menu-app'} onClick={openAboutMePage}>
                        <img src={ABOUT_ME_APPLICATION_ICON_URL}/>
                        <p>{ABOUT_ME_APPLICATION_NAME}</p>
                    </div>
                    <div className={'start-menu-app'} onClick={openNanoRacksAndRoboticsPage}>
                        <img src={NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL}/>
                        <p>{NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME}</p>
                    </div>
                    <div className={'start-menu-app'} onClick={openMyProjectsPage}>
                        <img src={MY_PROJECTS_APPLICATION_ICON_URL}/>
                        <p>{MY_PROJECTS_APPLICATION_NAME}</p>
                    </div>
                    <div className={'start-menu-spacer shutdown-btn-spacer'}></div>
                    <div className={'start-menu-app'} onClick={() => onShutDownClick()}>
                        <img src={'windows-icons/shut_down_with_computer-0.png'}/>
                        <p>Shut Down...</p>
                    </div>
                </div>
            </div>
        }

        <div className={'task-bar-box start-button'} onClick={() => setStartMenuOpen(!startMenuOpen)}>
            <img src={'windows-icons/windows-0.png'} alt={''}/>
            <p>Start</p>
        </div>
        <div className={'open-applications-box'}>
            {Array.from(applicationWindows).sort((window1, window2) => {
                const openedTimestamp1 = window1[1].openedWindowTimestamp;
                const openedTimestamp2 = window2[1].openedWindowTimestamp;
                if (openedTimestamp1 > openedTimestamp2) {
                    return 1;
                } else if (openedTimestamp1 < openedTimestamp2) {
                    return -1;
                }
                return 0;
            }).map(mapEntry => {
                const applicationWindow = mapEntry[1];
                return <div key={applicationWindow.appName}
                            className={`task-bar-app-box ${applicationWindow.isFocused ? 'active' : ''}`}
                            onClick={() => {
                                setIsFocused(applicationWindow.appName, true)
                                setIsMinimized(applicationWindow.appName, false)
                            }}>
                    <img src={applicationWindow.iconUrl} alt={''}/>
                    <p>{applicationWindow.appName}</p>
                </div>
            })}
        </div>
        <div className={'task-bar-box system-tray'}>
            <img src={'windows-icons/sched_tasks.png'} alt={''}/>
            <img src={'windows-icons/loudspeaker_rays-0.png'} alt={''}/>
            <p>{time}</p>
        </div>
    </div>
}