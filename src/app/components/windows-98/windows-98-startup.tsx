import React, {useRef} from "react";
import "../../css/windows-98-startup.css"

type Props = {
    powerLightOn: boolean,
    setPowerLightOn: (isOn: boolean) => void,
    onEnded: () => void
}
export default function Windows98Startup({onEnded, powerLightOn, setPowerLightOn}: Props) {
    const startupAudioRef = useRef<HTMLAudioElement>(null)
    return <div className={'startup-background'}>
        <div className={'power-button-and-text-wrapper'}>
            <div className={'power-button-wrapper'}>
                <div className={'power-button'} style={{zIndex: `${powerLightOn ? 15 : 50}`}} onMouseUp={() => {
                    const startupAudio = startupAudioRef.current
                    if (startupAudio !== null) {
                        setPowerLightOn(true);
                        startupAudio.volume = 0.2;
                        startupAudio.play();
                    }
                }}>
                    <div className={`button ${powerLightOn ? 'circle-on' : ''}`}>
                        <div className={`light ${powerLightOn ? 'bar-on' : ''}`}></div>
                    </div>
                </div>
            </div>
            <p>Turn On</p>
        </div>
        <img className={`startup-animation ${powerLightOn ? 'startup-animation-fade-in' : ''}`}
             src={'windows_98_boot_screen.gif'}
             style={{opacity: `${powerLightOn ? '1' : ''}`}}/>
        <audio src={'windows_98_startup_sound.mp3'} ref={startupAudioRef} onEnded={onEnded}/>
    </div>
}