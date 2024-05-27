"use client"
import '../css/windows-98.css'

import '../css/home-page.css'
import '../css/projects.css'
import '../css/about-me.css'
import '../css/work-experience.css'
import React, {useCallback, useEffect, useRef, useState} from "react";
import WindowsScreenSaver from "@/app/components/windows-98/windows-screen-saver";
import Windows98Startup from "@/app/components/windows-98/windows-98-startup";
import WindowsDesktop from "@/app/components/windows-98/windows-desktop";

export default function Windows98() {
    const [powerLightOn, setPowerLightOn] = useState(false)
    const [isOn, setIsOn] = useState(false);
    const [screenSaverOn, setScreenSaverOn] = useState(false);

    const [hasBeenTurnedOn, setHasBeenTurnedOn] = useState(false);
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const screenSaverTimeoutRef = useRef<NodeJS.Timeout>();

    const clearScreenSaverTimeout = useCallback(() => {
        const screenSaverTimeout = screenSaverTimeoutRef.current
        if (screenSaverTimeout !== undefined) {
            clearTimeout(screenSaverTimeout);
        }
    }, [])

    const setupScreenSaverTimeout = useCallback(() => {
        clearScreenSaverTimeout();
        if (isOn) {
            screenSaverTimeoutRef.current = setTimeout(() => {
                setScreenSaverOn(true);
            }, 60000);
        }
    }, [clearScreenSaverTimeout, isOn])

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
        <div className={`${isOn ? 'fade-out' : hasBeenTurnedOn ? 'fade-in' : ''}`}>
            <Windows98Startup onEnded={() => {
                setHasBeenTurnedOn(true);
                setIsOn(true)
            }} powerLightOn={powerLightOn}
                              setPowerLightOn={setPowerLightOn}/>
        </div>
        <div className={`${isOn ? 'fade-in' : hasBeenTurnedOn ? 'fade-out' : 'hidden'}`}
             onMouseMove={screenSaverMouseMove}>
            <WindowsDesktop onShutDownClick={() => {
                clearScreenSaverTimeout();
                setPowerLightOn(false);
                setIsOn(false)
            }} startMenuOpen={startMenuOpen}
                            setStartMenuOpen={setStartMenuOpen}/>
        </div>
        <div className={`${screenSaverOn ? '' : 'hidden'}`} onMouseMove={screenSaverMouseMove}>
            <WindowsScreenSaver screenSaverOn={screenSaverOn}/>
        </div>
    </>
}