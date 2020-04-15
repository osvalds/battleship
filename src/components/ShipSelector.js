import React, {Fragment} from "react";
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
    mutations: 3,
    template: [
        [1, 1, 0],
        [0, 1, 1]
    ]
}

const ship4ZFlipped = {
    mutations: 3,
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

const ShipTemplateRow = React.memo(({templates, setDraggedShip, templateName}) => {
    return (
        <div className="ship-template-row">
            {templates.map((shipTemplate, i) => <Ship ship={shipTemplate}
                                                      key={`key-${i}`}
                                                      setDraggedShip={setDraggedShip}/>)}
        </div>
    )
})

export const ShipSelector = React.memo(({setDraggedShip}) => {
        const ship1Rotated = getAllRotations(ship1);

        const ship2Rotated = getAllRotations(ship2);

        const ship3StraightRotated = getAllRotations(ship3Straight);
        const ship3LRotated = getAllRotations(ship3L);

        const ship4BlockRotated = getAllRotations(ship4Block);
        const ship4StraightRotated = getAllRotations(ship4Straight);
        const ship4LRotated = getAllRotations(ship4L).concat(getAllRotations(ship4LFlipped));
        const ship4TRotated = getAllRotations(ship4T);
        const ship4ZRotated = getAllRotations(ship4Z).concat(getAllRotations(ship4ZFlipped));;

        return (
            <div className="ship-selector">
                <div>
                    <ShipTemplateRow key={`ship1`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship1"
                                     templates={ship1Rotated}/>
                </div>
                <div>
                    <ShipTemplateRow key={`ship2`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship2"
                                     templates={ship2Rotated}/>
                </div>
                <div>
                    <ShipTemplateRow key={`allship3-straight`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship3-straight"
                                     templates={ship3StraightRotated}/>

                    <ShipTemplateRow key={`allship3-l`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship3-l"
                                     templates={ship3LRotated}/>
                </div>
                <div>
                    <ShipTemplateRow key={`allship4-straight`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-straight"
                                     templates={ship4StraightRotated}/>
                    <ShipTemplateRow key={`allship4-block`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-block"
                                     templates={ship4BlockRotated}/>
                    <ShipTemplateRow key={`allship4-t`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-t"
                                     templates={ship4TRotated}/>
                    <ShipTemplateRow key={`allship4-z`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-z"
                                     templates={ship4ZRotated}/>
                    <ShipTemplateRow key={`allship4-l`}
                                     setDraggedShip={setDraggedShip}
                                     templateName="ship4-l"
                                     templates={ship4LRotated}/>

                </div>
            </div>
        )

    }
)
