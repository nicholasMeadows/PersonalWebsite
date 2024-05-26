import "../css/start-bar.css";
import {useEffect, useState} from "react";
import {ApplicationWindowModel} from "@/app/pages/windows-98/page";

type Props = {
    applicationWindows: Map<String, ApplicationWindowModel>,
    setIsFocused: (appName: string, isFocused: boolean) => void,
    setIsMinimized: (appName: string, isMinimized: boolean) => void
}
export default function StartBar({applicationWindows, setIsFocused, setIsMinimized}: Props) {
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
    return <div className={'start-bar'}>
        <div className={'task-bar-box start-button'}>
            <img src={'windows-icons/windows-0.png'} alt={''}/>
            <p>Start</p>
        </div>
        <div className={'open-applications-box'}>
            {Array.from(applicationWindows).map(mapEntry => {
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