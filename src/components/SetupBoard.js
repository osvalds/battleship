import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import {Board} from "./Board";
import {ShipSelector} from "./ShipSelector";
import {getDimensions, getRandomInt, hullSize, uuidv4} from "../core/util";
import {GameSettingsContext} from "../core/GameSettings";

const centerOffset = (template) => {
    const {rows, cols} = getDimensions(template);

    return {
        x: Math.floor((cols - 1) / 2),
        y: Math.floor((rows - 1) / 2)
    }
};

const inBounds = (x, y, template) => {
    const {rows, cols} = getDimensions(template);

    if (x < 0 || y < 0) {
        return false;
    }

    return rows + y < 11 && cols + x < 11;
};

const placeShipOnBoard = (ship, board) => {
    const {x, y, template, uuid} = ship;
    const {rows, cols} = getDimensions(template);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            board[y + i][x + j] = template[i][j] ? uuid : "";
        }
    }

};

export const placedShipsToBoard = (placedShips) => {
    let board = new Array(10).fill().map(() => new Array(10).fill(""));

    for (const ship of placedShips) {
        placeShipOnBoard(ship, board);
    }
    return board;
};

const neighborDiff = [[-1, -1], [-1, 0], [-1, 1], [0, 0], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const isOverlapping = (x, y, template, placedShips, board = placedShipsToBoard(placedShips)) => {
    const {rows, cols} = getDimensions(template);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (template[i][j]) {
                for (let [xd, yd] of neighborDiff) {
                    const ny = i + y + yd;
                    const nx = j + x + xd;
                    if ((ny > -1 && ny < 10) &&
                        (nx > -1 && nx < 10) &&
                        board[ny][nx] !== "") {
                        return true;
                    }
                }
            }
        }
    }

    return false;
};

const calculateOffset = (shipTemplate, x, y) => {
    if (x === -1 && y === -1) {
        return centerOffset(shipTemplate)
    } else {
        return {x, y}
    }
};

const getAllValidPositions = (board, template) => {
    const positions = [];

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (inBounds(x, y, template) && !isOverlapping(x, y, template, [], board)) {
                positions.push([x, y]);
            }
        }
    }

    return positions;
};

export const getRandomShipPlacement = (shipConfig) => {
    let board = new Array(10).fill().map(() => new Array(10).fill(""))

    // flattens the ship config array to be consumed by the random placement algorithm
    const allTemplates = shipConfig.map((arr) => {
        return [arr.map(f => {
            return f.t
        }).flat()]
    }).flat()

    const chosenTemplates = [];
    const placedShips = [];


    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4 - i; j++) {
            const r = getRandomInt(0, allTemplates[i].length - 1);
            chosenTemplates.push(allTemplates[i][r])
        }
    }

    for (let i = 9; i >= 0; i--) {
        const validPositions = getAllValidPositions(board, chosenTemplates[i]);
        if (validPositions.length > 0) {
            const [cx, cy] = validPositions[getRandomInt(0, validPositions.length - 1)];
            placedShips.push({
                uuid: uuidv4(),
                x: cx,
                y: cy,
                template: chosenTemplates[i],
                inBounds: true,
                isOverlapping: false,
                isDragging: false,
                isSnapping: true
            });

            placeShipOnBoard({
                x: cx,
                y: cy,
                template: chosenTemplates[i]
            }, board);
        } else {
            // in case there are no available places where to put stuff,
            // just call the function again. I tried this fn ~50k times,
            // and it was never called again so this is just a precaution
            getRandomShipPlacement(shipConfig);
        }

    }

    return placedShips;
};

const shipCountsOnBoard = (placedShips) => {
    let validShipCount = [4, 3, 2, 1];
    for (let placedShip of placedShips) {
        validShipCount[hullSize(placedShip.template) - 1]--;
    }
    return validShipCount;
}

export const isValidShipCount = (ships) => {
    return shipCountsOnBoard(ships).every(i => i === 0)
}

