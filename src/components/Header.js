import React from "react";
import Button from "../core/Button";
import ButtonGroup from "../core/ButtonGroup";

export default function Header() {
    return (
        <header className="header">
            <div className="header__content">
                <h1 className="header__logo">
                    🥔.🥔.🥔.🥔.🥔.🥔.🥔.🥔.🥔.🥔.
                </h1>
                <ButtonGroup>
                    <Button outlined={true}>
                        Simple (🇺🇸)
                    </Button>
                    <Button outlined={true}>
                        Advanced (🇱🇻)
                    </Button>
                </ButtonGroup>
            </div>


        </header>
    )
}
