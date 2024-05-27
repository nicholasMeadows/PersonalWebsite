import React, {useRef} from "react";
import "../../css/windows-98-startup.css"

type Props = {
    powerLightOn: boolean,
    setPowerLightOn: (isOn: boolean) => void,
    onEnded: () => void
}
export default function Windows98Startup({onEnded, powerLightOn, setPowerLightOn}: Props) {
    const startupVideoRef = useRef<HTMLVideoElement>(null);

    return <div className={'startup-background'}>
        <div className={'power-button-and-text-wrapper'}>
            <div className={'power-button-wrapper'}>
                <div className={'power-button'} style={{zIndex: `${powerLightOn ? 15 : 50}`}} onMouseUp={() => {
                    const startupVideo = startupVideoRef.current
                    if (startupVideo !== null) {
                        setPowerLightOn(true);
                        startupVideo.volume = 0.2;
                        startupVideo.play();
                    }
                }}>
                    <div className={`button ${powerLightOn ? 'circle-on' : ''}`}>
                        <div className={`light ${powerLightOn ? 'bar-on' : ''}`}></div>
                    </div>
                </div>
            </div>
            <p>Turn On</p>
        </div>
        <video className={`startup-video ${powerLightOn ? 'startup-video-fade-in' : ''}`}
               style={{opacity: `${powerLightOn ? '1' : ''}`}} ref={startupVideoRef}
               onEnded={onEnded}>
            <source src={'microsoft-windows-98-startup.mp4'}/>
        </video>
    </div>
}