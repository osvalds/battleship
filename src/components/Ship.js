import React, {useCallback, useState} from "react";
import {getRandomColor} from "../core/util";

function ShipContent({ship, setDraggedShip, cellSize = 10, gap = 1}) {
    const rows = ship.length;
    const cols = ship[0].length;

    const containerWidth = cellSize * cols + cols - 1;
    const containerHeight = cellSize * rows + rows - 1;


    const handleGrabbingShip = useCallback((x, y) => {
        setDraggedShip(ship, x, y)
    }, [setDraggedShip, ship]);


    return (
        <div className={`ship ship--${cols}`}
             onMouseDown={e => {
                 handleGrabbingShip(-1, -1)
             }}>
            <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`} xmlns="http://www.w3.org/2000/svg">
                {ship.map((row, y) => row.map((cell, x) => {
                    if (cell) {
                        return (
                            <rect
                                fill="#CF649A"
                                stroke={getRandomColor()}
                                x={(x) * cellSize + ((x) * gap)}
                                y={(y) * cellSize + ((y) * gap)}
                                width={cellSize}
                                height={cellSize}
                                onMouseDown={(e) => {
                                    handleGrabbingShip(x, y);
                                    e.stopPropagation();
                                }}
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
