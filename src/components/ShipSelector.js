import React, {Fragment} from "react";
import {Ship} from "./Ship";

const shipSize1 = [
    {
        mutations: 0,
        template: [[1]]
    }
];

const shipSize2 = [
    {
        mutations: 1,
        template: [
            [1],
            [1]
        ]
    },
];

const shipSize3 = [
    {
        mutations: 1,
        template: [
            [1],
            [1],
            [1]
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

const shipSize4 = [
    {
        mutations: 0,
        template: [
            [1, 1],
            [1, 1],
        ]
    },
    {
        mutations: 1,
        template: [
            [1],
            [1],
            [1],
            [1]
        ]
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

export const rotateTemplate90deg = (template) => {
    const rows = template.length;
    const cols = template[0].length;

    let rotatedTemplate = new Array(cols).fill().map(() => new Array(rows).fill(0));

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            rotatedTemplate[(cols - x - 1)][y] = template[y][x];
        }
    }

    return rotatedTemplate;
};

export const createAllShipPermutations = (shipTemplates) => {
    return shipTemplates.map(({template, mutations}) => {
        let rotations = [template]
        for (let i = 0; i < mutations; i++) {
            rotations.push(rotateTemplate90deg(rotations[i]))
        }
        return rotations
    })
};

function ShipTemplateRow({templates, setDraggedShip, templateName}) {
    return (
        <div className="ship-template-row">
            {templates.map((shipTemplate, i) => <Ship ship={shipTemplate}
                                                 key={`key-${i}`}
                                                 setDraggedShip={setDraggedShip}/>)}
        </div>
    )
}

export function ShipSelector({setDraggedShip}) {
    const allShip1 = createAllShipPermutations(shipSize1);
    const allShip2 = createAllShipPermutations(shipSize2);
    const allShip3 = createAllShipPermutations(shipSize3);
    const allShip4 = createAllShipPermutations(shipSize4);
    return (
        // null
        <div className="ship-selector">
            {allShip1.map((templates, i) => <ShipTemplateRow key={`allship1-${i}`}
                                                             setDraggedShip={setDraggedShip}
                                                             templateName="allship1"
                                                             templates={templates}/>)}

            {allShip2.map((templates, i) => <ShipTemplateRow key={`allship2-${i}`}
                                                             setDraggedShip={setDraggedShip}
                                                             templateName="allship2"
                                                             templates={templates}/>)}

            {allShip3.map((templates, i) => <ShipTemplateRow key={`allship3-${i}`}
                                                             setDraggedShip={setDraggedShip}
                                                             templateName="allship3"
                                                             templates={templates}/>)}

            {allShip4.map((templates, i) => <ShipTemplateRow key={`allship4-${i}`}
                                                             templates={templates}
                                                             templateName="allship4"
                                                             setDraggedShip={setDraggedShip}/>)}

        </div>

    )

}
