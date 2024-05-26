import '../css/windows-98-app-window.css'
import React, {MouseEvent as ReactMouseEvent, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {ApplicationWindowModel} from "@/app/pages/windows-98/page";

type Props = {
    children: ReactNode,
    appWindowModel: ApplicationWindowModel,
    setIsFocused: (appName: string, isFocused: boolean) => void,
    setIsMaximized: (appName: string, isMaximized: boolean) => void,
    setIsMinimized: (appName: string, isMinimized: boolean) => void,
    closeWindow: (appName: string) => void,
}
export default function Windows98AppWindow({
                                               children,
                                               appWindowModel,
                                               setIsFocused,
                                               setIsMinimized,
                                               setIsMaximized,
                                               closeWindow
                                           }: Props) {
    const [position, setPosition] = useState({left: 0, top: 0})
    const [size, setSize] = useState({width: 500, height: 400});

    const windowDivRef = useRef<HTMLDivElement>(null);
    const windowHeaderMouseOffset = useRef({x: 0, y: 0})
    const mouseDownOnWindowHeader = useRef(false);

    const moveWindow = useCallback((event: MouseEvent) => {
        if (!mouseDownOnWindowHeader.current) {
            return;
        }
        if (appWindowModel.isMaximized) {
            setIsMaximized(appWindowModel.appName, false);
        }
        setPosition({
            left: event.clientX - windowHeaderMouseOffset.current.x,
            top: event.clientY - windowHeaderMouseOffset.current.y
        })
    }, [appWindowModel.appName, appWindowModel.isMaximized, setIsMaximized]);

    const onWindowHeaderMouseDown = useCallback((event: ReactMouseEvent) => {
        const windowDiv = windowDivRef.current;
        if (windowDiv === null) {
            return;
        }
        const windowDivRect = windowDiv.getBoundingClientRect();

        if (appWindowModel.isMaximized) {
            const currentXOffsetPx = event.clientX - windowDivRect.left;
            const currentXOffsetPercent = (currentXOffsetPx / windowDivRect.width) * 100;

            const currentYOffsetPx = event.clientY - windowDivRect.top;
            const currentYOffsetPercent = (currentYOffsetPx / windowDivRect.height) * 100;

            windowHeaderMouseOffset.current = {
                x: size.width * (currentXOffsetPercent / 100),
                y: size.height * (currentYOffsetPercent / 100)
            }
        } else {
            windowHeaderMouseOffset.current = {
                x: event.clientX - position.left,
                y: event.clientY - position.top
            }
        }
        mouseDownOnWindowHeader.current = true
    }, [appWindowModel.isMaximized, position.left, position.top, size.height, size.width])

    const onWindowHeaderMouseUp = useCallback(() => {
        windowHeaderMouseOffset.current = {
            x: 0,
            y: 0
        }
        mouseDownOnWindowHeader.current = false
    }, [])

    const lastResizerMouseDown = useRef({x: 0, y: 0});
    const mouseDownOnResizerClassList = useRef<string | undefined>(undefined);
    const resizeWindow = useCallback((event: MouseEvent) => {
        const resizerClassList = mouseDownOnResizerClassList.current;
        if (mouseDownOnResizerClassList.current === undefined || resizerClassList === undefined) {
            return;
        }

        const deltaX = (event.clientX - lastResizerMouseDown.current.x);
        const deltaY = (event.clientY - lastResizerMouseDown.current.y);

        if (resizerClassList.includes('resizer-top-left')) {
            setSize({
                width: size.width - deltaX,
                height: size.height - deltaY,
            })
            setPosition({
                left: position.left + deltaX,
                top: position.top + deltaY
            })
        } else if (resizerClassList.includes('resizer-top-right')) {
            setSize({
                width: size.width + deltaX,
                height: size.height - deltaY,
            })
            setPosition({
                left: position.left,
                top: position.top + deltaY
            })
        } else if (resizerClassList.includes('resizer-bottom-right')) {
            console.log('test', deltaX)
            setSize({
                width: size.width + deltaX,
                height: size.height + deltaY,
            })
        } else if (resizerClassList.includes('resizer-bottom-left')) {
            setSize({
                width: size.width - deltaX,
                height: size.height + deltaY,
            })
            setPosition({
                left: position.left + deltaX,
                top: position.top
            })
        } else if (resizerClassList.includes('resizer-right')) {
            setSize({
                width: size.width + (event.clientX - lastResizerMouseDown.current.x),
                height: size.height,
            })
        } else if (resizerClassList.includes('resizer-left')) {
            setSize({
                width: size.width - deltaX,
                height: size.height,
            })
            setPosition({
                left: position.left + deltaX,
                top: position.top
            })
        } else if (resizerClassList.includes('resizer-bottom')) {
            setSize({
                width: size.width,
                height: size.height + deltaY,
            })
        } else if (resizerClassList.includes('resizer-top')) {
            setSize({
                width: size.width,
                height: size.height - deltaY,
            })
            setPosition({
                left: position.left,
                top: position.top + deltaY
            })
        }
        lastResizerMouseDown.current = {x: event.clientX, y: event.clientY}
    }, [position.left, position.top, size.height, size.width])

    const onResizerMouseDown = useCallback((event: ReactMouseEvent) => {
        mouseDownOnResizerClassList.current = (event.target as HTMLDivElement).className;
        lastResizerMouseDown.current = {x: event.clientX, y: event.clientY}
    }, [])
    const onResizerMouseUp = useCallback(() => {
        mouseDownOnResizerClassList.current = undefined;
        lastResizerMouseDown.current = {x: 0, y: 0}
    }, [])

    const resetMouseDownRefs = useCallback(() => {
        mouseDownOnWindowHeader.current = false;
        mouseDownOnResizerClassList.current = undefined;
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', moveWindow);
        window.addEventListener('mousemove', resizeWindow);
        window.addEventListener('mouseup', resetMouseDownRefs);
        return () => {
            window.removeEventListener('mousemove', moveWindow);
            window.removeEventListener('mousemove', resizeWindow);
            window.removeEventListener('mouseup', resetMouseDownRefs);
        }
    }, [moveWindow, resetMouseDownRefs, resizeWindow]);

    return <div className={`window  ${appWindowModel.isMaximized ? 'window-maximized' : ''}`}
                style={{
                    left: `${appWindowModel.isMaximized ? 0 : position.left}px`,
                    top: `${appWindowModel.isMaximized ? 0 : position.top}px`,
                    bottom: `${appWindowModel.isMaximized ? 'calc(0px + var(--start-bar-height) + var(--start-bar-border-top-width))' : 'unset'}`,
                    right: `${appWindowModel.isMaximized ? '0px' : 'unset'}`,
                    width: `${appWindowModel.isMaximized ? 'unset' : size.width + 'px'}`,
                    height: `${appWindowModel.isMaximized ? 'unset' : size.height + 'px'}`,
                    display: `${appWindowModel.isMinimized ? 'none' : ''}`,
                    zIndex: `${appWindowModel.isFocused ? '100' : '50'}`
                }} ref={windowDivRef} onMouseDownCapture={() => setIsFocused(appWindowModel.appName, true)}>
        <div className={'resizer resizer resizer-top'} onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}/>
        <div className={'resizer resizer resizer-right'} onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}/>
        <div className={'resizer resizer resizer-bottom'} onMouseDown={onResizerMouseDown}
             onMouseUp={onResizerMouseUp}/>
        <div className={'resizer resizer-left'} onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}/>
        <div className={'resizer resizer-top-left'} onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}/>
        <div className={'resizer resizer-top-right'} onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}/>
        <div className={'resizer resizer-bottom-right'} onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}/>
        <div className={'resizer resizer-bottom-left'} onMouseDown={onResizerMouseDown} onMouseUp={onResizerMouseUp}/>

        <div className={`window-header ${!appWindowModel.isFocused ? 'not-focused' : ''}`}
             onMouseUp={onWindowHeaderMouseUp}
             onMouseDown={onWindowHeaderMouseDown}>
            <img src={appWindowModel.iconUrl} alt={''} className={'application-icon'}/>
            <p className={'application-name'}>{appWindowModel.appName}</p>

            <div className={'application-window-control-box'}>
                <div className={'minimize-button'} onClick={() => {
                    setIsMinimized(appWindowModel.appName, true);
                    setIsFocused(appWindowModel.appName, false);
                }}>
                    <div/>
                </div>
                {!appWindowModel.isMaximized &&
                    <div className={'maximize-button'}
                         onClick={() => setIsMaximized(appWindowModel.appName, true)}>
                        <div/>
                    </div>
                }

                {appWindowModel.isMaximized &&
                    <div className={'windowed-button'}
                         onClick={() => setIsMaximized(appWindowModel.appName, false)}>
                        <div>
                            <div/>
                            <div/>
                        </div>
                    </div>
                }
                <div className={'close-button'}
                     onClick={() => closeWindow(appWindowModel.appName)}></div>
            </div>
        </div>
        <div className={'children-div'}>
            {children}
        </div>
    </div>
}