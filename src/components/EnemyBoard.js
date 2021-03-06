import React from "react";
import {BlankBoard, BoardShip, cellSize, gap} from "./Board";
import {getDimensions, groupBy, hullSize} from "../core/util";
import {placedShipsToBoard} from "./SetupBoard";
import hull from "hull.js"
import Button from "../core/Button";
import classNames from "classnames";
import {Ship} from "./Ship";

function svgCoord(c, ct) {
    return (c + ct + 1) * cellSize + ((c + ct + 1) * gap)
}

export function PlacedShots({placedShots, shotSource}) {
    if (placedShots) {
        return (
            <g className={`placed-shots placed-shots--${shotSource}`}>
                {placedShots.map(([x, y]) => {
                    return (
                        <g className="placed-shots__group" key={`${x}-${y}`}>
                            <rect className="placed-shots__mask"
                                  stroke="transparent"
                                  fill="transparent"
                                  x={svgCoord(x, 0)}
                                  y={svgCoord(y, 0)}
                                  width={cellSize}
                                  height={cellSize}
                            />
                            <circle
                                className="placed-shots__shot"
                                cx={svgCoord(x, 0) + cellSize / 2}
                                cy={svgCoord(y, 0) + cellSize / 2}
                                r="1.5"/>
                        </g>
                    )
                })}
            </g>
        )

    } else {
        return null;
    }
}

export const addHit = (target, x, y) => {
    if (target?.hits) {
        const filteredHits = target.hits.filter(([hx, hy]) => !(hx === x && hy === y));
        return {
            ...target,
            hits: [...filteredHits, [x, y]]
        }
    } else {
        return {
            ...target,
            hits: [[x, y]]
        }
    }

};

export const isSunken = ({template, hits}) => {
    const size = template.flat(5).reduce((previous, current) => current += previous);
    return size === hits.length
};


function ShipHits({hits}) {
    return hits.map(([x, y]) => {
        let sx = svgCoord(x, 0);
        let sy = svgCoord(y, 0);
        return (
            <g className="bombed-cell__wrapper"
               key={`${x}-${y}`}>
                <rect className="bombed-ship__cell"
                      x={sx}
                      y={sy}
                      width={cellSize}
                      height={cellSize}
                />
                <path
                    d={`M ${sx + 0.5} ${sy + 0.5} 
                        L ${sx + cellSize - .5} ${sy + cellSize - .5}
                        M ${sx + 0.5} ${sy + cellSize - .5}
                        L ${sx + cellSize - .5} ${sy + 0.5}`}
                    strokeWidth="1"
                    stroke="var(--button-primary-bgcolor)"/>
            </g>
        )
    })
}

function HullToD(hull) {
    let d = `M ${hull[0][0]} ${hull[0][1]}`;

    for (let i = 1; i < hull.length; i++) {
        d += ` ${hull[i][0]} ${hull[i][1]}`;
    }

    return d;
}

function ShipHull({ship}) {
    let shipHull = [];
    const {template, x, y} = ship;
    const {rows, cols} = getDimensions(template);

    for (let yt = 0; yt < rows; yt++) {
        for (let xt = 0; xt < cols; xt++) {
            if (template[yt][xt]) {
                const x0 = svgCoord(x, xt) + 0.5;
                const y0 = svgCoord(y, yt) + 0.5;

                const x1 = x0 + cellSize - .5;
                const y1 = y0 + cellSize - .5;

                shipHull.push([x0, y0], [x0, y1], [x1, y0], [x1, y1])
            }
        }
    }

    return (
        <path
            fill="transparent"
            stroke="var(--button-primary-bgcolor)"
            strokeWidth="1"
            d={HullToD(hull(shipHull, 1))}
        />
    );
}

export function BombedShips({ships}) {
    return ships.map((ship) => {
        const {isSunken, hits, uuid} = ship;

        return (
            <g key={uuid}
               className={`bombed-ship bombed-ship--${isSunken}`}>
                <ShipHits hits={hits}/>
                {isSunken &&
                <ShipHull ship={ship}/>}
            </g>
        )
    })
}

export function alreadyPlaced(x, y, shots) {
    for (let i = 0, s = shots.length; i < s; i++) {
        if (shots[i][0] === x && shots[i][1] === y) {
            return true;
        }
    }
    return false;
}

function shipTemplatePoints({x, y, template}) {
    const {rows, cols} = getDimensions(template);
    let templatePoints = [];

    for (let yt = 0; yt < rows; yt++) {
        for (let xt = 0; xt < cols; xt++) {
            if (template[yt][xt]) {
                templatePoints.push([x + xt, y + yt])
            }
        }
    }
    return templatePoints;
}

