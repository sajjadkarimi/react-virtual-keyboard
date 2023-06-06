import { CSSProperties, ReactElement } from "react";
import { PropsWithChildren } from "react";
import "./flex-grid.css";
export declare function FlexGrid(props: PropsWithChildren<{
    column: number;
    children: ReactElement[];
    className?: string;
    innerClassName?: string;
    proportion?: number[];
    style?: CSSProperties;
}>): JSX.Element;
