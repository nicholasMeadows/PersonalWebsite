import {MouseEvent, useCallback, useEffect, useRef, useState} from "react";

interface Cell {
    isMine: boolean
    revealed: boolean
    count: number,
    flagged: boolean
}

export enum GameState {
    PreGame, Playing, Won, Lost
}

const SMILEY_URL = 'minesweeper/smiley.png';
const SMILEY_WORRIED_URL = 'minesweeper/worried-smiley.png';
const SMILEY_DEAD_URL = 'minesweeper/smiley_dead.png'
const SMILEY_WON_URL = "minesweeper/smiley_won.png"

export enum Difficulty {
    Beginner, Intermediate, Expert
}

type MinesweeperConfig = {
    numRows: number,
    numCols: number,
    numMines: number,
    difficulty: Difficulty
}

export default function useMinesweeper() {
    const [config, setConfig] = useState<MinesweeperConfig>({
        numRows: 9,
        numCols: 9,
        numMines: 10,
        difficulty: Difficulty.Beginner
    })
    const [remainingMines, setRemainingMines] = useState(10);
    const [board, setBoard] = useState<Array<Array<Cell>>>([]);
    const [gameTimer, setGameTimer] = useState(0);
    const [gameState, setGameState] = useState(GameState.PreGame);
    const [smileyImgUrl, setSmileyImgUrl] = useState(SMILEY_URL);

    const gameTimerIntervalRef = useRef<NodeJS.Timeout>();

    const clearGameTimerInterval = useCallback(() => {
        if (gameTimerIntervalRef.current !== null) {
            clearInterval(gameTimerIntervalRef.current);
        }
    }, [])

    const setupGameTimerInterval = useCallback(() => {
        clearGameTimerInterval();
        gameTimerIntervalRef.current = setInterval(() => {
            setGameTimer(gameTimer + 1);
        }, 1000)
    }, [clearGameTimerInterval, gameTimer])

    useEffect(() => {
        if (gameState === GameState.PreGame) {
            clearGameTimerInterval();
            setGameTimer(0);
        } else if (gameState === GameState.Playing) {
            setupGameTimerInterval();
        }
    }, [clearGameTimerInterval, gameState, setupGameTimerInterval]);

    const initializeBoard = useCallback((numRows: number, numCols: number, numMines: number) => {
        const boardToSet = new Array<Array<Cell>>();
        for (let i = 0; i < numRows; i++) {
            const row = new Array<Cell>()
            for (
                let j = 0;
                j < numCols;
                j++
            ) {
                row.push({
                    isMine: false,
                    revealed: false,
                    count: 0,
                    flagged: false
                });
            }
            boardToSet.push(row);
        }

        // Place mines randomly
        let minesPlaced = 0;
        while (minesPlaced < numMines) {
            const row = Math.floor(
                Math.random() * numRows
            );
            const col = Math.floor(
                Math.random() * numCols
            );
            if (!boardToSet[row][col].isMine) {
                boardToSet[row][col].isMine = true;
                minesPlaced++;
            }
        }

        // Calculate counts
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (!boardToSet[i][j].isMine) {
                    let count = 0;
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            const ni = i + dx;
                            const nj = j + dy;
                            if (ni >= 0 &&
                                ni < numRows &&
                                nj >= 0 &&
                                nj < numCols &&
                                boardToSet[ni][nj].isMine
                            ) {
                                count++;
                            }
                        }
                    }
                    boardToSet[i][j].count = count;
                }
            }
        }
        setBoard(boardToSet)
    }, [])

    useEffect(() => {
        initializeBoard(config.numRows, config.numCols, config.numMines);
    }, [config.numCols, config.numMines, config.numRows, initializeBoard]);

    const checkWinCondition = useCallback((updatedBoard: Array<Array<Cell>>) => {
        for (const row of updatedBoard) {
            for (const cell of row) {
                if (!cell.revealed && !cell.isMine) {
                    return;
                }
            }
        }
        clearGameTimerInterval();
        setGameState(GameState.Won);
        setSmileyImgUrl(SMILEY_WON_URL);
    }, [clearGameTimerInterval])

    const revealCell = useCallback((row: number, col: number) => {
        if (row < 0 ||
            row >= config.numRows ||
            col < 0 ||
            col >= config.numCols ||
            board[row][col].revealed || (gameState !== GameState.PreGame && gameState !== GameState.Playing)
        ) {
            return;
        }
        const updatedBoard = [...board];
        updatedBoard[row][col].revealed = true;

        if (updatedBoard[row][col].isMine) {
            // Handle game over
            clearGameTimerInterval();
            setSmileyImgUrl(SMILEY_DEAD_URL);
            setGameState(GameState.Lost)
        } else if (
            updatedBoard[row][col].count === 0
        ) {
            // If cell has no mines nearby,
            // Reveal adjacent cells
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    revealCell(
                        row + dx,
                        col + dy
                    );
                }
            }
        }

        setBoard(updatedBoard);
        checkWinCondition(updatedBoard);
    }, [board, checkWinCondition, clearGameTimerInterval, config.numCols, config.numRows, gameState])

    const flagCell = useCallback((event: MouseEvent, row: number, column: number) => {
        event.preventDefault();
        event.stopPropagation();
        const cell = board[row][column];
        if (cell.revealed || (gameState !== GameState.PreGame && gameState !== GameState.Playing)) {
            return
        }
        cell.flagged = !cell.flagged;

        let flaggedOrQuestionedCells = 0;
        for (const row of board) {
            for (const cell of row) {
                if (cell.flagged) {
                    flaggedOrQuestionedCells++;
                }
            }
        }
        setBoard([...board])
        setRemainingMines(config.numMines - flaggedOrQuestionedCells);
    }, [board, config.numMines, gameState])

    const onCellMouseDown = useCallback(() => {
        if (gameState !== GameState.Lost) {
            setSmileyImgUrl(SMILEY_WORRIED_URL);
        }
    }, [gameState])
    const onCellMouseUp = useCallback(() => {
        if (gameState === GameState.PreGame) {
            setGameState(GameState.Playing)
            setSmileyImgUrl(SMILEY_URL);
        }
        if (gameState === GameState.Playing && (gameState === GameState.Playing || gameState === GameState.PreGame)) {
            setSmileyImgUrl(SMILEY_URL);
        }
    }, [gameState])

    const resetGame = useCallback(() => {
        clearGameTimerInterval()
        setGameState(GameState.PreGame);
        setSmileyImgUrl(SMILEY_URL);
        initializeBoard(config.numRows, config.numCols, config.numMines);
        setGameTimer(0)
        setRemainingMines(config.numMines);
    }, [clearGameTimerInterval, initializeBoard, config.numRows, config.numCols, config.numMines])

    const updateDifficulty = useCallback((updatedDifficulty: Difficulty) => {
        let updatedConfig = {...config};
        if (updatedDifficulty === Difficulty.Beginner) {
            updatedConfig = {
                numRows: 9,
                numCols: 9,
                numMines: 10,
                difficulty: Difficulty.Beginner
            }
        } else if (updatedDifficulty === Difficulty.Intermediate) {
            updatedConfig = {
                numRows: 16,
                numCols: 16,
                numMines: 40,
                difficulty: Difficulty.Intermediate
            }
        } else if (updatedDifficulty === Difficulty.Expert) {
            updatedConfig = {
                numRows: 16,
                numCols: 30,
                numMines: 99,
                difficulty: Difficulty.Expert
            }
        }
        setConfig(updatedConfig);
        clearGameTimerInterval();
        setGameState(GameState.PreGame)
        setSmileyImgUrl(SMILEY_URL)
        setGameTimer(0)
        setRemainingMines(updatedConfig.numMines);
    }, [clearGameTimerInterval, config])

    return {
        board: board,
        initializeBoard: initializeBoard,
        revealCell: revealCell,
        flagCell: flagCell,
        remainingMines: remainingMines,
        gameTimer: gameTimer,
        onCellMouseDown: onCellMouseDown,
        onCellMouseUp: onCellMouseUp,
        smileyImgUrl: smileyImgUrl,
        gameState: gameState,
        resetGame: resetGame,
        checkWinCondition: checkWinCondition,
        difficultyEnum: config.difficulty,
        numRows: config.numRows,
        numCols: config.numCols,
        updateDifficulty: updateDifficulty
    }
}