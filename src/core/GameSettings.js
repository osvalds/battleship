import React from "react";
import {rotateTemplate90deg} from "../components/ShipSelector";

export const getAllRotations = ({template, mutations}) => {
    let rotations = [template]
    for (let i = 0; i < mutations; i++) {
        rotations.push(rotateTemplate90deg(rotations[i]))
    }
    return rotations
}

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

const ship1Rotated = getAllRotations(ship1);

const ship2Rotated = getAllRotations(ship2);

const ship3StraightRotated = getAllRotations(ship3Straight);
const ship3LRotated = getAllRotations(ship3L);

const ship4BlockRotated = getAllRotations(ship4Block);
const ship4StraightRotated = getAllRotations(ship4Straight);
const ship4LRotated = getAllRotations(ship4L).concat(getAllRotations(ship4LFlipped));
const ship4TRotated = getAllRotations(ship4T);
const ship4ZRotated = getAllRotations(ship4Z).concat(getAllRotations(ship4ZFlipped));

const advancedShipConfig = [
    [{
        t: ship1Rotated,
        w: null
    }],
    [{
        t: ship2Rotated,
        w: 170
    }],

    [{
        t: ship3StraightRotated,
        w: 210
    }, {
        t: ship3LRotated,
        w: 385
    }],
    [{
        t: ship4StraightRotated,
        w: 245
    }, {
        t: ship4BlockRotated,
        w: null
    }, {
        t: ship4LRotated,
        w: 459
    }, {
        t: ship4TRotated,
        w: 459
    }, {
        t: ship4ZRotated,
        w: 459
    }]
]


const simpleShipConfig = [
    [{
        t: ship1Rotated,
        w: null
    }],
    [{
        t: ship2Rotated,
        w: 170
    }],

    [{
        t: ship3StraightRotated,
        w: 210
    }],
    [{
        t: ship4StraightRotated,
        w: 245
    }]
]

export const GAME_MODES = {
    simple: {
        name: "simple",
        cols: "ABCDEFGHIJ",
        shipConfig: simpleShipConfig
    },
    advanced: {
        name: "advanced",
        cols: "KARTUPELIS",
        shipConfig: advancedShipConfig
    }
}
export const GameSettingsContext = React.createContext(
    GAME_MODES.advanced
)
