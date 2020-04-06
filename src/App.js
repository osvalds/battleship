import React, {useCallback, useState} from 'react';
import './App.scss';
import {Board} from "./components/Board";
import {ShipSelector} from "./components/ShipSelector";
import {Ship} from "./components/Ship";
import {getDimensions, uuidv4} from "./core/util";

const placed = [
    // {
    //     x: 2,
    //     y: 4,
    //     template: [
    //         [1, 1, 1],
    //         [1, 0, 0]
    //     ]
    // }
];

const centerOffset = (template) => {
    const rows = template.length;
    const cols = template[0].length;

    return {
        x: Math.floor((cols - 1) / 2),
        y: Math.floor((rows - 1) / 2)
    }
};

const inBounds = (x, y, template) => {
    const rows = template.length;
    const cols = template[0].length;

    if (x < 0 || y < 0) {
        return false;
    }

    return rows + y < 11 && cols + x < 11;
};

const placeShipOnBoard = (ship, board) => {
    const {x, y, template} = ship;
    const {rows, cols} = getDimensions(template)

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

const neighborDiff = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

const isOverlapping = (x, y, template, placedShips) => {
    const board = placedShipsToBoard(placedShips);
    const {rows, cols} = getDimensions(template);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
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

    return false;
};

const calculateOffset = (shipTemplate, x, y) => {
    if (x === -1 && y === -1) {
        return centerOffset(shipTemplate)
    } else {
        return {x, y}
    }
};

function App() {
    const [placedShips, setPlacedShips] = useState([]);
    const [draggedShip, setDraggedShip] = useState(null);
    const [draggingPosition, setDraggingPosition] = useState({x: 0, y: 0});
    const [hoveredCell, setHoveredCell] = useState({x: -1, y: -1});

    const handleCellMouseEnter = useCallback(({x, y}) => {
        setHoveredCell({x, y});
    }, [setHoveredCell]);

    const handleAddingDraggedShip = useCallback((shipTemplate) => {
        // const placedNew = [...placedShips];


    }, [setPlacedShips, placedShips, setDraggedShip]);

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


    }, [draggedShip, setDraggedShip, hoveredCell]);

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
    }, [draggedShip, placedShips]);

    return (
        <div className="App"
             onMouseDown={e => {
                 setDraggingPosition({x: e.clientX, y: e.clientY})
             }}
             onMouseMove={(e) => {
                 if (draggedShip !== null && (e.buttons === 1 || e.buttons === 3)) {
                     setDraggingPosition({x: e.clientX, y: e.clientY})

                     // if (hoveredCell.x > -1 && hoveredCell.y > -1) {
                     handleDraggedShipSnapping()
                     // console.log("entered board")
                     // }
                 }
             }}
             onMouseUp={handleOnMouseUp}
        >
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

export default App;
