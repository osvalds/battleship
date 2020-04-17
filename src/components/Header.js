import React, {useContext} from "react";
import Button from "../core/Button";
import ButtonGroup from "../core/ButtonGroup";
import {GAME_MODES, GameSettingsContext} from "../core/GameSettings";

export default function Header({gameState}) {
    const [gameSettings, setGameSettings] = useContext(GameSettingsContext);

    return (
        <header className="header">
            <div className="header__content">
                <h1 className="header__logo">
                    <span role="img" aria-label="logo">🚢</span> × <span role="img" aria-label="logo">💣</span>
                </h1>
                <ButtonGroup>
                    <Button outlined={true}
                            isDisabled={gameState === "PLAYING"}
                            onClick={() => setGameSettings(GAME_MODES.simple)}
                            isActive={gameSettings.name === "simple"}>
                        Simple (<span role="img" aria-label="flag">🇺🇸</span>)
                    </Button>
                    <Button outlined={true}
                            isDisabled={gameState === "PLAYING"}
                            onClick={() => setGameSettings(GAME_MODES.advanced)}
                            isActive={gameSettings.name === "advanced"}>
                        Advanced (<span role="img" aria-label="flag">🇱🇻</span>)
                    </Button>
                </ButtonGroup>
            </div>
        </header>
    )
}
