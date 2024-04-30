import React from 'react';
import '../../css/projects.css'

function Projects() {
    return <div className={'projects-page'}>
        <div className={'table-of-contents'}>
            <h3>Table of contents</h3>

            <div className={'table-of-contents-link-box'}>
                <a href={'#home-automation'}><h5>Home Automation</h5></a>
                <a href={'#boat-restoration'}><h5>Boat Restoration</h5></a>
                <a href={'#fallout-mini-nuke-project'}><h5>Fallout Mini-Nuke</h5></a>
                <a href={'#destiny-ghost'}><h5>Destiny Ghost</h5></a>
            </div>
        </div>

        <h2 id={'home-automation'} className={'project-section-header'}>Home Automation</h2>
        <p>The goal of my home automation project is to transform my living space into a smart and interconnected
            environment using Home Assistant, Node-RED, Alexa, and Philips Hue. This project has not only simplified
            my
            daily routines but has also added a new level of convenience and efficiency to my home.</p>
        <p>Through the use of automation scripts and routines, I&apos;ve been able to create personalized experiences
            tailored to my needs. For example, I have automated lighting based on motion sensors and time schedules,
            as
            well as integrated voice commands for controlling devices and playing music.</p>
        <br/>
        <div className={'home-automation-components-subsection'}>
            <h5>Components:</h5>
            <ul className={'home-automation-component-ul'}>
                <li>Home Assistant: Serving as the central hub of my smart home, Home Assistant integrates all my
                    smart
                    devices and
                    services, allowing me to control them from a single interface.
                </li>
                <li>Node-RED: This visual programming tool has been instrumental in creating complex automation
                    flows,
                    enabling
                    seamless interactions between different devices and services.
                </li>
                <li>Alexa: With Alexa integration, I can control various aspects of my smart home using voice
                    commands,
                    adding a new
                    level of convenience to my daily life.
                </li>
                <li>Philips Hue: The Philips Hue smart lighting system has transformed the ambiance of my home,
                    allowing
                    me
                    to
                    customize the lighting to suit any mood or occasion.
                </li>
            </ul>
        </div>
        <br/>

        <p>I&apos;m constantly exploring new ways to enhance my home automation setup. Future plans include integrating
            more
            smart devices, such as smart thermostats and security cameras, as well as experimenting with advanced
            automation techniques to further streamline my home&apos;s operations.</p>
        <p>My home automation project has been a journey of exploration and innovation, allowing me to create a
            smart
            and connected home that meets my needs and enhances my quality of life. Through the use of cutting-edge
            technology and creative automation solutions, I&apos;ve been able to transform my living space into a truly
            modern and efficient environment.</p>
        <h2 id={'boat-restoration'} className={'project-section-header'}>Boat Restoration</h2>
        <p>In 1985, a brand new Alweld jon boat and an Evinrude 70 horsepower motor were purchased by a proud
            grandfather, setting the stage for a family legacy that would span generations. Passed down from grandfather
            to father, and now to me, this boat has seen its fair share of adventures and challenges.</p>
        <br/>
        <p>After years of faithful service, the boat fell into disrepair, its paint chipped, its original motor
            transferred to
            another vessel, its seats and flooring destroyed by time and neglect. But in 2020, a new chapter began as
            I embarked on a mission to restore this family heirloom to its former glory.</p>
        <br/>
        <div className={'project-imgs-flex-box-no-wrap'}>
            <div>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-before-sanding-and-painting.png'} alt={''}/>
            </div>

            <div>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-before-sanded.png'} alt={''}/>
            </div>
        </div>
        <br/>
        <p>The restoration project started with a thorough cleaning, removing years of grime and neglect. Next came the
            painstaking process of sanding and removing the old paint, preparing the boat for a fresh coat that would
            bring back its original luster. Every detail was attended to, every hardware and electrical component
            carefully inspected and restored to working condition.</p>
        <br/>
        <br/>
        <div className={'project-imgs-flex-box-no-wrap'}>
            <div>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-painted-with-floor-1.png'} alt={''}/>
            </div>

            <div>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-painted-with-floor-2.png'} alt={''}/>
            </div>
        </div>
        <br/>
        <p>A stroke of luck came in the form of a 1983 Evinrude 70hp motor, purchased for a mere $300. Though not
            running at the time of purchase, a few key repairs brought this gem back to life. A new battery, spark
            plugs, and replacement of wires between the ignition coils and spark plugs were all it took to get the motor
            running smoothly again.</p>
        <br/>

        <div className={'project-imgs-flex-box-no-wrap'}>
            <div>
                <img className={'project-img'}
                     src={'/boat-pictures/evinrude-70hp-painted.png'} alt={''}/>
            </div>
        </div>
        <br/>
        <p>But the restoration didn&apos;t stop there. To ensure the boat&apos;s longevity and reliability, a deep
            cleaning and
            maintenance routine was performed. The power pack, ignition coils, and timer base were replaced, and the
            carbs were thoroughly cleaned, ensuring that this boat would be ready for many more years of service.</p>
        <br/>
        <p>Today, this 1985 Alweld jon boat stands as a testament to the dedication and craftsmanship of its owner. A
            family legacy restored, a piece of history preserved, and a symbol of the enduring bond between generations.
            As it glides through the water, it carries with it the memories of the past and the promise of new
            adventures yet to come.</p>

        <h2 id={'fallout-mini-nuke-project'} className={'project-section-header'}>Fallout Mini Nuke</h2>
        <p>As a passionate fan of the Fallout video game series, I embarked on a challenging and rewarding 3D printing
            project to recreate the iconic mini nuke from the game. This project not only allowed me to showcase my
            technical skills in 3D printing but also gave me the opportunity to explore painting and weathering
            techniques to achieve an authentic post-apocalyptic look.</p>
        <p>I began by sourcing a detailed blueprint for the mini nuke from a platform like Thingiverse. Printing the
            various pieces required careful attention to detail to ensure they fit together seamlessly. After assembling
            the mini nuke, I moved on to the painting phase, applying base coats and then weathering techniques to
            create the appearance of chipped paint, rust, and dust.</p>
        <br/>
        <div className={'project-imgs-flex-box-no-wrap'}>
            <img src={'/fallout-mini-nuke/fallout-mini-nuke-before-weathering.png'} alt={''} className={'project-img'}/>
        </div>
        <br/>
        <p>The final result of this project was a striking replica of the mini nuke, complete with the weathered and
            aged look characteristic of the Fallout universe. This project not only honed my skills in 3D printing and
            finishing but also served as a testament to my dedication to detail and passion for immersive gaming
            experiences.</p>
        <br/>
        <div className={'project-imgs-flex-box-no-wrap'}>
            <img src={'/fallout-mini-nuke/finished-fallout-mini-nuke.png'} alt={''} className={'project-img'}/>
        </div>
        <br/>
        <p>Crafting the Fallout mini nuke through 3D printing was a fulfilling endeavor that allowed me to combine my
            love for gaming with my technical skills. This project remains a highlight of my 3D printing journey,
            showcasing my ability to bring digital creations to life in a tangible and visually striking form.</p>
        <br/>
        <h2 id={'destiny-ghost'} className={'project-section-header'}>3D printed Ghost Shell</h2>
        <p>As a fan of the Destiny game series, I embarked on a creative 3D printing project to recreate the first ghost
            shell from the game. This project allowed me to combine my passion for gaming with my love for 3D printing,
            resulting in a unique and detailed replica of this iconic in-game item.</p>
        <p>Using PLA filament, I meticulously printed each part of the ghost shell, ensuring that the colors matched
            those of the in-game model. To add a special touch, I incorporated a small light in the middle part of the
            shell, giving it an authentic glow reminiscent of the ghost&apos;s illumination in the game. The parts were
            cleverly designed to attach to the middle piece using magnets, allowing for easy assembly and
            disassembly.</p>
        <br/>
        <div className={'project-imgs-flex-box-no-wrap'}>
            <img className={'project-img'} src={'/3d-print-ghost-shell/ghost-shell-first-assembly.png'} alt={''}/>
            <img className={'project-img'} src={'/3d-print-ghost-shell/ghost-shell-core-with-light.png'} alt={''}/>
        </div>
        <br/>
        <p>The final result of this project was a stunning replica of the Destiny ghost shell, complete with its
            distinctive shape and glow. This project not only challenged my 3D printing skills but also allowed me to
            experiment with incorporating electronics into my prints, adding a new dimension to my creations.</p>
        <p>Crafting the Destiny ghost shell through 3D printing was a rewarding experience that allowed me to showcase
            my creativity and technical abilities. This project serves as a testament to my passion for gaming and 3D
            printing, highlighting my dedication to creating detailed and immersive replicas of iconic gaming items.</p>

        <br/>
    </div>;
}

export default Projects;