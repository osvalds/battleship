import React, {useEffect, useState} from 'react';
import {getRandomShipPlacement, SetupBoard, isValidShipCount, placedShipsToBoard} from "./components/SetupBoard";
import './App.scss';
import {addHit, alreadyPlaced, EnemyBoard, getComputerShots, isSunken} from "./components/EnemyBoard";
import {PlayerBoard} from "./components/PlayerBoard";
import {getRandomInt} from "./core/util"

const placeShot = ({x, y}, placedShots, setPlacedShots, placedComputerShots, setPlacedComputerShots, enemyShips, setEnemyShips, onMissedShot) => {
    let newPlaced = [...placedShots];
    const board = placedShipsToBoard(enemyShips);

    if (board[y][x]) {
        let newPlaced = enemyShips.filter(sh => sh.uuid !== board[y][x]);
        let targetShip = enemyShips.filter(s => s.uuid === board[y][x])[0];
        targetShip = addHit(targetShip, x, y);

        if (isSunken(targetShip)) {
            targetShip.isSunken = true;
            setPlacedComputerShots(placedComputerShots.concat(getComputerShots(targetShip, placedShots, placedComputerShots)))
        }
        setEnemyShips(newPlaced.concat([targetShip]))

    } else {
        onMissedShot()
        setPlacedShots(newPlaced.concat([[x, y]]));
    }
};

const getRandomValidTarget = (ships, shots, autoShots) => {
    const shipShots = ships.map(ship => ship.hits)
        .filter(hit => hit !== undefined)
        .flat()

    let allPositions = [];

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            allPositions.push([x, y]);
        }
    }

    const filteredPos = allPositions
        .filter(([x, y]) => !alreadyPlaced(x, y, shipShots))
        .filter(([x, y]) => !alreadyPlaced(x, y, shots))
        .filter(([x, y]) => !alreadyPlaced(x, y, autoShots))


    return filteredPos[getRandomInt(0, filteredPos.length - 1)]
};

const findTargets = ({hits}, shots, autoShots) => {
    let pHits = [];

    const diffs = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    for (let [hx, hy] of hits) {
        for (let [xd, yd] of diffs) {
            const ny = hy + yd;
            const nx = hx + xd;
            if ((ny > -1 && ny < 10) &&
                (nx > -1 && nx < 10) &&
                !alreadyPlaced(nx, ny, shots) &&
                !alreadyPlaced(nx, ny, hits) &&
                !alreadyPlaced(nx, ny, autoShots)) {
                pHits.push([nx, ny])
            }
        }
    }
    return pHits[getRandomInt(0, pHits.length - 1)]
}

function GameFinished({playerShips, computerShips, isPlayerTurn}) {
    if (isPlayerTurn &&
        computerShips.every(s => s.isSunken)) {
        return (
            <h2 className="u-h2">
                Congrats, you won!
            </h2>
        )
    } else {
        return (
            <h2 className="u-h2">
                Tough luck, the Computer won!
            </h2>
        )
    }

}

