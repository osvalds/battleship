import React from "react";
import classNames from "classnames";
import {BlankBoard, BoardShip} from "./Board";
import {PlacedShots, BombedShips} from "./EnemyBoard"


export function PlayerBoard({useTakenShots, useTakenAutoShots, usePlacedShips, title, isDisabled, gameState}) {
    const [takenShots] = useTakenShots;
    const [takenAutoShots] = useTakenAutoShots;

    const [enemyShips] = usePlacedShips;

    const cn = classNames("player-board", {"player-board--disabled": isDisabled})
    return (
        <div className={cn}>
            <BlankBoard handleCellMouseEnter={() => null}
                        onCellClick={() => null}>
                <PlacedShots placedShots={takenShots}
                             shotSource="player"/>
                <PlacedShots placedShots={takenAutoShots}
                             shotSource="computer"/>
                {
                    enemyShips.map(ship => <BoardShip template={ship.template}
                                                      uuid={ship.uuid}
                                                      key={ship.uuid}
                                                      handleMouseDown={() => null}
                                                      x={ship.x}
                                                      y={ship.y}/>)
                }

                <BombedShips ships={enemyShips.filter(s => s.hits?.length > 0)}/>

            </BlankBoard>
            <h2 className="u-h2">
                {title}
            </h2>
        </div>
    );
}
