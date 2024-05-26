'use client'
import '../css/desktop-shortcut.css'
import {MouseEvent} from "react";

type Props = { iconSrc: string; iconTxt: string; onClick?: (event: MouseEvent) => void };
export default function DesktopShortcut(props: Props) {
    return <div className={'desktop-shortcut'} onClick={props.onClick}>
        <img src={props.iconSrc} alt={''}/>
        <p>{props.iconTxt}</p>
    </div>
}