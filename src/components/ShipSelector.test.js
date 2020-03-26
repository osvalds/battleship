import {createAllShipPermutations, rotateTemplate90deg} from "./ShipSelector";


it("returns ship template rotated 90deg", () => {
    const template3x1 = [[1, 1, 1]];
    const template1x3 = [
        [1],
        [1],
        [1]
    ];

    const template3x2 = [
        [1, 1, 1],
        [1, 0, 0]
    ];

    const template2x3 = [
        [1, 0],
        [1, 0],
        [1, 1]
    ];

    const template3x2r = [
        [0, 0, 1],
        [1, 1, 1],
    ];

    const zTmeplate3x2 = [
        [1, 1, 0],
        [0, 1, 1]
    ];

    const zTmeplate2x3 = [
        [0, 1],
        [1, 1],
        [1, 0],
    ];


    expect(rotateTemplate90deg(template3x1)).toStrictEqual(template1x3);
    expect(rotateTemplate90deg(template1x3)).toStrictEqual(template3x1);

    expect(rotateTemplate90deg(template3x2)).toStrictEqual(template2x3);
    expect(rotateTemplate90deg(template2x3)).toStrictEqual(template3x2r);

    expect(rotateTemplate90deg(zTmeplate3x2)).toStrictEqual(zTmeplate2x3);
    expect(rotateTemplate90deg(zTmeplate2x3)).toStrictEqual(zTmeplate3x2);
});

it("returns all permutations of possible ships", () => {
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

    const shipSize3Permutations = [
        [
            [
                [1],
                [1],
                [1]
            ],
            [
                [1, 1, 1]
            ]
        ],
        [
            [
                [1, 1],
                [1, 0]
            ],
            [
                [1, 0],
                [1, 1]
            ],
            [
                [0, 1],
                [1, 1]
            ],
            [
                [1, 1],
                [0, 1]
            ]
        ]
    ];

    expect(createAllShipPermutations(shipSize3)).toStrictEqual(shipSize3Permutations);

});
