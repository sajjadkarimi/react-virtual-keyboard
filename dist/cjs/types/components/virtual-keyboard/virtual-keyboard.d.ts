/// <reference types="react" />
export interface CharKey {
    c: string;
    s: string;
}
export type ShuffleEvent = "start" | "tab" | "backspace" | "space" | "charkey" | "clear" | "key";
export interface IVirtualKeyboard {
    className?: string;
    shuffleOn?: ShuffleEvent[];
    buttonProps?: {
        className?: string;
        activeClassName?: string;
    };
    charKeys?: CharKey[];
    value: string;
    onChange: (value: string) => void;
    gap?: string | number;
}
export declare function VirtualKeyboard(props: IVirtualKeyboard): JSX.Element;
