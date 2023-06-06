import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Button } from "../button/button";
import { FlexGrid } from "../flex-grid/flex-grid";
import { KEYS } from "../keys/Keys";
export interface CharKey {
  c: string;
  s: string;
}
export type ShuffleEvent =
  | "start"
  | "tab"
  | "backspace"
  | "space"
  | "charkey"
  | "clear"
  | "key";
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

export function VirtualKeyboard(props: IVirtualKeyboard): JSX.Element {
  const [shiftOn, setShiftOn] = useState<boolean>(false);
  const [charkeys, setCharkeys] = useState<any[]>([]);
  const reducer = useCallback(
    (state: { shuffle: boolean }, action: { type: string }) => {
      let ret = { shuffle: false };
      if (
        props.shuffleOn?.includes(action.type as any) ||
        props.shuffleOn?.includes("key")
      )
        ret = { shuffle: true };
      return ret;
    },
    [props.shuffleOn]
  );
  const [state, dispatch] = useReducer(reducer, { shuffle: false });
  const onChange = useCallback(
    (v: string, key: string) => {
      dispatch({ type: key });
      props.onChange(v);
    },
    [props]
  );
  const keys = useMemo(() => {
    return charkeys.map((v) => (shiftOn ? v.s : v.c));
  }, [charkeys, shiftOn]);

  useEffect(() => {
    setCharkeys((k) => {
      let ret = k.length > 0 ? k : props.charKeys || KEYS;
      if (
        (props.shuffleOn?.includes("start") && k.length === 0) ||
        state.shuffle
      )
        ret = ret.sort(() => 0.5 - Math.random());
      return ret.slice();
    });
  }, [props.charKeys, props.shuffleOn, state.shuffle]);

  const updateText = useCallback(
    (v: string) => onChange(`${props.value}${v}`, "charkey"),
    [onChange, props.value]
  );
  const backspace = useCallback(
    () =>
      onChange(props.value.substring(0, props.value.length - 1), "backspace"),
    [onChange, props.value]
  );
  const clear = useCallback(() => onChange("", "clear"), [onChange]);
  const tab = useCallback(
    (v: string) => onChange(`${props.value}\t`, "tab"),
    [onChange, props.value]
  );
  const space = useCallback(
    (v: string) => onChange(`${props.value} `, "space"),
    [onChange, props.value]
  );
  return (
    <div
      className={props.className}
      style={{
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        gap: props.gap || "5px",
      }}
    >
      <FlexGrid
        column={14}
        proportion={[...[...Array(13)].map(() => 7), 9]}
        style={{
          gap: props.gap || "5px",
        }}
      >
        {
          keys
            .slice(0, 13)
            .map((v) => (
              <Button
                key={v}
                text={v}
                onClick={updateText}
                {...props.buttonProps}
              />
            )) as any
        }
        <Button text="⌫" onClick={backspace} {...props.buttonProps} />
      </FlexGrid>
      <FlexGrid
        column={13}
        proportion={[16, ...[...Array(12)].map(() => 7)]}
        style={{
          gap: props.gap || "5px",
        }}
      >
        <Button text="Tab" onClick={tab} {...props.buttonProps} />
        {
          keys
            .slice(13, 25)
            .map((v) => (
              <Button
                key={v}
                text={v}
                onClick={updateText}
                {...props.buttonProps}
              />
            )) as any
        }
      </FlexGrid>
      <FlexGrid
        column={13}
        proportion={[...[...Array(12)].map(() => 7), 16]}
        style={{
          gap: props.gap || "5px",
        }}
      >
        {
          keys
            .slice(25, 37)
            .map((v) => (
              <Button
                key={v}
                text={v}
                onClick={updateText}
                {...props.buttonProps}
              />
            )) as any
        }
        <Button
          text="Shift"
          onClick={() => setShiftOn((v) => !v)}
          active={shiftOn}
          {...props.buttonProps}
        />
      </FlexGrid>
      <FlexGrid
        column={6}
        proportion={[
          9,
          ...[...Array(4)].map(() => 7),
          28,
          ...[...Array(5)].map(() => 7),
        ]}
        style={{
          gap: props.gap || "5px",
        }}
      >
        <Button text="Clear" onClick={clear} {...props.buttonProps} />
        {
          keys
            .slice(37, 41)
            .map((v) => (
              <Button
                key={v}
                text={v}
                onClick={updateText}
                {...props.buttonProps}
              />
            )) as any
        }
        <Button text="Space" onClick={space} {...props.buttonProps} />
        {
          keys
            .slice(41, 46)
            .map((v) => (
              <Button
                key={v}
                text={v}
                onClick={updateText}
                {...props.buttonProps}
              />
            )) as any
        }
      </FlexGrid>
    </div>
  );
}
