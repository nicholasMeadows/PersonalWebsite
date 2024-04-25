'use client';
import Image from "next/image";

export default function NavigationBarLinkedinImg() {
    return <Image src={'linkedin-logo.png'} style={{
        width: 'auto',
        height: '100%',
        marginRight: '1em',
        cursor: 'pointer'
    }} alt={''} onClick={() => {
        window.open('https://www.linkedin.com/in/nicholasmeadows/')
    }}/>
}