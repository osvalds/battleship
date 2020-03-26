import React from "react";

export function Ship({ship}) {
    const rows = ship.length;
    const cols = ship[0].length;

    const cellSize = 10;
    const gap = 1;

    const containerWidth = cellSize * cols + cols - 1;
    const containerHeight = cellSize * rows + rows - 1;

    return (
        <div className={`ship ship--${cols}`} draggable="true">
            <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`} xmlns="http://www.w3.org/2000/svg">
                {ship.map((row, y) => row.map((cell, x) => {
                    if (cell) {
                        return (
                            <rect
                                fill="green"
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
