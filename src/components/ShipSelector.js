import React, {useCallback, useContext, useState} from "react";
import {Ship} from "./Ship";
import {getDimensions} from "../core/util";
import classNames from "classnames"
import {GameSettingsContext} from "../core/GameSettings";

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
    const sCN = classNames("ship-group", {"ship-group--disabled": allowed <= 0})

    return (
        <div className={sCN}>
            <div className="ship-group__label">
                {allowed}×
            </div>
            {children}
        </div>
    )
})

export const ShipSelector = React.memo(({draggedShip, setDraggedShip, allowedCounts}) => {

        const [settings] = useContext(GameSettingsContext)

        return (
            <div className="ship-selector">
                {settings.shipConfig.map((group, allwdIdx) => {
                    return (
                        <ShipGroup
                            key={`group-${allwdIdx}`}
                            allowed={allowedCounts[allwdIdx]}>
                            {group.map((template, index) => {
                                return (
                                    <ShipWithTooltip key={`ship-${allwdIdx}-${index}`}
                                                     draggedShip={draggedShip}
                                                     setDraggedShip={setDraggedShip}
                                                     w={template.w}
                                                     templateName={`ship-${allwdIdx}-${index}`}
                                                     templates={template.t}/>
                                )
                            })}
                        </ShipGroup>
                    )
                })}
            </div>
        )

    }
)
