'use client';

import {usePathname} from "next/navigation";
import "../css/navigation-bar.css";
import Link from "next/link";

import {ABOUT_ME_ROUTE, HOME_ROUTE, WORK_EXPERIENCE_ROUTE} from '../constants/routes';
import {NAVIGATION_BAR_HEIGHT} from "@/app/constants/navigation-bar";
import {useEffect, useRef, useState} from "react";

export default function NavigationBar() {
    const pathname = usePathname()

    const [sideBarOpen, setSideBarOpen] = useState(false);
    const sideBarDivRef = useRef<HTMLDivElement | null>(null);
    const [sidebarWidth, setSideBarWidth] = useState('0px')

    useEffect(() => {
        const sideBarDiv = sideBarDivRef.current;
        if (sideBarDiv === null) {
            setSideBarWidth('0px');
            return;
        }
        setSideBarWidth(`${sideBarDiv.clientWidth}px`)
    }, [sideBarDivRef]);


    return <div className={'navigation-header-bar'}
                style={{height: `${NAVIGATION_BAR_HEIGHT}`, maxHeight: `${NAVIGATION_BAR_HEIGHT}`}}>

        <div className={'navigation-header-bar-hamburger-wrapper'}>
            <div className={'navigation-header-bar-hamburger'} onClick={() => setSideBarOpen(!sideBarOpen)}>
                <div/>
                <div/>
                <div/>
            </div>
        </div>

        <Link href={HOME_ROUTE} className={'my-name-wrapper'}>
            <span className={'my-name-header'}>Nicholas Meadows</span>
        </Link>

        <div className={'external-sites-img-wrapper'}>
            <a href={'https://github.com/nicholasMeadows'} target={'_blank'} className={'external-site-a'}>
                <img src={"/github-logo.png"} alt={'github'} className={'external-site-img github-img'}/>
            </a>
            <a href={'https://www.linkedin.com/in/nicholasmeadows/'} target={'_blank'}
               className={'external-site-a'}>
                <img src={"/linkedin-logo.png"} alt={'linkedin'} className={'external-site-img'}/>
            </a>
        </div>
        <div className={'nav-buttons-wrapper'}>
            <Link href={ABOUT_ME_ROUTE}
                  className={`nav-link ${pathname === ABOUT_ME_ROUTE ? 'nav-link-active' : ''}`}>
                <p>About</p></Link>
            <Link href={WORK_EXPERIENCE_ROUTE}
                  className={`nav-link ${pathname === WORK_EXPERIENCE_ROUTE ? 'nav-link-active' : ''}`}><p>Work
                Experience</p></Link>
        </div>
        <div ref={sideBarDivRef} className={'side-bar'}
             style={{
                 height: `calc(100vh - ${NAVIGATION_BAR_HEIGHT})`,
                 top: NAVIGATION_BAR_HEIGHT,
                 left: `${sideBarOpen ? '0' : `calc(${sidebarWidth} * -1)`}`,
             }}>
            <div className={'side-bar-link-flex-box'} onClick={() => setSideBarOpen(false)}>
                <Link href={WORK_EXPERIENCE_ROUTE}
                      className={`side-bar-link ${pathname === WORK_EXPERIENCE_ROUTE ? 'nav-link-active' : ''}`}><p>Work
                    Experience</p></Link>
                <Link href={ABOUT_ME_ROUTE}
                      className={`side-bar-link ${pathname === ABOUT_ME_ROUTE ? 'nav-link-active' : ''}`}>
                    <p>About</p></Link>
                <div className={'side-bar-external-site-img-box'}>
                    <a href={'https://github.com/nicholasMeadows'} target={'_blank'}>
                        <img src={'/github-logo-wide.png'} alt={''}
                             className={'side-bar-external-site-img'}/> </a>
                    <a href={'https://www.linkedin.com/in/nicholasmeadows/'} target={'_blank'}>
                        <img src={'/linkedin-logo-wide.png'} alt={''}
                             className={'side-bar-external-site-img'}/>
                    </a>


                </div>
            </div>
        </div>
        <div className={'side-bar-active-background'} style={{
            visibility: sideBarOpen ? 'visible' : 'hidden',
            top: NAVIGATION_BAR_HEIGHT,
            height: `calc(100vh - ${NAVIGATION_BAR_HEIGHT})`,
        }} onClick={() => setSideBarOpen(false)}/>
    </div>
}