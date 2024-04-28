import React from 'react';

import '../../css/about-me.css'
import {BIRTHDAY} from "@/app/constants/about-me";

function AboutMe() {
    const ageDifMs = Date.now() - new Date(BIRTHDAY).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return <div className={'about-me'}>
        <img className={'about-me-header-img'} src={'/about-me-header.png'} alt={''}/>
        <br/>
        <p>I&apos;m Nicholas, a {age} year old Louisiana native with a passion for exploring the
            intersection of technology and creativity. While my professional life revolves around software development,
            my true joy comes from diving into a world of hobbies and interests that span far beyond the confines of
            code.</p>
        <br/>
        <p>From a young age, I&apos;ve been captivated by the world of robotics. My journey began with FRC Team 4353,
            Krewe
            de Reauxbotics, where I discovered the thrill of planning, designing, and machining intricate components.
            This early fascination laid the foundation for my love of tinkering and building, which has since evolved
            into a passion for 3D printing. I spend countless hours crafting props and functional components, pushing
            the boundaries of what&apos;s possible with this exciting technology.</p>
        <br/>
        <p>When I&apos;m not immersed in the world of software development, you can often find me with a controller in
            hand,
            navigating the thrilling landscapes of video games. I&apos;m particularly fond of action-packed titles like
            Rainbow Six Siege, as well as the stealthy adventures of Splinter Cell and the tactical espionage of Metal
            Gear Solid. These games have not only provided countless hours of entertainment but have also sparked my
            imagination and fueled my love for storytelling.</p>
        <br/>
        <p>I also find solace in the galaxy far, far away, with a deep appreciation for &quot;Star Wars&quot; and its
            offshoots,
            such as the captivating series &quot;The Mandalorian.&quot; Beyond the digital realm, I enjoy the simple
            pleasures of
            life in Louisiana, especially when it involves spending time outdoors. Fishing with my father is a cherished
            pastime, where we bond over our shared love of the water and the thrill of reeling in a big catch.</p>
        <br/>
        <p>I also have a keen interest in space exploration, particularly the tech marvels of the Mercury, Gemini, and
            Apollo programs, as well as modern space programs like SpaceX, Starship, and NASA&apos;s Space Launch System
            (SLS). The ingenuity and innovation of these missions never cease to amaze me, serving as a constant source
            of inspiration.</p>
        <br/>
        <p>I&apos;m excited to share my passions and adventures with you through this website. Whether you&apos;re here
            to
            explore
            the latest 3D printing projects, dive into the world of gaming, or simply share a love for the stars, I hope
            you find something here that sparks your curiosity and ignites your imagination.</p>
    </div>
}

export default AboutMe;