export function SetupBoard({usePlacedShips, title}) {
    const [placedShips, setPlacedShips] = usePlacedShips;
    const [draggedShip, setDraggedShip] = useState(null);
    const [draggingPosition, setDraggingPosition] = useState({x: 0, y: 0});
    const [hoveredCell, setHoveredCell] = useState({x: -1, y: -1});
    const [gameSettings] = useContext(GameSettingsContext)

    const handleCellMouseEnter = useCallback(({x, y}) => {
        setHoveredCell({x, y});
    }, [setHoveredCell]);

    const handleDraggedShip = useCallback((shipTemplate, x, y) => {
        const shipUUID = uuidv4();

        const offset = calculateOffset(shipTemplate, x, y);

        setDraggedShip({
            template: shipTemplate,
            uuid: shipUUID,
            isDragging: true,
            isSnapping: false,
            offset: offset,
            x: -100000,
            y: -100000
        })
    }, [setDraggedShip]);

    const handleDraggedShipSnapping = useCallback(() => {

        const isSnapping = hoveredCell.x > -1 && hoveredCell.y > -1;
        const x = hoveredCell.x - draggedShip.offset.x;
        const y = hoveredCell.y - draggedShip.offset.y;

        let newDragged = {
            ...draggedShip,
            x: x,
            y: y,
            inBounds: inBounds(x, y, draggedShip.template),
            isOverlapping: isOverlapping(x, y, draggedShip.template, placedShips),
            isDragging: !isSnapping,
            isSnapping: isSnapping
        };

        setDraggedShip(newDragged)

    }, [draggedShip, setDraggedShip, hoveredCell, placedShips]);

    const handleOnMouseUp = useCallback((e) => {
        if (draggedShip?.isSnapping &&
            draggedShip.inBounds &&
            !draggedShip.isOverlapping) {
            let newPlaced = [...placedShips];

            setPlacedShips(newPlaced.concat([{...draggedShip}]));

            setDraggedShip(null);
            setDraggingPosition({x: -1000, y: -1000})
        } else {
            if (draggedShip?.lastValidPosition && draggedShip.inBounds) {
                let newPlaced = [...placedShips];

                setPlacedShips(newPlaced.concat([{
                    ...draggedShip,
                    x: draggedShip.lastValidPosition.x,
                    y: draggedShip.lastValidPosition.y
                }]));
            }
            setDraggingPosition({x: -1000, y: -1000});
            setDraggedShip(null);
        }
    }, [draggedShip, placedShips, setDraggedShip, setPlacedShips, setDraggingPosition]);

    const handleDraggingOnPlacedShip = useCallback((ship, x, y) => {
        let newPlaced = placedShips.filter(sh => sh.uuid !== ship.uuid);

        ship.offset = calculateOffset(ship.template, x, y);
        ship.lastValidPosition = {x: ship.x, y: ship.y};

        setDraggedShip(ship);
        setPlacedShips(newPlaced);
    }, [placedShips, setPlacedShips, setDraggedShip]);

    const fillBoardWithRandom = () => {
        setPlacedShips(getRandomShipPlacement(gameSettings.shipConfig));
    };

    const resetBoard = () => {
        setPlacedShips([])
    };

    // for internal board algorithm testing
    // eslint-disable-next-line no-unused-vars
    const tryLots = () => {
        let results = [];
        for (let i = 0; i < 10000; i++) {
            let t1 = performance.now();
            fillBoardWithRandom()
            let t2 = performance.now();
            results.push(t2 - t1);
        }
        let sum = results.reduce((previous, current) => current += previous);
        let avg = sum / results.length;
        console.log(`avg: ${avg} ms`);
        console.log(`sum: ${sum} ms`);
    };

    const handleOnMouseMove = useCallback((e) => {
        if (draggedShip !== null && (e.buttons === 1 || e.buttons === 3)) {
            setDraggingPosition({x: e.clientX, y: e.clientY});
            handleDraggedShipSnapping()
        }
    }, [draggedShip, setDraggingPosition, handleDraggedShipSnapping]);

    useEffect(() => {
        document.addEventListener("mousemove", handleOnMouseMove);

        return () =>
            document.removeEventListener("mousemove", handleOnMouseMove)

    }, [handleOnMouseMove]);

    const handleOnMouseDown = useCallback((e) => {
        if (e.buttons === 1 || e.buttons === 3) {
            setDraggingPosition({x: e.clientX, y: e.clientY})
        }

    }, [setDraggingPosition]);

    useEffect(() => {
        document.addEventListener("mousedown", handleOnMouseDown, false);

        return () =>
            document.removeEventListener("mousedown", handleOnMouseDown, false)
    }, [handleOnMouseDown]);

    useEffect(() => {
        document.addEventListener("mouseup", handleOnMouseUp, false);

        return () =>
            document.removeEventListener("mouseup", handleOnMouseUp, false)

    }, [handleOnMouseUp]);

    return (
        <Fragment>
            <div className="setup-wrapper">
                <Board placedShips={placedShips}
                       handleCellMouseEnter={handleCellMouseEnter}
                       handlePlacedShipDragging={handleDraggingOnPlacedShip}
                       draggedShip={draggedShip}
                       hoveredCell={hoveredCell}
                       draggingPosition={draggingPosition}/>
                <h2 className="u-h2">
                    {title}
                </h2>
                <button
                    className="button"
                    onClick={fillBoardWithRandom}>
                    Random layout
                </button>
                <button
                    className="button"
                    onClick={resetBoard}>
                    Reset layout
                </button>
            </div>
            <ShipSelector
                allowedCounts={shipCountsOnBoard(placedShips)}
                draggedShip={draggedShip}
                setDraggedShip={handleDraggedShip}/>
        </Fragment>
    );
}