function App() {
    const [gameState, setGameState] = useState("SETUP");
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    const [playerPlacedShips, setPlayerPlacedShips] = useState(getRandomShipPlacement());
    const [playerPlacedShots, setPlayerPlacedShots] = useState([])
    const [playerPlacedAutoShots, setPlayerPlacedAutoShots] = useState([])

    const [computerPlacedShips, setComputerPlacedShips] = useState(getRandomShipPlacement());
    const [computerPlacedShots, setComputerPlacedShots] = useState([])
    const [computerPlacedAutoShots, setComputerPlacedAutoShots] = useState([])

    useEffect(() => {
        let timer = null;
        // computer's turn to make a move
        if (gameState === "PLAYING" && !isPlayerTurn) {
            timer = setTimeout(() => {
                let woundedShip = playerPlacedShips.filter(ship => ship.hits?.length > 0 && !ship.isSunken)

                if (woundedShip[0]) {
                    const [x, y] = findTargets(woundedShip[0], computerPlacedShots, computerPlacedAutoShots)
                    // console.log("target wounded");
                    // console.log()
                    placeShot({x, y},
                        computerPlacedShots, setComputerPlacedShots,
                        computerPlacedAutoShots, setComputerPlacedAutoShots,
                        playerPlacedShips, setPlayerPlacedShips,
                        () => setIsPlayerTurn(true))
                } else {
                    const [x, y] = getRandomValidTarget(playerPlacedShips, computerPlacedShots, computerPlacedAutoShots);
                    placeShot({x, y},
                        computerPlacedShots, setComputerPlacedShots,
                        computerPlacedAutoShots, setComputerPlacedAutoShots,
                        playerPlacedShips, setPlayerPlacedShips,
                        () => setIsPlayerTurn(true))
                }
            }, 400)

        }
        return () => clearTimeout(timer)
    }, [gameState, isPlayerTurn,
        computerPlacedShots, setComputerPlacedShots,
        computerPlacedAutoShots, setComputerPlacedAutoShots,
        playerPlacedShips, setPlayerPlacedShips,
        setIsPlayerTurn])

    useEffect(() => {
        if (computerPlacedShips.every(ship => ship.isSunken) ||
            (playerPlacedShips.every(ship => ship.isSunken) && playerPlacedShips.length > 0)) {
            setGameState("FINISHED")
        }
    }, [playerPlacedShips, computerPlacedShips, setGameState])

    return (
        <div className="App">
            <div className="App__row">
                {gameState === "FINISHED" &&
                <GameFinished playerShips={playerPlacedShips}
                              isPlayerTurn={isPlayerTurn}
                              computerShips={computerPlacedShips}/>
                }

                {gameState === "SETUP" &&
                <SetupBoard
                    title="🧗‍ board"
                    usePlacedShips={[playerPlacedShips, setPlayerPlacedShips]}/>
                }
                {gameState === "PLAYING" &&
                <PlayerBoard
                    title="🧗‍ board"
                    usePlacedShips={[playerPlacedShips, setPlayerPlacedShips]}
                    useTakenShots={[computerPlacedShots, setComputerPlacedShots]}
                    useTakenAutoShots={[computerPlacedAutoShots, computerPlacedAutoShots]}
                />
                }
                <EnemyBoard
                    title="🤖's board (enemy)"
                    gameCanStart={isValidShipCount(playerPlacedShips)}
                    onMissedShot={() => setIsPlayerTurn(false)}
                    gameState={gameState}
                    onStartClick={() => setGameState("PLAYING")}
                    isDisabled={gameState !== "PLAYING" || !isPlayerTurn}
                    useEnemyShips={[computerPlacedShips, setComputerPlacedShips]}
                    usePlacedShots={[playerPlacedShots, setPlayerPlacedShots]}
                    useAutoShots={[playerPlacedAutoShots, setPlayerPlacedAutoShots]}
                />
            </div>
            <div className="App__row">
                {gameState === "SETUP" &&
                <SetupBoard
                    title="🤖's board"
                    usePlacedShips={[computerPlacedShips, setComputerPlacedShips]}/>
                }
                {gameState === "PLAYING" &&
                <PlayerBoard
                    title="🧗‍ board"
                    usePlacedShips={[computerPlacedShips]}
                    useTakenShots={[playerPlacedShots]}
                    useTakenAutoShots={[playerPlacedAutoShots]}
                />
                }
                <EnemyBoard
                    title="🧗‍ board (enemy)"
                    gameState={gameState}
                    gameCanStart={isValidShipCount(playerPlacedShips)}
                    onStartClick={() => setGameState("PLAYING")}
                    onMissedShot={() => setIsPlayerTurn(true)}
                    isDisabled={gameState !== "PLAYING" || isPlayerTurn}
                    useEnemyShips={[playerPlacedShips, setPlayerPlacedShips]}
                    usePlacedShots={[computerPlacedShots, setComputerPlacedShots]}
                    useAutoShots={[computerPlacedAutoShots, setComputerPlacedAutoShots]}/>
            </div>
        </div>
    )
}

export default App;
