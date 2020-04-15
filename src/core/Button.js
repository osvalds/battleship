import React from "react";
import classNames from "classnames";

export default function Button({onClick, isDisabled, children, cn}) {
    const cns = classNames("button", {"button--disabled": isDisabled}, cn)

    return (
        <button className={cns}
                onClick={onClick}>
            {children}
        </button>
    )
}
