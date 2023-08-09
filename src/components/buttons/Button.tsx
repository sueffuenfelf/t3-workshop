import React, { ReactNode } from "react";
import { classNames } from "~/utils";

type ButtonProps = React.PropsWithoutRef<JSX.IntrinsicElements['button']> & {
    icon?: React.FunctionComponent<React.PropsWithoutRef<JSX.IntrinsicElements['svg']>>;
    label?: string;
    color?: 'indogo' | 'red';
}
export default function Button(props: ButtonProps) {
    const color = props.color || "indigo";

    return (
        <button
            type="button"
            className={classNames(
                color === "indigo" ? "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600" : "",
                color === "red" ? "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600" : "",
                "rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            )}
            onClick={props.onClick}
            {...props}
        >
            {props.icon ? <props.icon className="h-5 w-5"></props.icon> : null}
            {props.label || props.children}
        </button>
    )
}