export function getComputerShots(ship, placedShots, placedAutoShots) {
    const neighborDiff = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const shipTemplate = shipTemplatePoints(ship);
    const autoShots = [];

    for (let i = 0; i < ship.hits.length; i++) {
        const [hx, hy] = ship.hits[i];

        for (let [xd, yd] of neighborDiff) {
            const ny = hy + yd;
            const nx = hx + xd;
            if (ny > -1 && ny < 10 &&
                nx > -1 && nx < 10) {
                if (!alreadyPlaced(nx, ny, autoShots) &&
                    !alreadyPlaced(nx, ny, placedShots) &&
                    !alreadyPlaced(nx, ny, shipTemplate) &&
                    !alreadyPlaced(nx, ny, placedAutoShots)) {
                    autoShots.push([nx, ny]);
                }
            }
        }

    }

    return autoShots;
}

const templates = [
    [[1]],
    [[1, 1]],
    [[1, 1, 1]],
    [[1, 1, 1, 1]]
]

function TargetsRow({row}) {
    const [size, ships] = row;

    return (
        <div className="targets__row">
            {
                ships.sort((x,y)=> x.isSunken - y.isSunken)
                    .reverse()
                    .map((ship, index) => {
                    return <Ship ship={templates[size - 1]}
                                 isSmall={true}
                                 isSunken={ship.isSunken}
                                 key={`key-${size}-${index}`}
                                 setDraggedShip={() => null}/>
                })
            }
        </div>
    )
}

export function Targets({ships, gameState}) {
    if (ships.length === 0) {
        return null
    }

    const TargetShips = groupBy(ships.map(ship => {
        return {
            size: hullSize(ship.template),
            isSunken: ship.isSunken === true
        }
    }), "size")

    const cn = classNames("targets", {"targets--faded": gameState !== "PLAYING"})

    return (
        <div className={cn}>
            {
                Object.entries(TargetShips).map((row, index) => <TargetsRow row={row} key={index}/>)
            }
        </div>
    )
}

export function EnemyBoard({usePlacedShots, useEnemyShips, title, gameCanStart, isDisabled, onStartClick, gameState, useAutoShots, onMissedShot, showShips}) {
    const [placedShots, setPlacedShots] = usePlacedShots;
    const [placedComputerShots, setPlacedComputerShots] = useAutoShots;

    const [enemyShips, setEnemyShips] = useEnemyShips;

    const onCellClick = ({x, y}) => {
        let newPlaced = [...placedShots];
        const board = placedShipsToBoard(enemyShips);

        if (board[y][x]) {
            let newPlaced = enemyShips.filter(sh => sh.uuid !== board[y][x]);
            let targetShip = enemyShips.filter(s => s.uuid === board[y][x])[0];
            targetShip = addHit(targetShip, x, y);

            if (isSunken(targetShip)) {
                targetShip.isSunken = true;
                setPlacedComputerShots(placedComputerShots.concat(getComputerShots(targetShip, placedShots, placedComputerShots)))
            }
            setEnemyShips(newPlaced.concat([targetShip]))

        } else {
            onMissedShot()
            setPlacedShots(newPlaced.concat([[x, y]]));
        }
    };

    const cn = classNames("enemy-board", {"enemy-board--disabled": isDisabled})
    return (
        <div className={cn}>
            <div className="enemy-board__row">
                <BlankBoard handleCellMouseEnter={() => null}
                            onCellClick={onCellClick}>
                    {showShips &&
                    enemyShips.map(ship => <BoardShip template={ship.template}
                                                      uuid={ship.uuid}
                                                      key={ship.uuid}
                                                      handleMouseDown={() => null}
                                                      x={ship.x}
                                                      y={ship.y}/>)
                    }
                    <PlacedShots placedShots={placedShots}
                                 shotSource="player"/>
                    <PlacedShots placedShots={placedComputerShots}
                                 shotSource="computer"/>
                    <BombedShips ships={enemyShips.filter(s => s.hits?.length > 0)}/>
                </BlankBoard>
                <Targets
                    gameState={gameState}
                    ships={enemyShips}/>
                {gameState === "SETUP" &&
                <Button isDisabled={!gameCanStart}
                        onClick={onStartClick}
                        cn="button--start">
                    Start pew-pew
                </Button>
                }

            </div>
            <h2 className="u-h2">
                {title}
            </h2>
        </div>
    );
}
