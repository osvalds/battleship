import React, {useState} from 'react';
import {getRandomShipPlacement, SetupBoard} from "./components/SetupBoard";
import './App.scss';
import {getRandomColor} from "./core/util";

const gameStates = ["SETUP", "PLAYING", "FINISHED"]

function App() {
    const [playerPlacedShips, setPlayerPlacedShips] = useState([]);
    const [computerPlacedShips, setComputerPlacedShips] = useState(getRandomShipPlacement());



    return (
        <div className="App">
            <SetupBoard usePlacedShips={[playerPlacedShips, setPlayerPlacedShips]}/>
        </div>

    )

}

export default App;
