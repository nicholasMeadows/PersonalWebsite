import "../../css/windows-screen-saver.css"
import {useEffect, useRef} from "react";

export default function WindowsScreenSaver({screenSaverOn}: { screenSaverOn: boolean }) {
    const videoElementRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        const videoElement = videoElementRef.current;
        if (videoElement !== null) {
            if (screenSaverOn) {
                videoElement.fastSeek(0)
                videoElement.volume = 0;
                videoElement.play();
            } else {
                videoElement.pause()
            }
        }
    }, [screenSaverOn]);

    return <div className={'screen-saver'}>
        <video loop={true} ref={videoElementRef}>
            <source src={'windows-98-maze-screensaver.mp4'}/>
        </video>
    </div>
}