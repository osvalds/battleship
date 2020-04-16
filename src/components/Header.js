import React, {useContext} from "react";
import Button from "../core/Button";
import ButtonGroup from "../core/ButtonGroup";
import {GAME_MODES, GameSettingsContext} from "../App";

export default function Header() {
    const [gameSettings, setGameSettings] = useContext(GameSettingsContext);

    return (
        <header className="header">
            <div className="header__content">
                <h1 className="header__logo">
                    🥔.🥔.🥔.🥔.🥔.🥔.🥔.🥔.🥔.🥔.
                </h1>
                <ButtonGroup>
                    <Button outlined={true}
                            onClick={() => setGameSettings(GAME_MODES.simple)}
                            isActive={gameSettings.name === "simple"}>
                        Simple (🇺🇸)
                    </Button>
                    <Button outlined={true}
                            onClick={() => setGameSettings(GAME_MODES.advanced)}
                            isActive={gameSettings.name === "advanced"}>
                        Advanced (🇱🇻)
                    </Button>
                </ButtonGroup>
            </div>


        </header>
    )
}
