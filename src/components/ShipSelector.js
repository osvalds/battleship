import React from "react";
import {Ship} from "./Ship";

const shipSize1 = [
    {
        mutations: 1,
        template: [[1]]
    }
];

const shipSize2 = [
    {
        mutations: 2,
        template: [
            [1],
            [1]
        ]
    },
];

const ShipSize3 = [
    {
        mutations: 2,
        template: [
            [1],
            [1],
            [1]
        ]
    },
    {
        mutations: 4,
        template: [
            [1, 1],
            [1, 0]
        ]
    },
];

const ShipSize4 = [
    {
        mutations: 1,
        template: [
            [1, 1],
            [1, 1],
        ]
    },
    {
        mutations: 2,
        template: [
            [1],
            [1],
            [1],
            [1]
        ]
    },
    {
        mutations: 4,
        template: [
            [1, 1, 1],
            [1, 0, 0]
        ]
    },
    {
        mutations: 4,
        template: [
            [1, 0, 0],
            [1, 1, 1]
        ]
    },
    {
        mutations: 4,
        template: [
            [0, 1, 0],
            [1, 1, 1]
        ]
    },
    {
        mutations: 2,
        template: [
            [1, 1, 0],
            [0, 1, 1]
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

export function ShipSelector() {
    return <Ship ship={[]}/>
}
