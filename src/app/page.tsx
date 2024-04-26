import './css/home-page.css'

export default function Home() {
    return (
        <div className={'home-page'}>
            <div className={'home-page-text'}>
                <p>Hello, I&apos;m Nick</p>
                <br/>
                <p className={'indent'}>Welcome to my corner of the internet! I&apos;m a Senior Software Developer
                    with a
                    passion for building scalable
                    and resilient web applications. With a strong background in Java, Spring Boot, HTML, CSS, and
                    Angular, I
                    strive to create innovative and efficient solutions that meet and exceed client
                    expectations.</p>
                <br/>
                <p className={'indent'}>In my professional journey, I&apos;ve had the opportunity to work on
                    diverse
                    projects, from developing dynamic
                    websites for credit card processing companies to crafting REST services for satellite imagery
                    provider.
                    My
                    focus on quality assurance ensures that every project I undertake is delivered to the highest
                    standards.</p>
                <br/>
                <p className={'indent'}>Whether you&apos;re here to learn more about my professional experience or
                    simply
                    share a passion for
                    technology
                    and creativity, I&apos;m thrilled to have you visit. Feel free to explore my website. Let&apos;s
                    innovate
                    and
                    inspire together!</p>
            </div>

            <img src={'/nicholas-picture-1.jpg'} alt={''} className={'home-page-img'}/>
        </div>
    )
}
