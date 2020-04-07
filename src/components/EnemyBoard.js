import React, {Fragment, useState} from "react";
import {BlankBoard, cellSize, gap} from "./Board";
import {getRandomColor} from "../core/util";
import {placedShipsToBoard} from "./SetupBoard";

function PlacedShots({placedShots, shotSource}) {
    if (placedShots) {
        return (
            <g className={`placed-shots placed-shots--${shotSource}`}>
                {placedShots.map(([x, y]) => {
                    return (
                        <g className="placed-shots__group" key={`${x}-${y}`}>
                            <rect className="placed-shots__mask"
                                  stroke="transparent"
                                  fill="transparent"
                                  x={(x + 1) * cellSize + ((x + 1) * gap)}
                                  y={(y + 1) * cellSize + ((y + 1) * gap)}
                                  width={cellSize}
                                  height={cellSize}
                            />
                            <circle
                                className="placed-shots__shot"
                                cx={(x + 1) * cellSize + ((x + 1) * gap) + cellSize / 2}
                                cy={(y + 1) * cellSize + ((y + 1) * gap) + cellSize / 2}
                                r="1.75"/>
                        </g>
                    )
                })}
            </g>
        )

    } else {
        return null;
    }
}

export function EnemyBoard({usePlacedShots, useEnemyShips, title}) {
    const [placedShots, setPlacedShots] = usePlacedShots;
    const [placedComputerShots, setPlacedComputerShots] = useState([]);

    const [enemyShips, setEnemyShips] = useEnemyShips;


    const onCellClick = ({x, y}) => {
        let newPlaced = [...placedShots];
        const board = placedShipsToBoard(enemyShips);

        // hit on a board
        if (board[y][x]) {

        } else {
            setPlacedShots(newPlaced.concat([[x, y]]));
        }
    };

    console.log("placed shots", placedShots);

    return (
        <div className="setup-board">
            <BlankBoard handleCellMouseEnter={() => null}
                        onCellClick={onCellClick}>
                <PlacedShots placedShots={placedShots}
                             shotSource="player"/>
                <PlacedShots placedShots={placedComputerShots}
                             shotSource="computer"/>
            </BlankBoard>
            <h2 className="u-h2">
                {title}
            </h2>
        </div>
    );
}
