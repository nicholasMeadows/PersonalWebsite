import React from 'react';
import '../../css/projects.css'

function Projects() {
    return <div className={'projects-page'}>
        <div id={'sound-board'} className={'margin-padding-adjustment-for-nav first-project-section'}>
            <div className={'table-of-contents'}>
                <h3>Table of contents</h3>
                <div className={'table-of-contents-link-box'}>
                    <a href={'#sound-board'}><h4>Sound Board</h4></a>
                    <a href={'#reddit-watcher'}><h4>Reddit Watcher</h4></a>
                    <a href={'#home-automation'}><h4>Home Automation</h4></a>
                    <a href={'#boat-restoration'}><h4>Boat Restoration</h4></a>
                    <a href={'#fallout-mini-nuke-project'}><h4>Fallout Mini-Nuke</h4></a>
                    <a href={'#destiny-ghost'}><h4>Destiny Ghost</h4></a>
                </div>
            </div>
            <h2 className={'project-section-header'}>Sound Board</h2>
            <p>I&apos;ve always been fascinated by the intersection of technology and creativity. As a software
                developer
                with a passion for music and sound, I decided to combine my skills and interests by creating a custom
                soundboard application using Angular and Electron.</p>
            <p>The idea behind the project was simple yet exciting: I wanted to build a tool that would allow me to
                organize and play a collection of sound effects and audio clips with ease. But as with any software
                development endeavor, the journey from concept to completion was filled with challenges and learning
                opportunities.</p>
            <p>One of the key features of my soundboard is its ability to scan a folder in my music directory and
                automatically generate categories for sounds based on the sub-folders. This not only saves me time in
                organizing my sound library but also makes it incredibly intuitive to navigate and find the right sound
                when I need it.</p>
            <p>I also wanted my soundboard to be highly customizable, allowing me to output audio to specific devices
                and control the volume on an individual sound basis. Additionally, I implemented a feature that allows
                me to favorite my most used sounds, keeping them easily accessible at the top of the list.</p>
            <p>One of the major hurdles I faced during development was performance issues. Early on, the application was
                slow and unresponsive, especially when dealing with a large number of audio files. To address this, I
                had to rethink my approach and implement dynamic loading of different sections of the application and
                audio files only when they were needed. This not only improved the overall performance but also
                optimized memory usage.</p>
            <p>Despite the challenges, building this soundboard has been an incredibly rewarding experience. Not only
                have I honed my skills in Angular and Electron, but I&apos;ve also created a application that I use
                regularly for humor when playing games with friends. It&apos;s a testament to the power of combining
                passion with
                technology, and I look forward to continuing to refine and expand my soundboard in the future.</p>
        </div>

        <div id={'reddit-watcher'} className={'project-section margin-padding-adjustment-for-nav'}>
            <h2 className={'project-section-header'}>Reddit Watcher</h2>
            <p>Being an avid Reddit user, I often found myself spending a lot of time refreshing the website to stay
                updated with my favorite subreddits. This led me to embark on a project called Reddit Watcher, with the
                goal of creating a more efficient and enjoyable Reddit browsing experience.</p>
            <p>The initial version of Reddit Watcher was built using Electron and Angular. However, I soon encountered
                performance issues that needed to be addressed. One of the main issues was the rendering of all images
                in the DOM at once, leading to sluggish performance. To solve this, I implemented a system to only
                render images that were currently visible on the screen, significantly improving the application&apos;s
                responsiveness.</p>
            <p>Another major challenge I faced was memory management. The application would consume a large amount of
                memory over time, eventually crashing. Through meticulous debugging and analysis using developer tools,
                I discovered that memory leaks were caused by not unsubscribing from observables in Angular components.
                Once I implemented proper unsubscribe methods, the memory consumption was reduced drastically, and the
                application became much more stable.</p>
            <p>As my skills and interests evolved, I decided to rebuild Reddit Watcher using React, Redux, and Vite,
                with the goal of making it accessible on mobile devices. This transition allowed me to delve into the
                world of mobile app development using Ionic Capacitor for packaging. The process was a valuable learning
                experience, and I successfully brought Reddit Watcher to both desktop and mobile platforms.</p>
            <p>Overall, Reddit Watcher has not only improved my Reddit browsing experience but has also been a testament
                to my growth as a developer. It taught me the importance of performance optimization and efficient
                memory management, skills that I continue to apply in my projects. I look forward to further enhancing
                Reddit Watcher and exploring new technologies to create more innovative solutions in the future.</p>
        </div>

        <div id={'home-automation'} className={'project-section margin-padding-adjustment-for-nav'}>
            <h2 className={'project-section-header'}>Home Automation</h2>

            <p>The goal of my home automation project is to transform my living space into a smart and
                interconnected
                environment using Home Assistant, Node-RED, Alexa, and Philips Hue. This project has not only
                simplified
                my
                daily routines but has also added a new level of convenience and efficiency to my home.</p>
            <p>Through the use of automation scripts and routines, I&apos;ve been able to create personalized
                experiences
                tailored to my needs. For example, I have automated lighting based on motion sensors and time
                schedules,
                as
                well as integrated voice commands for controlling devices and playing music.</p>
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
            <p>I&apos;m constantly exploring new ways to enhance my home automation setup. Future plans include
                integrating
                more
                smart devices, such as smart thermostats and security cameras, as well as experimenting with
                advanced
                automation techniques to further streamline my home&apos;s operations.</p>
            <p>My home automation project has been a journey of exploration and innovation, allowing me to create a
                smart
                and connected home that meets my needs and enhances my quality of life. Through the use of
                cutting-edge
                technology and creative automation solutions, I&apos;ve been able to transform my living space into
                a
                truly
                modern and efficient environment.</p>

        </div>
        <div id={'boat-restoration'} className={'project-section margin-padding-adjustment-for-nav'}>
            <h2 className={'project-section-header'}>Boat Restoration</h2>
            <p>In 1985, a brand new Alweld jon boat and an Evinrude 70 horsepower motor were purchased by a proud
                grandfather, setting the stage for a family legacy that would span generations. Passed down from
                grandfather
                to father, and now to me, this boat has seen its fair share of adventures and challenges.</p>
            <p>After years of faithful service, the boat fell into disrepair, its paint chipped, its original motor
                transferred to
                another vessel, its seats and flooring destroyed by time and neglect. But in 2020, a new chapter
                began
                as
                I embarked on a mission to restore this family heirloom to its former glory.</p>
            <div className={'project-imgs-flex-box-no-wrap'}>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-before-sanding-and-painting.png'} alt={''}/>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-before-sanded.png'} alt={''}/>
            </div>
            <p>The restoration project started with a thorough cleaning, removing years of grime and neglect. Next
                came
                the
                painstaking process of sanding and removing the old paint, preparing the boat for a fresh coat that
                would
                bring back its original luster. Every detail was attended to, every hardware and electrical
                component
                carefully inspected and restored to working condition.</p>
            <div className={'project-imgs-flex-box-no-wrap'}>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-painted-with-floor-1.png'} alt={''}/>
                <img className={'project-img'}
                     src={'/boat-pictures/boat-painted-with-floor-2.png'} alt={''}/>
            </div>
            <p>A stroke of luck came in the form of a 1983 Evinrude 70hp motor, purchased for a mere $300. Though
                not
                running at the time of purchase, a few key repairs brought this gem back to life. A new battery,
                spark
                plugs, and replacement of wires between the ignition coils and spark plugs were all it took to get
                the
                motor
                running smoothly again.</p>
            <div className={'project-imgs-flex-box-no-wrap'}>
                <img className={'project-img'}
                     src={'/boat-pictures/evinrude-70hp-painted.png'} alt={''}/>
            </div>
            <p>But the restoration didn&apos;t stop there. To ensure the boat&apos;s longevity and reliability, a
                deep
                cleaning and
                maintenance routine was performed. The power pack, ignition coils, and timer base were replaced, and
                the
                carbs were thoroughly cleaned, ensuring that this boat would be ready for many more years of
                service.</p>
            <p>Today, this 1985 Alweld jon boat stands as a testament to the dedication and craftsmanship of its
                owner.
                A
                family legacy restored, a piece of history preserved, and a symbol of the enduring bond between
                generations.
                As it glides through the water, it carries with it the memories of the past and the promise of new
                adventures yet to come.</p>
        </div>
        <div id={'fallout-mini-nuke-project'} className={'project-section margin-padding-adjustment-for-nav'}>
            <h2 className={'project-section-header'}>Fallout Mini Nuke</h2>
            <p>As a passionate fan of the Fallout video game series, I embarked on a challenging and rewarding 3D
                printing
                project to recreate the iconic mini nuke from the game. This project not only allowed me to showcase my
                technical skills in 3D printing but also gave me the opportunity to explore painting and weathering
                techniques to achieve an authentic post-apocalyptic look.</p>
            <p>I began by sourcing a detailed blueprint for the mini nuke from a platform like Thingiverse. Printing the
                various pieces required careful attention to detail to ensure they fit together seamlessly. After
                assembling
                the mini nuke, I moved on to the painting phase, applying base coats and then weathering techniques to
                create the appearance of chipped paint, rust, and dust.</p>
            <div className={'project-imgs-flex-box-no-wrap'}>
                <img src={'/fallout-mini-nuke/fallout-mini-nuke-before-weathering.png'} alt={''}
                     className={'project-img'}/>
            </div>
            <p>The final result of this project was a striking replica of the mini nuke, complete with the weathered and
                aged look characteristic of the Fallout universe. This project not only honed my skills in 3D printing
                and
                finishing but also served as a testament to my dedication to detail and passion for immersive gaming
                experiences.</p>
            <div className={'project-imgs-flex-box-no-wrap'}>
                <img src={'/fallout-mini-nuke/finished-fallout-mini-nuke.png'} alt={''} className={'project-img'}/>
            </div>
            <p>Crafting the Fallout mini nuke through 3D printing was a fulfilling endeavor that allowed me to combine
                my
                love for gaming with my technical skills. This project remains a highlight of my 3D printing journey,
                showcasing my ability to bring digital creations to life in a tangible and visually striking form.</p>
        </div>
        <div id={'destiny-ghost'} className={'project-section margin-padding-adjustment-for-nav'}>
            <h2 className={'ads -header'}>3D printed Ghost Shell</h2>
            <p>As a fan of the Destiny game series, I embarked on a creative 3D printing project to recreate the first
                ghost
                shell from the game. This project allowed me to combine my passion for gaming with my love for 3D
                printing,
                resulting in a unique and detailed replica of this iconic in-game item.</p>
            <p>Using PLA filament, I meticulously printed each part of the ghost shell, ensuring that the colors matched
                those of the in-game model. To add a special touch, I incorporated a small light in the middle part of
                the
                shell, giving it an authentic glow reminiscent of the ghost&apos;s illumination in the game. The parts
                were
                cleverly designed to attach to the middle piece using magnets, allowing for easy assembly and
                disassembly.</p>
            <div className={'project-imgs-flex-box-no-wrap'}>
                <img className={'project-img'} src={'/3d-print-ghost-shell/ghost-shell-first-assembly.png'} alt={''}/>
                <img className={'project-img'} src={'/3d-print-ghost-shell/ghost-shell-core-with-light.png'} alt={''}/>
            </div>
            <p>The final result of this project was a stunning replica of the Destiny ghost shell, complete with its
                distinctive shape and glow. This project not only challenged my 3D printing skills but also allowed me
                to
                experiment with incorporating electronics into my prints, adding a new dimension to my creations.</p>
            <p>Crafting the Destiny ghost shell through 3D printing was a rewarding experience that allowed me to
                showcase
                my creativity and technical abilities. This project serves as a testament to my passion for gaming and
                3D
                printing, highlighting my dedication to creating detailed and immersive replicas of iconic gaming
                items.</p>
        </div>
    </div>;
}

export default Projects;