'use client';

import {usePathname} from "next/navigation";
import "../css/navigation-bar.css";
import Link from "next/link";

import {ABOUT_ME_ROUTE, HOME_ROUTE, PROJECTS_ROUTE, WORK_EXPERIENCE_ROUTE} from '../constants/routes';
import ToggleSwitch from "@/app/components/toggle-switch";
import useDarkMode from "@/app/hooks/useDarkMode";
import {useCallback, useEffect, useRef, useState} from "react";

export default function NavigationBar() {
    const pathname = usePathname()
    const darkMode = useDarkMode();
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const sideBarDivRef = useRef<HTMLDivElement | null>(null);
    const sideBarActiveBackgroundDivRef = useRef<HTMLDivElement | null>(null);

    const scrollToTopOfPage = useCallback(() => {
        window.scrollTo(0, 0);
    }, [])
    useEffect(() => {
        const cancelSidebarScroll = (event: WheelEvent) => {
            event.preventDefault();
        }
        const sideBarDiv = sideBarDivRef.current;
        if (sideBarDiv !== null) {
            sideBarDiv.addEventListener('wheel', cancelSidebarScroll, {passive: false});
        }

        const sideBarActiveBackgroundDiv = sideBarActiveBackgroundDivRef.current;
        if (sideBarActiveBackgroundDiv !== null) {
            sideBarActiveBackgroundDiv.addEventListener('wheel', cancelSidebarScroll, {passive: false});
        }
        return () => {
            if (sideBarDiv !== null) {
                sideBarDiv.removeEventListener('wheel', cancelSidebarScroll);
            }
            if (sideBarActiveBackgroundDiv !== null) {
                sideBarActiveBackgroundDiv.removeEventListener('wheel', cancelSidebarScroll);
            }
        }
    }, []);

    return <>
        <div className={'navigation-header-bar'}>

            <div className={'navigation-header-bar-hamburger-wrapper'}>
                <div className={'navigation-header-bar-hamburger'} onClick={() => setSideBarOpen(!sideBarOpen)}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>

            <Link href={HOME_ROUTE} className={'my-name-wrapper'} onClick={() => {
                setSideBarOpen(false)
                scrollToTopOfPage();
            }}>
                <span className={'my-name-header'}>Nicholas Meadows</span>
            </Link>

            <div className={'external-sites-img-wrapper'}>
                <a href={'https://github.com/nicholasMeadows'} target={'_blank'} className={'external-site-a'}>
                    <img src={`/github-logo-${darkMode.darkModeOn ? 'light' : 'dark'}.png`} alt={'github'}
                         className={'external-site-img github-img'}/>
                </a>
                <a href={'https://www.linkedin.com/in/nicholasmeadows/'} target={'_blank'}
                   className={'external-site-a'}>
                    <img src={"/linkedin-logo.png"} alt={'linkedin'} className={'external-site-img'}/>
                </a>
            </div>
            <div className={'nav-buttons-wrapper'} onClick={() => {
                scrollToTopOfPage();
            }}>
                <Link href={ABOUT_ME_ROUTE}
                      className={`nav-link ${pathname === ABOUT_ME_ROUTE ? 'nav-link-active' : ''}`}>
                    <p>About</p></Link>
                <Link href={WORK_EXPERIENCE_ROUTE}
                      className={`nav-link ${pathname === WORK_EXPERIENCE_ROUTE ? 'nav-link-active' : ''}`}><p>Work
                    Experience</p></Link>
                <Link href={PROJECTS_ROUTE}
                      className={`nav-link ${pathname === PROJECTS_ROUTE ? 'nav-link-active' : ''}`}><p>Projects</p>
                </Link>
            </div>
            <div className={'dark-mode-toggle-box'}>
                <ToggleSwitch checked={darkMode.darkModeOn} onToggle={() => darkMode.toggleDarkMode()}
                              uncheckedImgUrl={'/sun-icon.png'} checkImgUrl={'/moon-icon.png'}/>
            </div>
        </div>

        <div ref={sideBarDivRef} className={`side-bar ${sideBarOpen ? 'side-bar-open' : ''}`}>
            <div className={'side-bar-nav-links'} onClick={() => {
                setSideBarOpen(false)
                scrollToTopOfPage();
            }}>
                <Link href={WORK_EXPERIENCE_ROUTE}
                      className={`side-bar-link ${pathname === WORK_EXPERIENCE_ROUTE ? 'nav-link-active' : ''}`}><p>Work
                    Experience</p></Link>
                <Link href={ABOUT_ME_ROUTE}
                      className={`side-bar-link ${pathname === ABOUT_ME_ROUTE ? 'nav-link-active' : ''}`}>
                    <p>About</p></Link>
            </div>
            <div className={'side-bar-external-site-img-box'}>
                <a href={'https://github.com/nicholasMeadows'} target={'_blank'}>
                    <img src={`/github-logo-wide-${darkMode.darkModeOn ? 'light' : 'dark'}.png`} alt={''}
                         className={'side-bar-external-site-img'}/> </a>
                <a href={'https://www.linkedin.com/in/nicholasmeadows/'} target={'_blank'}>
                    <img src={`/linkedin-logo-wide-${darkMode.darkModeOn ? 'light' : 'dark'}.png`} alt={''}
                         className={'side-bar-external-site-img'}/>
                </a>
            </div>

        </div>
        <div ref={sideBarActiveBackgroundDivRef} className={'side-bar-active-background'} style={{
            visibility: sideBarOpen ? 'visible' : 'hidden'
        }} onClick={() => setSideBarOpen(false)}/>
    </>
}