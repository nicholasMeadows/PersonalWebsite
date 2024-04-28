'use client';
import React, {useEffect, useState} from 'react';
import '../css/toggle-switch.css'

type Props = {
    checked?: boolean
    onToggle?: (toggledOn: boolean) => void,
    uncheckedImgUrl?: string
    checkImgUrl?: string,
}

function ToggleSwitch(props: Props) {
    const [switchImgUrl, setSwitchImgUrl] = useState('');
    useEffect(() => {
        if (props.checkImgUrl !== undefined && props.checked !== undefined && props.checked) {
            setSwitchImgUrl(props.checkImgUrl);
        } else if (props.uncheckedImgUrl !== undefined && props.checked !== undefined && !props.checked) {
            setSwitchImgUrl(props.uncheckedImgUrl);
        }
    }, [props.checkImgUrl, props.checked, props.uncheckedImgUrl]);

    return (
        <label className="switch">
            <input type="checkbox" checked={props.checked} onChange={(event) => {
                props.onToggle?.(event.target.checked);
            }}/>

            <span className="slider round">
                    <img src={switchImgUrl} alt={''} className={'slider-img'}/>
            </span>
        </label>
    );
}

export default ToggleSwitch;