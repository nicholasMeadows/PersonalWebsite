'use client';

import {usePathname} from "next/navigation";
import "../css/navigation-bar.css";
import Link from "next/link";

import {ABOUT_ME_ROUTE, HOME_ROUTE, WORK_EXPERIENCE_ROUTE} from '../constants/routes';
import {NAVIGATION_BAR_HEIGHT} from "@/app/constants/navigation-bar";

export default function NavigationBar() {
    const pathname = usePathname()

    return <div className={'navigation-header-bar'} style={{height:`${NAVIGATION_BAR_HEIGHT}`, maxHeight:`${NAVIGATION_BAR_HEIGHT}`}}>
        <Link href={HOME_ROUTE} className={'my-name-wrapper'}>
            <span className={'my-name-header'}>Nicholas Meadows</span>
        </Link>
        <div className={'external-sites-img-wrapper'}>
            <a href={'https://github.com/nicholasMeadows'} target={'_blank'} className={'external-site-a'}>
                <img src={"/github-logo.png"} alt={'github'} className={'external-site-img github-img'}/>
            </a>
            <a href={'https://www.linkedin.com/in/nicholasmeadows/'} target={'_blank'} className={'external-site-a'}>
                <img src={"/linkedin-logo.png"} alt={'linkedin'} className={'external-site-img'}/>
            </a>
        </div>
        <div className={'nav-buttons-wrapper'}>
            <Link href={ABOUT_ME_ROUTE} className={`nav-link ${pathname === ABOUT_ME_ROUTE ? 'nav-link-active' : ''}`}>
                <p>About</p></Link>
            <Link href={WORK_EXPERIENCE_ROUTE}
                  className={`nav-link ${pathname === WORK_EXPERIENCE_ROUTE ? 'nav-link-active' : ''}`}><p>Work
                Experience</p></Link>
        </div>
    </div>
}