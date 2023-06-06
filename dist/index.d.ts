/// <reference types="react" />
interface CharKey {
    c: string;
    s: string;
}
type ShuffleEvent = "start" | "tab" | "backspace" | "space" | "charkey" | "clear" | "key";
interface IVirtualKeyboard {
    className?: string;
    shuffleOn?: ShuffleEvent[];
    button?: {
        className?: string;
        activeClassName?: string;
    };
    charKeys?: CharKey[];
    value: string;
    onChange: (value: string) => void;
    gap?: string | number;
}
declare function VirtualKeyboard(props: IVirtualKeyboard): JSX.Element;

export { CharKey, IVirtualKeyboard, ShuffleEvent, VirtualKeyboard };
