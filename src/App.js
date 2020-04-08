import React, {useState} from 'react';
import {getRandomShipPlacement, SetupBoard} from "./components/SetupBoard";
import './App.scss';
import {EnemyBoard} from "./components/EnemyBoard";

const gameStates = ["SETUP", "PLAYING", "FINISHED"]

function App() {
    const [playerPlacedShips, setPlayerPlacedShips] = useState(getRandomShipPlacement());
    const [playerPlacedShots, setPlayerPlacedShots] = useState([])

    const [computerPlacedShips, setComputerPlacedShips] = useState(getRandomShipPlacement());
    const [computerPlacedShots, setComputerPlacedShots] = useState([])


    return (
        <div className="App">
            <div className="App__row">

                <SetupBoard
                    title="🧗‍ board"
                    usePlacedShips={[playerPlacedShips, setPlayerPlacedShips]}/>

                <EnemyBoard
                    title="🤖's board (enemy)"
                    useEnemyShips={[computerPlacedShips, setComputerPlacedShips]}
                    usePlacedShots={[playerPlacedShots, setPlayerPlacedShots]}/>

            </div>
            <div className="App__row">
                <SetupBoard
                    title="🤖's board"
                    usePlacedShips={[computerPlacedShips, setComputerPlacedShips]}/>
                <EnemyBoard
                    title="🧗‍ board (enemy)"
                    useEnemyShips={[playerPlacedShips, setPlayerPlacedShips]}
                    usePlacedShots={[computerPlacedShots, setComputerPlacedShots]}/>
            </div>
        </div>
    )

}

export default App;
