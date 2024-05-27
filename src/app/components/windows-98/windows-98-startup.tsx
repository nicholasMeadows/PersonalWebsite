import React, {useRef, useState} from "react";
import "../../css/windows-98-startup.css"

type Props = {
    onEnded: () => void
}
export default function Windows98Startup({onEnded}: Props) {
    const [powerLightOn, setPowerLightOn] = useState(false)
    const startupVideoRef = useRef<HTMLVideoElement>(null);

    return <div className={'startup-background'}>
        <div className={'power-button-and-text-wrapper'}>
            <div className={'power-button-wrapper'}>
                <div className={'power-button'} onMouseUp={() => {
                    const startupVideo = startupVideoRef.current
                    if (startupVideo !== null) {
                        setPowerLightOn(true);
                        startupVideo.volume = 0.2;
                        startupVideo.play();
                    }
                }} style={{
                    opacity: `${powerLightOn ? '0' : ''}`
                }}>
                    <div className={`button ${powerLightOn ? 'circle-on' : ''}`}>
                        <div className={`light ${powerLightOn ? 'bar-on' : ''}`}></div>
                    </div>
                </div>
            </div>
            <p>Turn On</p>
        </div>
        <video className={'startup-video'} style={{opacity: `${powerLightOn ? '1' : ''}`}} ref={startupVideoRef}
               onEnded={onEnded}>
            <source src={'microsoft-windows-98-startup.mp4'}/>
        </video>
    </div>
}