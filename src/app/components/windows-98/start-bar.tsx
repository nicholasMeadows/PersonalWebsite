import "../../css/start-bar.css";
import {MouseEvent, useCallback, useContext, useEffect, useRef, useState} from "react";
import {
    ABOUT_ME_APPLICATION_ICON_URL,
    ABOUT_ME_APPLICATION_NAME,
    INTRO_APPLICATION_ICON_URL,
    MY_PROJECTS_APPLICATION_ICON_URL,
    MY_PROJECTS_APPLICATION_NAME,
    NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL,
    NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME
} from "@/app/components/windows-98/windows-desktop";
import Windows98StartBarContext from "@/app/context/windows-98-start-bar-context";

const DOCUMENTS_SIDE_SECTION_KEY = "DOCUMENTS";
export type StartMenuSideSectionState = {
    sectionKey: string,
    top: number,
    left: number
}
export default function StartBar() {
    const {
        downloadFullstackEngineerResume,
        startBarElementRef,
        startMenuSideSection,
        setStartMenuSideSection,
        setStartMenuOpen,
        startMenuOpen,
        isMuted,
        setIsMuted,
        setIsFocused,
        setIsMinimized,
        openAboutMePage,
        openMyProjectsPage,
        openIntroPage,
        openWorkExperiencePage,
        openNanoRacksAndRoboticsPage,
        applicationWindows,
        onShutDownClick
    } = useContext(Windows98StartBarContext);

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

    const openStartMenuSideSection = useCallback((event: MouseEvent, sectionKey: string) => {
        if (startMenuSideSection !== undefined && startMenuSideSection.sectionKey === sectionKey) {
            return;
        }
        const startMenuBtn = event.currentTarget as HTMLElement;
        const btnRect = startMenuBtn.getBoundingClientRect();
        setStartMenuSideSection({
            sectionKey: sectionKey,
            top: btnRect.top,
            left: btnRect.right
        })
    }, [setStartMenuSideSection, startMenuSideSection]);

    return <div className={'start-bar'} ref={startBarElementRef}>
        {startMenuOpen &&
            <>
                <div className={'start-menu'}>
                    <div className={'windows-side-bar'}>
                        <p>Windows 98</p>
                    </div>
                    <div className={'start-menu-main'} ref={startMenuMainDivRef}>
                        <div className={'start-menu-app'} onClick={openIntroPage}>
                            <img src={INTRO_APPLICATION_ICON_URL} alt={''}/>
                            <p>Intro</p>
                        </div>
                        <div className={'start-menu-app'} onClick={openAboutMePage}>
                            <img src={ABOUT_ME_APPLICATION_ICON_URL} alt={''}/>
                            <p>{ABOUT_ME_APPLICATION_NAME}</p>
                        </div>
                        <div className={'start-menu-app'} onClick={openNanoRacksAndRoboticsPage}>
                            <img src={NANO_RACKS_AND_ROBOTICS_APPLICATION_ICON_URL} alt={''}/>
                            <p>{NANO_RACKS_AND_ROBOTICS_APPLICATION_NAME}</p>
                        </div>
                        <div className={'start-menu-app'} onClick={openMyProjectsPage}>
                            <img src={MY_PROJECTS_APPLICATION_ICON_URL} alt={''}/>
                            <p>{MY_PROJECTS_APPLICATION_NAME}</p>
                        </div>
                        <div className={'start-menu-app'}
                             onClick={(event) => openStartMenuSideSection(event, DOCUMENTS_SIDE_SECTION_KEY)}>
                            <img src={"windows-icons/directory_open_file_mydocs_2k-4.png"} alt={''}/>
                            <p>Documents</p>
                            <img src={"right-black-triangle.png"} className={'start-menu-app-arrow'} alt={''}/>
                        </div>
                        <div className={'start-menu-spacer shutdown-btn-spacer'}></div>
                        <div className={'start-menu-app'} onClick={() => onShutDownClick()}>
                            <img src={'windows-icons/shut_down_with_computer-0.png'} alt={''}/>
                            <p>Shut Down...</p>
                        </div>
                    </div>
                </div>
                {startMenuSideSection !== undefined && startMenuSideSection.sectionKey === DOCUMENTS_SIDE_SECTION_KEY &&
                    <div className={'side-section-container'} style={{
                        top: `${startMenuSideSection.top}px`,
                        left: `calc(1em + ${startMenuSideSection.left}px)`
                    }}>
                        <div className={'start-menu-documents-side-section'}>
                            <div className={'start-menu-app'} onClick={downloadFullstackEngineerResume}>
                                <img src={'windows-icons/document-0.png'} alt={''}/>
                                <p>Fullstack Developer Resume</p>
                            </div>
                            <div className={'start-menu-app'} onClick={openWorkExperiencePage}>
                                <img src={'windows-icons/document-0.png'} alt={''}/>
                                <p>Work Experience</p>
                            </div>
                        </div>
                    </div>
                }
            </>
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
            <img src={`${isMuted ? 'windows-icons/loudspeaker_muted-0.png' : 'windows-icons/loudspeaker_rays-0.png'}`}
                 alt={''} onClick={() => setIsMuted(!isMuted)}/>
            <p>{time}</p>
        </div>
    </div>
}