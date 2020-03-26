import React from "react";

export function Board() {

    const boardCols = 11; // 10 cols + 1 for number
    const boardRows = 11; // 10 rows + 1 for letter

    const colNames = [..."KARTUPELIS"];
    const rowNames = Array(10).fill().map((_, i) => i + 1);

    const cellSize = 10;
    const gap = 1;

    const containerWidth = cellSize * boardCols + boardCols;
    const containerHeight = cellSize * boardRows + boardRows;

    return (
        <div className="board">
            <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`} xmlns="http://www.w3.org/2000/svg">
                {colNames.map((letter, index) => {
                    return (
                        <text x={(index + 1) * cellSize + (index * gap)}
                              y={cellSize}
                              transform="translate(3,-2)"
                              textLength={cellSize}
                              fill="white"
                              style={{fontSize: "9"}}>
                            {letter}
                        </text>
                    )
                })}
                {rowNames.map((num, index) => {
                    return (
                        <text key={num}
                              x="0"
                              y={(index + 2) * cellSize + (index * gap)}
                              textLength={cellSize}
                              fill="white"
                              transform="translate(0,-2)"
                              style={{fontSize: "9"}}>
                            {num}
                        </text>
                    )
                })}
                {colNames.map((letter, x) => {
                    return rowNames.map((num, y) => {
                        return (<rect key={`${letter}:${num}`}
                                      fill="white"
                                      x={(x + 1) * cellSize + ((x + 1) * gap)}
                                      y={(y + 1) * cellSize + ((y + 1) * gap)}
                                      width={cellSize}
                                      height={cellSize}/>)
                    })
                })}
            </svg>
        </div>
    )

}
