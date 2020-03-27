import React, {useCallback, useEffect, useRef, useState} from "react";
import {getRandomColor} from "../core/util";
import {Ship} from "./Ship";

function BoardShip({x, y, template, cellSize = 10, gap = 1}) {
    return (
        <g>
            {template.map((row, ys) => row.map((cell, xs) => {
                if (cell) {
                    return (
                        <rect
                            // fill="#CF649A"
                            x={(x + xs + 1) * cellSize + ((x + xs + 1) * gap)}
                            y={(y + ys + 1) * cellSize + ((y + ys + 1) * gap)}
                            width={cellSize}
                            height={cellSize}
                        />
                    )
                } else {
                    return null;
                }
            }))}

        </g>
    )
}

export function Board({placedShips, draggingPosition, handleCellMouseEnter, hoveredCell, draggedShip}) {
    const boardCols = 11; // 10 cols + 1 for number
    const boardRows = 11; // 10 rows + 1 for letter

    const colNames = [..."KARTUPELIS"];
    const rowNames = Array(10).fill().map((_, i) => i + 1);

    const cellSize = 10;
    const gap = 1;

    const containerWidth = cellSize * boardCols + boardCols;
    const containerHeight = cellSize * boardRows + boardRows;

    const boardRef = useRef(null);
    const [boundingPosition, setBoundingPosition] = useState(0);

    useEffect(() => {
        const boardSVG = boardRef.current;

        setBoundingPosition(boardSVG.getBoundingClientRect());
    }, [boardRef])


    const handleMouseMove = useCallback((e) => {
    }, []);


    // const draggedShip = placedShips.filter(ship => ship.isDragging)[0]
    // const commitedShips = placedShips.filter(ship => !ship.isDragging)
    // console.log("draggedShip", draggedShip)
    return (
        <div>
            <div className="board"
                 onMouseEnter={e => console.log("board mouse enter")}
                 onMouseUp={e => console.log("board drop")}
                 onMouseMove={e => console.log("board mouse move")}>

                {draggedShip && draggedShip.isDragging &&
                <div style={{
                    position: "fixed",
                    left: draggingPosition.x,
                    top: draggingPosition.y,
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)"
                }}>
                    <Ship ship={draggedShip.template}/>
                </div>}


                <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                     ref={boardRef}
                     onMouseMove={handleMouseMove}
                     onMouseLeave={() => handleCellMouseEnter({x: -1, y: -1})}
                     xmlns="http://www.w3.org/2000/svg">
                    <g className="letter-row">
                        {colNames.map((letter, index) => {
                            return (
                                <g key={letter}>
                                    <rect stroke={getRandomColor()}
                                          fill="transparent"
                                          x={(index + 1) * cellSize + ((index + 1) * gap)}
                                          y="0"
                                          width={cellSize}
                                          height={cellSize}
                                          onMouseEnter={() => handleCellMouseEnter({x: -1, y: -1})}
                                    />
                                    <text
                                        x={(index + 1) * cellSize + (index * gap)}
                                        y={cellSize}
                                        transform="translate(3,-2)"
                                        textLength={cellSize}
                                        fill="white"
                                        style={{fontSize: "9"}}
                                    >
                                        {letter}
                                    </text>
                                </g>
                            )
                        })}

                    </g>
                    <g className="number-col">
                        {rowNames.map((num, index) => {
                            return (
                                <g key={num}>
                                    <rect stroke={getRandomColor()}
                                          fill="transparent"
                                          x="0"
                                          y={(index + 1) * cellSize + ((index + 1) * gap)}
                                          width={cellSize}
                                          height={cellSize}
                                          onMouseEnter={() => handleCellMouseEnter({x: -1, y: -1})}
                                    />
                                    <text x="0"
                                          y={(index + 2) * cellSize + (index * gap)}
                                          textLength={cellSize}
                                          fill="white"
                                          transform="translate(0,-2)"
                                          onMouseEnter={() => handleCellMouseEnter({x: -1, y: -1})}
                                          style={{fontSize: "9"}}>
                                        {num}
                                    </text>
                                </g>
                            )
                        })}
                    </g>
                    <g className="blank-placeholders">
                        {colNames.map((letter, x) => {
                            return rowNames.map((num, y) => {
                                return (<rect key={`${letter}:${num}`}
                                              stroke={getRandomColor()}
                                              fill="white"
                                              x={(x + 1) * cellSize + ((x + 1) * gap)}
                                              y={(y + 1) * cellSize + ((y + 1) * gap)}
                                              width={cellSize}
                                              height={cellSize}
                                              onMouseEnter={() => handleCellMouseEnter({x: x, y: y})}
                                />)
                            })
                        })}
                    </g>
                    {
                        placedShips.map(ship => <BoardShip template={ship.template} x={ship.x} y={ship.y}/>)
                    }
                    {draggedShip && draggedShip.isSnapping &&
                    <g style={{
                        // position: "fixed",
                        // left: draggingPosition.x,
                        // top: draggingPosition.y,
                        pointerEvents: "none",
                        fill: draggedShip.inBounds
                        // transform: "translate(-50%, -50%)"
                    }}>
                        <BoardShip template={draggedShip.template} x={draggedShip.x} y={draggedShip.y}/>
                    </g>}

                </svg>
            </div>
            <div className="debug">
                Board width: {JSON.stringify(boundingPosition)}
            </div>
            <div className="debug">
                Hover position: {JSON.stringify(hoveredCell)}
            </div>
        </div>
    )

}
