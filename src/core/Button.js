import React from "react";

export default function Button({onClick, isDisabled, children}) {
    return (
        <button className="button">
            {children}
        </button>
    )
}
