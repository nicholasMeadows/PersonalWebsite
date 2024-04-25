'use client';

import {usePathname} from "next/navigation";
import "../css/navigation-bar.css";
import {ABOUT_ME_ROUTE, HOME_ROUTE, WORK_EXPERIENCE_ROUTE} from '../constants/routes'
import Link from "next/link";

export default function NavigationBar() {
    const pathname = usePathname()
    return <div className={'navigation-header-bar'}>
        <div className={'navigation-item-section'}>
            <div className={'vl'}></div>
            <Link href={HOME_ROUTE}>
                <div className={`navigation-item ${pathname === HOME_ROUTE ? 'navigation-item-active' : ''}`}>
                    <strong style={{fontSize: '1.5em',}}>Home</strong>
                </div>
            </Link>

            <div className={'vl'}></div>
            <Link href={WORK_EXPERIENCE_ROUTE}>
                <div
                    className={`navigation-item ${pathname === WORK_EXPERIENCE_ROUTE ? 'navigation-item-active' : ''}`}>
                    <strong style={{fontSize: '1.5em',}}>Work Experience</strong>
                </div>
            </Link>
            <div className={'vl'}></div>
            <Link href={ABOUT_ME_ROUTE}>
                <div className={`navigation-item ${pathname === ABOUT_ME_ROUTE ? 'navigation-item-active' : ''}`}>
                    <strong style={{fontSize: '1.5em',}}>About Me</strong>
                </div>
            </Link>
            <div className={'vl'}></div>
        </div>

        <div className={'external-site-images'}>
            <img src={'/github-logo.png'} className={'external-site-image'} alt={''} onClick={() => {
                window.open('https://github.com/nicholasMeadows')
            }}/>
            <img src={'/linkedin-logo.png'} width={'0'} height={'0'} className={'external-site-image'} alt={''}
                 onClick={() => {
                     window.open('https://www.linkedin.com/in/nicholasmeadows/')
                 }}/>
        </div>
    </div>
}