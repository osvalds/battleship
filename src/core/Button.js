import React from "react";
import classNames from "classnames";

export default function Button({onClick, isDisabled, children, cn, outlined, isActive}) {
    const cns = classNames("button", {"button--disabled": isDisabled}, {"button--outlined": outlined}, {"button--active": isActive}, cn)

    return (
        <button className={cns}
                onClick={onClick}>
            {children}
        </button>
    )
}
