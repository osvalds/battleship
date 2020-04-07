import React from "react";
import {BlankBoard} from "./Board";

export function EnemyBoard({usePlacedShots, title}) {
    const [placedShots, setPlacedShots] = usePlacedShots;

    return (
        <div className="setup-board">
            <BlankBoard handleCellMouseEnter={() => null}/>
            <h2 className="u-h2">
                {title}
            </h2>
        </div>
    );
}
