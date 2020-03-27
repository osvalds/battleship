import React, {useCallback, useState} from 'react';
import './App.scss';
import {Board} from "./components/Board";
import {ShipSelector} from "./components/ShipSelector";
import {Ship} from "./components/Ship";
import {uuidv4} from "./core/util";

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
        return "red";
    }

    if (rows + y < 11 && cols + x < 11) {
        return "green";
    } else {
        return "red";
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

    const handleDraggedShip = useCallback((shipTemplate) => {
        const shipUUID = uuidv4();
        const offset = centerOffset(shipTemplate);

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
        // if (isSnapping) {
        //     console.log(inBounds(x, y, draggedShip.template));
        // }

        let newDragged = {
            ...draggedShip,
            x: x,
            y: y,
            inBounds: inBounds(x, y, draggedShip.template),
            isDragging: !isSnapping,
            isSnapping: isSnapping
        };
        // console.log(newDragged);
        setDraggedShip(newDragged)


    }, [draggedShip, setDraggedShip, hoveredCell]);

    const handleOnMouseUp = useCallback(() => {
        if (draggedShip !== null && draggedShip.isSnapping && draggedShip.inBounds === "green") {
            let newPlaced = [...placedShips]
            // add board validation here
            setPlacedShips(newPlaced.concat([{...draggedShip}]))
            setDraggedShip(null);
        } else {
            setDraggedShip(null);
        }
    }, [draggedShip, placedShips, setDraggedShip, setPlacedShips])

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
                     console.log("entered board")
                     // }
                 }
             }}
             onMouseUp={handleOnMouseUp}
        >
            <Board placedShips={placedShips}
                   handleCellMouseEnter={handleCellMouseEnter}
                   draggedShip={draggedShip}
                   hoveredCell={hoveredCell}
                   draggingPosition={draggingPosition}/>
            <ShipSelector setDraggedShip={handleDraggedShip}/>
        </div>
    );
}

export default App;
