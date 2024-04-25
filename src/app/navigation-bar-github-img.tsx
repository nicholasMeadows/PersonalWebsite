'use client';
import Image from "next/image";

export default function NavigationBarGithubImg() {
    return <Image src={'github-logo.png'} style={{
        width: 'auto',
        height: '100%',
        marginRight: '1em',
        cursor: 'pointer'
    }} alt={''} onClick={() => {
        window.open('https://github.com/nicholasMeadows')
    }}/>
}