import Button from "../core/Button";
import React from "react";

export default function GameFinished({computerShips, isPlayerTurn, restartGame}) {
    if (isPlayerTurn &&
        computerShips.every(s => s.isSunken)) {
        return (
            <div className="game-finished">
                <h2 className="u-h2">
                    Congrats, you beat the computer!
                    <span role="img" aria-label="confetti">🎉</span>
                </h2>
                <Button onClick={restartGame}>
                    Dominate again!
                </Button>
            </div>

        )
    } else {
        return (
            <div className="game-finished">
                <h2 className="u-h2">
                    Tough luck, the Computer was superior!
                </h2>
                <Button onClick={restartGame}>
                    Let me rematch!
                </Button>
            </div>

        )
    }

}
