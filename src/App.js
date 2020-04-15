import React, {useState} from 'react';
import {getRandomShipPlacement, SetupBoard, isValidShipCount} from "./components/SetupBoard";
import './App.scss';
import {EnemyBoard} from "./components/EnemyBoard";
import {PlayerBoard} from "./components/PlayerBoard";

const gameStates = ["SETUP", "PLAYING", "FINISHED"]

function App() {
    const [gameState, setGameState] = useState("SETUP");

    const [playerPlacedShips, setPlayerPlacedShips] = useState(getRandomShipPlacement());
    const [playerPlacedShots, setPlayerPlacedShots] = useState([])
    const [playerPlacedAutoShots, setPlayerPlacedAutoShots] = useState([])

    const [computerPlacedShips, setComputerPlacedShips] = useState(getRandomShipPlacement());
    const [computerPlacedShots, setComputerPlacedShots] = useState([])
    const [computerPlacedAutoShots, setComputerPlacedAutoShots] = useState([])

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
                    gameState={gameState}
                    onStartClick={() => setGameState("PLAYING")}
                    isDisabled={gameState !== "PLAYING"}
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
                    isDisabled={gameState !== "PLAYING"}
                    useEnemyShips={[playerPlacedShips, setPlayerPlacedShips]}
                    usePlacedShots={[computerPlacedShots, setComputerPlacedShots]}
                    useAutoShots={[computerPlacedAutoShots, setComputerPlacedAutoShots]}/>
            </div>
        </div>
    )

}

export default App;
