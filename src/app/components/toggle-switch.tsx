'use client';
import React from 'react';
import '../css/toggle-switch.css'

type Props = {
    checked?: boolean
    onToggle?: (toggledOn: boolean) => void
}

function ToggleSwitch(props: Props) {
    return (
        <label className="switch">
            <input type="checkbox" checked={props.checked} onChange={(event) => {
                props.onToggle?.(event.target.checked);
            }}/>
            <span className="slider round"></span>
        </label>
    );
}

export default ToggleSwitch;