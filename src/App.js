import React, {useState} from 'react';
import './App.scss';
import {Board} from "./components/Board";
import {ShipSelector} from "./components/ShipSelector";
import {Ship} from "./components/Ship";

function App() {
    const [draggedShip, setDraggedShip] = useState(null);
    const [position, setPosition] = useState({x: 0, y: 0});

    return (
        <div className="App"
             onMouseDown={e => {
                 // console.log("app mouse down");
                 // console.log(e.target);
                 setPosition({x: e.clientX, y: e.clientY})
             }}
             onMouseMove={(e) => {
                 // console.log(e.target)
                 if (draggedShip !== null && (e.buttons === 1 || e.buttons === 3)) {
                     setPosition({x: e.clientX, y: e.clientY})
                 }
             }}
             onMouseUp={e => setDraggedShip(null)}
        >
            {draggedShip &&
            <div style={{
                position: "fixed",
                left: position.x,
                top: position.y,
                pointerEvents: "none",
                transform: "translate(-50%, -50%)"
            }}>
                <Ship ship={draggedShip}/>
            </div>}

            <Board/>
            <ShipSelector setDraggedShip={setDraggedShip}/>
        </div>
    );
}

export default App;
