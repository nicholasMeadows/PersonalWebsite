import '../../css/windows-98-app-window.css'
import React, {MouseEvent as ReactMouseEvent, ReactNode, useCallback, useContext, useEffect, useRef} from "react";
import Windows98AppWindowContext from "@/app/context/windows-98-app-window-context";

type Props = {
    children: ReactNode
}
export default function Windows98AppWindow({children}: Props) {
    const {
        appWindowModel,
        closeWindow,
        setPosition,
        setSize,
        setIsMaximized,
        setIsMinimized,
        setIsFocused
    } = useContext(Windows98AppWindowContext);
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
        setPosition(appWindowModel.appName, {
            left: event.clientX - windowHeaderMouseOffset.current.x,
            top: event.clientY - windowHeaderMouseOffset.current.y
        })
    }, [appWindowModel.appName, appWindowModel.isMaximized, setIsMaximized, setPosition]);

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
                x: appWindowModel.size.width * (currentXOffsetPercent / 100),
                y: appWindowModel.size.height * (currentYOffsetPercent / 100)
            }
        } else {
            windowHeaderMouseOffset.current = {
                x: event.clientX - appWindowModel.position.left,
                y: event.clientY - appWindowModel.position.top
            }
        }
        mouseDownOnWindowHeader.current = true
    }, [appWindowModel.isMaximized, appWindowModel.position.left, appWindowModel.position.top, appWindowModel.size.height, appWindowModel.size.width])

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
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width - deltaX,
                height: appWindowModel.size.height - deltaY,
            })
            setPosition(appWindowModel.appName, {
                left: appWindowModel.position.left + deltaX,
                top: appWindowModel.position.top + deltaY
            })
        } else if (resizerClassList.includes('resizer-top-right')) {
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width + deltaX,
                height: appWindowModel.size.height - deltaY,
            })
            setPosition(appWindowModel.appName, {
                left: appWindowModel.position.left,
                top: appWindowModel.position.top + deltaY
            })
        } else if (resizerClassList.includes('resizer-bottom-right')) {
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width + deltaX,
                height: appWindowModel.size.height + deltaY,
            })
        } else if (resizerClassList.includes('resizer-bottom-left')) {
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width - deltaX,
                height: appWindowModel.size.height + deltaY,
            })
            setPosition(appWindowModel.appName, {
                left: appWindowModel.position.left + deltaX,
                top: appWindowModel.position.top
            })
        } else if (resizerClassList.includes('resizer-right')) {
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width + (event.clientX - lastResizerMouseDown.current.x),
                height: appWindowModel.size.height,
            })
        } else if (resizerClassList.includes('resizer-left')) {
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width - deltaX,
                height: appWindowModel.size.height,
            })
            setPosition(appWindowModel.appName, {
                left: appWindowModel.position.left + deltaX,
                top: appWindowModel.position.top
            })
        } else if (resizerClassList.includes('resizer-bottom')) {
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width,
                height: appWindowModel.size.height + deltaY,
            })
        } else if (resizerClassList.includes('resizer-top')) {
            setSize(appWindowModel.appName, {
                width: appWindowModel.size.width,
                height: appWindowModel.size.height - deltaY,
            })
            setPosition(appWindowModel.appName, {
                left: appWindowModel.position.left,
                top: appWindowModel.position.top + deltaY
            })
        }
        lastResizerMouseDown.current = {x: event.clientX, y: event.clientY}
    }, [appWindowModel.appName, appWindowModel.position.left, appWindowModel.position.top, appWindowModel.size.height, appWindowModel.size.width, setPosition, setSize])

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
                    left: `${appWindowModel.isMaximized ? 0 : appWindowModel.position.left}px`,
                    top: `${appWindowModel.isMaximized ? 0 : appWindowModel.position.top}px`,
                    bottom: `${appWindowModel.isMaximized ? 'calc(0px + var(--start-bar-height) + var(--start-bar-border-top-width))' : 'unset'}`,
                    right: `${appWindowModel.isMaximized ? '0px' : 'unset'}`,
                    width: `${appWindowModel.isMaximized ? 'unset' : appWindowModel.size.width + 'px'}`,
                    height: `${appWindowModel.isMaximized ? 'unset' : appWindowModel.size.height + 'px'}`,
                    display: `${appWindowModel.isMinimized ? 'none' : ''}`,
                    zIndex: appWindowModel.zIndex
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