import React, {useCallback, useEffect, useRef, useState} from "react";

export function Board() {

    const [placedShips, setPlacedShips] = useState([]);

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
    const [hoveredCell, setHoveredCell] = useState({x: -1, y: -1})

    useEffect(() => {
        const boardSVG = boardRef.current;

        setBoundingPosition(boardSVG.getBoundingClientRect());
    }, [boardRef])


    const handleMouseMove = useCallback((e) => {
        // console.log(e)
        // console.log("screenX", e.screenX);
        // console.log("screenY", e.screenY);
        // console.log("clientX", e.clientX);
        // console.log("clientY", e.clientY);
    }, []);

    const handleCellMouseEnter = useCallback(({x, y}) => {
        setHoveredCell({x, y});
    }, [setHoveredCell]);

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        // return color;
        return "transparent"
    }


    return (
        <div>
            <div className="board"
                 onMouseEnter={e => console.log("board mouse enter")}
                 onMouseMove={e => console.log("board mouse move")}>
                <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                     ref={boardRef}
                     onMouseMove={handleMouseMove}
                     onMouseLeave={() => handleCellMouseEnter({x: -1, y: -1})}
                     xmlns="http://www.w3.org/2000/svg">
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
