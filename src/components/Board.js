import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {getRandomColor} from "../core/util";
import {Ship} from "./Ship";

const cellSize = 10;
const gap = 1;
const boardCols = 11; // 10 cols + 1 for number
const boardRows = 11; // 10 rows + 1 for letter

const colNames = [..."KARTUPELIS"];
const rowNames = Array(10).fill().map((_, i) => i + 1);

const containerWidth = cellSize * boardCols + boardCols;
const containerHeight = cellSize * boardRows + boardRows;

function BoardShip({x, y, template, cellSize = 10, gap = 1, handleMouseDown, uuid}) {
    return (
        <g onMouseDown={() => handleMouseDown(-1, -1)}>
            {template.map((row, ys) => row.map((cell, xs) => {
                if (cell) {
                    return (
                        <rect
                            key={`${uuid}-${ys}-${xs}`}
                            onMouseDown={e => {
                                handleMouseDown(xs, ys);
                                e.stopPropagation()
                            }}
                            strokeWidth="2"
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

const getStrokeColor = (draggedShip) => {
    console.log(draggedShip);
    if (!draggedShip.inBounds) {
        return "yellow";
    } else if (draggedShip.isOverlapping) {
        return "red"
    }
    return "white";
};

const getTransform = (template, x, y) => {
    const rows = template.length;
    const cols = template[0].length;

    const colStep = 100 / cols;
    const rowStep = 100 / rows;

    return `translate(-${colStep / 2 + colStep * x}%, -${rowStep / 2 + rowStep * y}%)`
};

const LetterRow = React.memo(({letters, handleMouseEnter}) => {
    return (
        <g className="letter-row">
            {letters.map((letter, index) => {
                return (
                    <g key={letter}>
                        <rect stroke="var(--body-background)"
                              strokeWidth="2"
                              fill="var(--body-background)"
                              x={(index + 1) * cellSize + ((index + 1) * gap)}
                              y="0"
                              width={cellSize}
                              height={cellSize}
                              onMouseEnter={handleMouseEnter}
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

        </g>)
});

const NumberRow = React.memo(({numbers, handleMouseEnter}) => {
    return (
        <g className="number-col">
            {numbers.map((num, index) => {
                return (
                    <g key={num}>
                        <rect stroke="var(--body-background)"
                              strokeWidth="2"
                              fill="var(--body-background)"
                              x="0"
                              y={(index + 1) * cellSize + ((index + 1) * gap)}
                              width={cellSize}
                              height={cellSize}
                              onMouseEnter={handleMouseEnter}
                        />
                        <text x="0"
                              y={(index + 2) * cellSize + (index * gap)}
                              textLength={cellSize}
                              fill="white"
                              transform="translate(0,-2)"
                              onMouseEnter={handleMouseEnter}
                              style={{fontSize: "9"}}>
                            {num}
                        </text>
                    </g>
                )
            })}
        </g>
    )
});

const BlankPlaceholders = ({cols, rows, handleMouseEnter}) => {
    return (
        <g className="blank-placeholders">
            {cols.map((letter, x) => {
                return rows.map((num, y) => {
                    return (<rect key={`${letter}:${num}`}
                                  stroke={getRandomColor()}
                                  fill="#109DAC"
                                  x={(x + 1) * cellSize + ((x + 1) * gap)}
                                  y={(y + 1) * cellSize + ((y + 1) * gap)}
                                  width={cellSize}
                                  height={cellSize}
                                  onMouseEnter={() => handleMouseEnter({x, y})}
                    />)
                })
            })}
        </g>
    )
}

export function Board({placedShips, draggingPosition, handleCellMouseEnter, hoveredCell, draggedShip, handlePlacedShipDragging}) {

    const boardRef = useRef(null);
    const [boundingPosition, setBoundingPosition] = useState(0);

    useEffect(() => {
        const boardSVG = boardRef.current;

        setBoundingPosition(boardSVG.getBoundingClientRect());
    }, [boardRef]);

    return (
        <div>
            <div className="board">
                {draggedShip && draggedShip.isDragging &&
                <div style={{
                    position: "fixed",
                    left: draggingPosition.x,
                    top: draggingPosition.y,
                    pointerEvents: "none",
                    transform: getTransform(draggedShip.template, draggedShip.offset.x, draggedShip.offset.y)
                }}>
                    <Ship ship={draggedShip.template}/>
                </div>}

                <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                     ref={boardRef}
                     onMouseLeave={() => handleCellMouseEnter({x: -1, y: -1})}
                     xmlns="http://www.w3.org/2000/svg">


                    <BlankPlaceholders cols={colNames}
                                       rows={rowNames}
                                       handleMouseEnter={handleCellMouseEnter}/>

                    <g style={draggedShip ? {
                        pointerEvents: "none",
                        fill: "transparent",
                        stroke: "white"
                    } : {
                        fill: "transparent",
                        stroke: "white"
                    }}>
                        {
                            placedShips.map(ship => <BoardShip template={ship.template}
                                                               uuid={ship.uuid}
                                                               key={ship.uuid}
                                                               handleMouseDown={(x, y) => handlePlacedShipDragging(ship, x, y)}
                                                               x={ship.x}
                                                               y={ship.y}/>)
                        }
                    </g>

                    {draggedShip && draggedShip.isSnapping &&
                    <g style={{
                        pointerEvents: "none",
                        fill: "transparent",
                        stroke: getStrokeColor(draggedShip)
                    }}>
                        <BoardShip template={draggedShip.template}
                                   uuid={draggedShip.uuid}
                                   x={draggedShip.x}
                                   y={draggedShip.y}/>
                    </g>}
                    <LetterRow letters={colNames}
                               handleMouseEnter={() => handleCellMouseEnter({x: -1, y: -1})}/>

                    <NumberRow numbers={rowNames}
                               handleMouseEnter={() => handleCellMouseEnter({x: -1, y: -1})}/>
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
