import React, {useState} from "react";

function ShipContent({ship, setDraggedShip}) {
    const rows = ship.length;
    const cols = ship[0].length;

    const cellSize = 10;
    const gap = 1;

    const containerWidth = cellSize * cols + cols - 1;
    const containerHeight = cellSize * rows + rows - 1;

    const [isDragged, setIsDragged] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});

    return (
        <div className={`ship ship--${cols} ship--dragged-${isDragged}`}
             style={{
                 // left: position.x,
                 // top: position.y,
             }}
             onMouseDown={e => {
                 console.log("mousedown");
                 // setPosition({x: e.clientX, y: e.clientY})
                 // setIsDragged(true)
                 setDraggedShip(ship);
             }}
             onMouseUp={e => {
                 console.log("mouseup");
                 // setPosition({x: 0, y: 0})
                 // setIsDragged(false)
             }}
             onMouseLeave={(e) => {
                 console.log("Leave");
                 // if (isDragged && (e.buttons === 1 || e.buttons === 3)) {
                 //     setPosition({x: e.clientX, y: e.clientY})
                 // }
             }}
             onMouseMove={(e) => {
                 console.log("mouseMove");
                 // if (isDragged && (e.buttons === 1 || e.buttons === 3)) {
                 //     setPosition({x: e.clientX, y: e.clientY})
                 // }
             }}>
            <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`} xmlns="http://www.w3.org/2000/svg">
                {ship.map((row, y) => row.map((cell, x) => {
                    if (cell) {
                        return (
                            <rect
                                fill="#CF649A"
                                x={(x) * cellSize + ((x) * gap)}
                                y={(y) * cellSize + ((y) * gap)}
                                width={cellSize}
                                height={cellSize}
                            />
                        )
                    } else {
                        return null;
                    }
                }))}
            </svg>
        </div>
    )
}

export function Ship({ship, setDraggedShip}) {
    if (ship === null) {
        return null;
    } else {
        return <ShipContent ship={ship} setDraggedShip={setDraggedShip}/>
    }



}
