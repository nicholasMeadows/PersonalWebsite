"use client"
import '../css/windows-98.css'

import '../css/home-page.css'
import '../css/projects.css'
import '../css/about-me.css'
import '../css/work-experience.css'
import {useCallback, useEffect, useRef, useState} from "react";
import WindowsScreenSaver from "@/app/components/windows-98/windows-screen-saver";
import Windows98Startup from "@/app/components/windows-98/windows-98-startup";
import WindowsDesktop from "@/app/components/windows-98/windows-desktop";

export default function Windows98() {
    const [isOn, setIsOn] = useState(false);
    const [screenSaverOn, setScreenSaverOn] = useState(false);

    const screenSaverTimeoutRef = useRef<NodeJS.Timeout>();

    const setupScreenSaverTimeout = useCallback(() => {
        const screenSaverTimeout = screenSaverTimeoutRef.current
        if (screenSaverTimeout !== undefined) {
            clearTimeout(screenSaverTimeout);
        }
        screenSaverTimeoutRef.current = setTimeout(() => {
            setScreenSaverOn(true);
        }, 60000);
    }, [])

    useEffect(() => {
        if (isOn) {
            setupScreenSaverTimeout();
        }
    }, [isOn, setupScreenSaverTimeout]);

    const screenSaverMouseMove = useCallback(() => {
        setupScreenSaverTimeout();
        setScreenSaverOn(false)
    }, [setupScreenSaverTimeout])
    return <>
        <div className={`${isOn ? 'fade-out' : ''}`}>
            <Windows98Startup onEnded={() => setIsOn(true)}/>
        </div>
        <div className={`${isOn ? 'fade-in' : 'hidden'}`} onMouseMove={screenSaverMouseMove}>
            <WindowsDesktop/>
        </div>
        <div className={`${screenSaverOn ? '' : 'hidden'}`} onMouseMove={screenSaverMouseMove}>
            <WindowsScreenSaver screenSaverOn={screenSaverOn}/>
        </div>
    </>
}