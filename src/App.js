import React, {useCallback, useState} from 'react';
import './App.scss';
import {Board} from "./components/Board";
import {
    allShipPermutationsFlat,
    ShipSelector,
    shipSize1,
    shipSize2, shipSize3, shipSize4
} from "./components/ShipSelector";
import {getDimensions, uuidv4} from "./core/util";

const centerOffset = (template) => {
    const {rows, cols} = getDimensions(template);

    return {
        x: Math.floor((cols - 1) / 2),
        y: Math.floor((rows - 1) / 2)
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const inBounds = (x, y, template) => {
    const {rows, cols} = getDimensions(template);

    if (x < 0 || y < 0) {
        return false;
    }

    return rows + y < 11 && cols + x < 11;
};

const placeShipOnBoard = (ship, board) => {
    const {x, y, template} = ship;
    const {rows, cols} = getDimensions(template);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            board[y + i][x + j] += template[i][j];
        }
    }

};

const placedShipsToBoard = (placedShips) => {
    let board = new Array(10).fill().map(() => new Uint8Array(10));

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
                    if (ny > -1 && ny < 10 &&
                        nx > -1 && ny < 10 &&
                        board[ny][nx] > 0) {
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

function ConfigBoard() {
    const [placedShips, setPlacedShips] = useState([]);
    const [draggedShip, setDraggedShip] = useState(null);
    const [draggingPosition, setDraggingPosition] = useState({x: 0, y: 0});
    const [hoveredCell, setHoveredCell] = useState({x: -1, y: -1});

    const handleCellMouseEnter = useCallback(({x, y}) => {
        setHoveredCell({x, y});
    }, [setHoveredCell]);

    const handleDraggedShip = useCallback((shipTemplate, x, y) => {

        const shipUUID = uuidv4();

        const offset = calculateOffset(shipTemplate, x, y)

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

    const handleOnMouseUp = useCallback(() => {
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
    }, [placedShips]);

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

    const fillBoardWithRandom = () => {
        let board = new Array(10).fill().map(() => new Uint8Array(10))

        const allShip1 = allShipPermutationsFlat(shipSize1);
        const allShip2 = allShipPermutationsFlat(shipSize2);
        const allShip3 = allShipPermutationsFlat(shipSize3);
        const allShip4 = allShipPermutationsFlat(shipSize4);
        const allTemplates = [allShip1, allShip2, allShip3, allShip4];
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
                    offset: {x: 0, y: 0},
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
                fillBoardWithRandom();
            }

        }

        setPlacedShips(placedShips);
    };


    // for internal board algorithm testing
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


    return (
        <div onMouseDown={e => {
                 setDraggingPosition({x: e.clientX, y: e.clientY})
             }}
             onMouseMove={(e) => {
                 if (draggedShip !== null && (e.buttons === 1 || e.buttons === 3)) {
                     setDraggingPosition({x: e.clientX, y: e.clientY});
                     handleDraggedShipSnapping()
                 }
             }}
             onMouseUp={handleOnMouseUp}
        >
            <button onClick={fillBoardWithRandom}>Random layout</button>
            <Board placedShips={placedShips}
                   handleCellMouseEnter={handleCellMouseEnter}
                   handlePlacedShipDragging={handleDraggingOnPlacedShip}
                   draggedShip={draggedShip}
                   hoveredCell={hoveredCell}
                   draggingPosition={draggingPosition}/>
            <ShipSelector setDraggedShip={handleDraggedShip}/>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <ConfigBoard/>
        </div>

    )

}

export default App;
