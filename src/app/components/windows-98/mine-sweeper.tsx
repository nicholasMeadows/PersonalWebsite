'use client'
import '../../css/mine-sweeper.css'
import {useCallback, useEffect, useRef, useState} from "react";
import useMinesweeper, {Difficulty, GameState} from "@/app/hooks/use-minesweeper";

export default function MineSweeperWindow() {
    const mainGameBoxDivRef = useRef<HTMLDivElement>(null);
    const gameBoardDivRef = useRef<HTMLDivElement>(null);

    const [cellWidthHeight, setCellWidthHeight] = useState(10);

    const {
        board,
        initializeBoard,
        revealCell,
        flagCell,
        remainingMines,
        gameTimer,
        onCellMouseUp,
        onCellMouseDown,
        smileyImgUrl,
        gameState,
        resetGame,
        difficultyEnum,
        numRows,
        numCols,
        updateDifficulty
    } = useMinesweeper();

    useEffect(() => {
        const mainGameBoxDiv = mainGameBoxDivRef.current;
        const gameBoardDiv = gameBoardDivRef.current;
        if (mainGameBoxDiv === null || gameBoardDiv === null) {
            return;
        }
        const resizeObserver = new ResizeObserver(() => {
            const rect = mainGameBoxDiv.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            const colWidth = width / numCols;
            const rowWidth = height / numRows;
            setCellWidthHeight(colWidth < rowWidth ? colWidth : rowWidth)
        });
        resizeObserver.observe(mainGameBoxDiv);
        return () => {
            resizeObserver.unobserve(mainGameBoxDiv)
        }
    }, [numCols, numRows]);

    const getColorForNumber = useCallback((num: number) => {
        switch (num) {
            case 1:
                return 'blue';
            case 2:
                return 'green'
            case 3:
                return 'red'
            case 4:
                return 'purple'
            case 5:
                return 'maroon'
            case 6:
                return 'cyano'
            case 7:
                return 'iforgo'
            case 8:
                return 'gray'
            default:
                return '';
        }
    }, []);

    const getImgUrlForNumber = useCallback((num: number, digit: number) => {
        const numbersFolder = "minesweeper/numbers/"
        let numStr: string;
        if (num >= 0) {
            if (num < 10) {
                numStr = `00${num.toString()}`
            } else if (num < 100) {
                numStr = `0${num.toString()}`
            } else if (num > 999) {
                numStr = '999'
            } else {
                numStr = num.toString()
            }
        } else {
            if (num < -99) {
                numStr = '-99'
            } else if (num < -9) {
                numStr = `-${Math.abs(num).toString()}`
            } else {
                numStr = `-0${Math.abs(num).toString()}`
            }
        }

        if (digit >= numStr.length || digit < 0) {
            return `${numbersFolder}zero.png`
        }
        switch (numStr[digit]) {
            case '-':
                return `${numbersFolder}minus.png`
            case '0':
                return `${numbersFolder}zero.png`
            case '1':
                return `${numbersFolder}one.png`
            case '2':
                return `${numbersFolder}two.png`
            case '3':
                return `${numbersFolder}three.png`
            case '4':
                return `${numbersFolder}four.png`
            case '5':
                return `${numbersFolder}five.png`
            case '6':
                return `${numbersFolder}six.png`
            case '7':
                return `${numbersFolder}seven.png`
            case '8':
                return `${numbersFolder}eight.png`
            case '9':
                return `${numbersFolder}nine.png`
        }
    }, [])

    const [gameOptionsDialogState, setGameOptionsDialogState] = useState({
        show: false,
        top: 0
    });

    const difficultyButtonOnClick = useCallback((difficulty: Difficulty) => {
        setGameOptionsDialogState({...gameOptionsDialogState, show: false});
        updateDifficulty(difficulty)
    }, [gameOptionsDialogState, updateDifficulty])

    const gameOptionsDivRef = useRef<HTMLDivElement>(null)
    return <div className={'mine-sweeper-window'} onClick={(event) => {
        const gameOptionDiv = gameOptionsDivRef.current
        if (gameOptionDiv !== null) {
            if (!gameOptionDiv.contains(event.target as HTMLDivElement)) {
                setGameOptionsDialogState({...gameOptionsDialogState, show: false});
            }
        }
    }}>
        <div className={'mine-sweeper-options-box'}>
            <p onClick={(event) => {
                setGameOptionsDialogState({
                    top: event.currentTarget.clientTop + event.currentTarget.clientHeight + 5,
                    show: !gameOptionsDialogState.show
                })
            }}>Game</p>
        </div>
        {gameOptionsDialogState.show &&
            <div className={'game-options-dialog'} style={{
                top: `${gameOptionsDialogState.top}px`
            }} ref={gameOptionsDivRef}>
                <div className={'difficulty-option-box'} onClick={() =>
                    difficultyButtonOnClick(Difficulty.Beginner)
                }>
                    <div
                        className={`difficulty-selected-box ${difficultyEnum === Difficulty.Beginner ? 'selected' : ''}`}></div>
                    <p>Beginner</p>
                </div>
                <div className={'difficulty-option-box'}
                     onClick={() => difficultyButtonOnClick(Difficulty.Intermediate)}>
                    <div
                        className={`difficulty-selected-box ${difficultyEnum === Difficulty.Intermediate ? 'selected' : ''}`}></div>
                    <p>Intermediate</p>
                </div>
                <div className={'difficulty-option-box'} onClick={() => difficultyButtonOnClick(Difficulty.Expert)}>
                    <div
                        className={`difficulty-selected-box ${difficultyEnum === Difficulty.Expert ? 'selected' : ''}`}></div>
                    <p>Expert</p>
                </div>
            </div>
        }


        <div className={'game-box border-normal'}>
            <div className={'game-box-header border-inset'}>
                <div className={'border-inset'}>
                    <img src={getImgUrlForNumber(remainingMines, 0)} alt={''}/>
                    <img src={getImgUrlForNumber(remainingMines, 1)} alt={''}/>
                    <img src={getImgUrlForNumber(remainingMines, 2)} alt={''}/>
                </div>
                <div className={'smiley-box'} onClick={resetGame}>
                    <img src={smileyImgUrl} alt={''} className={'smiley-img'}/>
                </div>
                <div className={'border-inset'}>
                    <img src={getImgUrlForNumber(gameTimer, 0)} alt={''}/>
                    <img src={getImgUrlForNumber(gameTimer, 1)} alt={''}/>
                    <img src={getImgUrlForNumber(gameTimer, 2)} alt={''}/>
                </div>
            </div>
            <div className={'main-game-box'} ref={mainGameBoxDivRef}>
                <div className={'game-board border-inset'} ref={gameBoardDivRef}>
                    {board.map((row, i) => {
                        return <div key={i} className={'row'} style={{
                            // height: `calc((100% / ${numRows}) )`
                            height: `${cellWidthHeight}px`
                        }}>
                            {row.map((cell, j) => {
                                return <div key={`${i}-${j}`}
                                            className={`cell-block ${cell.revealed ? 'revealed' : ''}`}
                                            style={{
                                                // width: `calc((100% / ${numCols}))`
                                                width: `${cellWidthHeight}px`
                                            }}>
                                    <div className={`outer-cell`}>
                                        <div className={`${cell.revealed && cell.isMine ? 'red-mine' : ''} inner-cell`}
                                             onClick={() => {
                                                 revealCell(i, j)
                                             }}
                                             onMouseDown={onCellMouseDown}
                                             onMouseUp={onCellMouseUp}
                                             onContextMenu={(event) => flagCell(event, i, j)}>

                                            {gameState === GameState.Lost &&
                                                <>

                                                    {cell.revealed && cell.isMine && !cell.flagged &&
                                                        <img src={'minesweeper/mine.png'} alt={''}
                                                             className={'img-in-cell'}/>
                                                    }

                                                    {!cell.revealed && cell.isMine && cell.flagged &&
                                                        <img src={'minesweeper/flag.png'} alt={''}
                                                             className={'img-in-cell'}/>
                                                    }

                                                    {!cell.revealed && !cell.isMine && cell.flagged &&
                                                        <img src={'minesweeper/missed_mine.png'} alt={''}
                                                             className={'img-in-cell'}/>
                                                    }

                                                    {!cell.revealed && cell.isMine && !cell.flagged &&
                                                        <img src={'minesweeper/mine.png'} alt={''}
                                                             className={'img-in-cell'}/>
                                                    }
                                                </>
                                            }

                                            {gameState === GameState.Playing &&
                                                <>
                                                    {!cell.revealed && cell.flagged &&
                                                        <img src={'minesweeper/flag.png'} alt={''}
                                                             className={'img-in-cell'}/>
                                                    }
                                                    {cell.revealed && cell.isMine &&
                                                        <img src={'minesweeper/mine.png'} alt={''}
                                                             className={'img-in-cell'}/>
                                                    }
                                                </>
                                            }

                                            {gameState === GameState.Won &&
                                                <>

                                                    {/*{cell.flagged || (!cell.flagged && cell.isMine) &&*/}
                                                    {!cell.revealed &&
                                                        <img src={'minesweeper/flag.png'} alt={''}
                                                             className={'img-in-cell'}/>
                                                    }
                                                </>
                                            }
                                            {cell.revealed &&
                                                <p style={{color: getColorForNumber(cell.count)}}>{cell.count > 0 ? cell.count : ''}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}