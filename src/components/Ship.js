import React, {useCallback} from "react";
import {getDimensions} from "../core/util";
import classNames from "classnames"

const ShipContent = React.memo(({ship, setDraggedShip, cellSize = 10, gap = 1, isSunken, isSmall}) => {
    const {rows, cols} = getDimensions(ship);

    const containerWidth = cellSize * cols + cols - 1;
    const containerHeight = cellSize * rows + rows - 1;

    const handleGrabbingShip = useCallback((x, y) => {
        setDraggedShip(ship, x, y)
    }, [setDraggedShip, ship]);

    const cn = classNames(`ship ship--${cols}`, {"ship--small": isSmall}, {"ship--sunken": isSunken})

    return (
        <div className={cn}
             onMouseDown={e => {
                 handleGrabbingShip(-1, -1)
             }}>
            <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`} xmlns="http://www.w3.org/2000/svg">
                {ship.map((row, y) => row.map((cell, x) => {
                    if (cell) {
                        return (
                            <rect
                                key={`${x}:${y}`}
                                fill="white"
                                stroke="transparent"
                                x={(x) * cellSize + ((x) * gap)}
                                y={(y) * cellSize + ((y) * gap)}
                                width={cellSize}
                                height={cellSize}
                                onMouseDown={(e) => {
                                    handleGrabbingShip(x, y);
                                    e.stopPropagation();
                                }}
                            />
                        )
                    } else {
                        return null;
                    }
                }))}
            </svg>
        </div>
    )
});

export const Ship = React.memo((props) => {
    if (props.ship === null) {
        return null;
    } else {
        return <ShipContent {...props}/>
    }

})
