import React, {Fragment, useCallback, useState} from "react";
import {Ship} from "./Ship";
import {getDimensions} from "../core/util";

export const shipSize1 = [
    {
        mutations: 0,
        template: [[1]]
    }
];

export const shipSize2 = [
    {
        mutations: 1,
        template: [[1, 1]]
    },
];

export const shipSize3 = [
    {
        mutations: 1,
        template: [
            [1, 1, 1]
        ]
    },
    {
        mutations: 3,
        template: [
            [1, 1],
            [1, 0]
        ]
    },
];

export const shipSize4 = [
    {
        mutations: 0,
        template: [
            [1, 1],
            [1, 1],
        ]
    },
    {
        mutations: 1,
        template: [[1, 1, 1, 1]]
    },
    {
        mutations: 3,
        template: [
            [1, 1, 1],
            [1, 0, 0]
        ]
    },
    {
        mutations: 3,
        template: [
            [1, 0, 0],
            [1, 1, 1]
        ]
    },
    {
        mutations: 3,
        template: [
            [0, 1, 0],
            [1, 1, 1]
        ]
    },
    {
        mutations: 1,
        template: [
            [1, 1, 0],
            [0, 1, 1]
        ]
    },
    {
        mutations: 1,
        template: [
            [0, 1, 1],
            [1, 1, 0]
        ]
    }
];

const ship1 = {
    mutations: 0,
    template: [[1]]
}

const ship2 = {
    mutations: 1,
    template: [[1, 1]]
}

const ship3Straight = {
    mutations: 1,
    template: [
        [1, 1, 1]
    ]
};

const ship3L = {
    mutations: 3,
    template: [
        [1, 1],
        [1, 0]
    ]
};

const ship4Block = {
    mutations: 0,
    template: [
        [1, 1],
        [1, 1],
    ]
};

const ship4Straight = {
    mutations: 1,
    template: [[1, 1, 1, 1]]
}

const ship4L = {
    mutations: 3,
    template: [
        [1, 1, 1],
        [1, 0, 0]
    ]
}

const ship4LFlipped = {
    mutations: 3,
    template: [
        [1, 0, 0],
        [1, 1, 1]
    ]
}

const ship4T = {
    mutations: 3,
    template: [
        [0, 1, 0],
        [1, 1, 1]
    ]
}

const ship4Z = {
    mutations: 1,
    template: [
        [1, 1, 0],
        [0, 1, 1]
    ]
}

const ship4ZFlipped = {
    mutations: 1,
    template: [
        [0, 1, 1],
        [1, 1, 0]
    ]
}

export const rotateTemplate90deg = (template) => {
    const {rows, cols} = getDimensions(template);

    let rotatedTemplate = new Array(cols).fill().map(() => new Array(rows).fill(0));

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            rotatedTemplate[(cols - x - 1)][y] = template[y][x];
        }
    }

    return rotatedTemplate;
};

const getAllRotations = ({template, mutations}) => {
    let rotations = [template]
    for (let i = 0; i < mutations; i++) {
        rotations.push(rotateTemplate90deg(rotations[i]))
    }
    return rotations
}

export const createAllShipPermutations = (shipTemplates) => {
    return shipTemplates.map(getAllRotations)
};

export const allShipPermutationsFlat = (shipTemplates) => {
    return createAllShipPermutations(shipTemplates).flat();
}

const ShipWithTooltip = React.memo(({templates, setDraggedShip, draggedShip, w}) => {
    const [show, setShow] = useState(false)

    const onSetDraggedShip = useCallback((ship, x, y) => {
        setDraggedShip(ship, x, y);
        setShow(false);
    }, [setShow, setDraggedShip])

    return (
        <div className="ship-with-tooltip"
             onMouseLeave={() => setShow(false)}>
            <div onMouseEnter={() => setShow(true)}>
                <Ship ship={templates[0]}
                      setDraggedShip={onSetDraggedShip}/>
            </div>
            {
                templates.length > 1 &&
                draggedShip === null &&
                show &&
                <div className="ship-with-tooltip__box"
                style={{width: w}}>
                {templates.map((shipTemplate, i) => <Ship ship={shipTemplate}
                                                          key={`key-${i}`}
                                                          setDraggedShip={onSetDraggedShip}/>)}
                </div>
            }
        </div>
    )
})

const ShipGroup = React.memo(({allowed, children}) => {
    return (
        <div className="ship-group">
            <div className="ship-group__label">
                {allowed}×
            </div>
            {children}
        </div>
    )
})

export const ShipSelector = React.memo(({draggedShip, setDraggedShip}) => {
        const ship1Rotated = getAllRotations(ship1);

        const ship2Rotated = getAllRotations(ship2);

        const ship3StraightRotated = getAllRotations(ship3Straight);
        const ship3LRotated = getAllRotations(ship3L);

        const ship4BlockRotated = getAllRotations(ship4Block);
        const ship4StraightRotated = getAllRotations(ship4Straight);
        const ship4LRotated = getAllRotations(ship4L).concat(getAllRotations(ship4LFlipped));
        const ship4TRotated = getAllRotations(ship4T);
        const ship4ZRotated = getAllRotations(ship4Z).concat(getAllRotations(ship4ZFlipped));

        return (
            <div className="ship-selector">
                <ShipGroup allowed={4}>
                    <ShipWithTooltip key={`ship1`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship1"
                                     templates={ship1Rotated}/>
                </ShipGroup>
                <ShipGroup allowed={3}>
                    <ShipWithTooltip key={`ship2`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     w={170}
                                     templateName="ship2"
                                     templates={ship2Rotated}/>
                </ShipGroup>
                <ShipGroup allowed={2}>
                    <ShipWithTooltip key={`allship3-straight`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     w={210}
                                     templateName="ship3-straight"
                                     templates={ship3StraightRotated}/>

                    <ShipWithTooltip key={`allship3-l`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     w={385}
                                     templateName="ship3-l"
                                     templates={ship3LRotated}/>
                </ShipGroup>
                <ShipGroup allowed={1}>
                    <ShipWithTooltip key={`allship4-straight`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-straight"
                                     w={245}
                                     templates={ship4StraightRotated}/>
                    <ShipWithTooltip key={`allship4-block`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-block"
                                     templates={ship4BlockRotated}/>
                    <ShipWithTooltip key={`allship4-t`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-t"
                                     w={459}
                                     templates={ship4TRotated}/>
                    <ShipWithTooltip key={`allship4-z`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-z"
                                     w={459}
                                     templates={ship4ZRotated}/>
                    <ShipWithTooltip key={`allship4-l`}
                                     draggedShip={draggedShip}
                                     setDraggedShip={setDraggedShip}
                                     w={459}
                                     templateName="ship4-l"
                                     templates={ship4LRotated}/>
                </ShipGroup>
            </div>
        )

    }
)
