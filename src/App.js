import React, {useEffect, useState} from 'react';
import {getRandomShipPlacement, SetupBoard, isValidShipCount, placedShipsToBoard} from "./components/SetupBoard";
import './App.scss';
import {addHit, alreadyPlaced, EnemyBoard, getComputerShots, isSunken} from "./components/EnemyBoard";
import {PlayerBoard} from "./components/PlayerBoard";
import {getRandomInt} from "./core/util"

const gameStates = ["SETUP", "PLAYING", "FINISHED"]

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

const getRandomValidTarget = (shots, autoShots) => {
    let allPositions = [];

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            allPositions.push([x, y]);
        }
    }

    const filteredPos = allPositions
        .filter(([x, y]) => !alreadyPlaced(x, y, shots))
        .filter(([x, y]) => !alreadyPlaced(x, y, autoShots))


    return filteredPos[getRandomInt(0, filteredPos.length - 1)]
};


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
        // computer's turn to make a move
        if (gameState === "PLAYING" && !isPlayerTurn) {
            let woundedShip = playerPlacedShips.filter(ship => ship.hits?.length > 0 && !ship.isSunken)

            if (woundedShip[0]) {
                console.log("target wounded");
            } else {
                const [x, y] = getRandomValidTarget(computerPlacedShots, computerPlacedAutoShots);
                placeShot({x, y},
                    computerPlacedShots, setComputerPlacedShots,
                    computerPlacedAutoShots, setComputerPlacedAutoShots,
                    playerPlacedShips, setPlayerPlacedShips,
                    () => setIsPlayerTurn(true))
            }
        }
    }, [gameState, isPlayerTurn,
        computerPlacedShots, setComputerPlacedShots,
        computerPlacedAutoShots, setComputerPlacedAutoShots,
        playerPlacedShips, setPlayerPlacedShips,
        setIsPlayerTurn])

    return (
        <div className="App">
            <div className="App__row">
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
