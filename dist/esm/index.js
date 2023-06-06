import { jsx, jsxs } from 'react/jsx-runtime';
import { Children, useState, useCallback, useReducer, useMemo, useEffect } from 'react';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".button-container {\n  display: flex;\n  align-items: center;\n  border: 1px solid black;\n  color: black;\n  border-radius: 5px;\n  height: 100%;\n}\n\n.button-container:hover {\n  border-color: blue;\n  color: blue;\n  cursor: pointer;\n}\n\n.button-text {\n  margin: auto;\n}\n\n.button-active {\n  border-color: blue;\n  color: blue;\n}\n\n.button-inactive {\n  border-color: black;\n  color: black;\n}\n";
styleInject(css_248z$1);

function Button(props) {
    return (jsx("div", { className: `button-container ${props.className} ${props.active
            ? props.activeClassName
                ? props.activeClassName
                : "button-active"
            : ""}`, onClick: () => props.onClick(props.text), children: jsx("div", { className: "button-text", children: props.text }) }));
}

var css_248z = ".flex-grid-container {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n  align-content: space-between;\n}\n";
styleInject(css_248z);

function FlexGrid(props) {
    return (jsx("div", { className: `flex-grid-container ${props.className}`, style: props.style, children: Children.map(props.children, (child, index) => {
            return props.innerClassName ? (jsx("div", { className: props === null || props === void 0 ? void 0 : props.innerClassName, children: child }, `text-grid-${index}`)) : (jsx("div", { style: {
                    width: `${props.proportion ? props.proportion[index] : 100 / props.column}%`,
                }, children: child }, `text-grid-${index}`));
        }) }));
}

const KEYS = [
    { c: "`", s: "~" },
    { c: "1", s: "!" },
    { c: "2", s: "@" },
    { c: "3", s: "#" },
    { c: "4", s: "$" },
    { c: "5", s: "%" },
    { c: "6", s: "^" },
    { c: "7", s: "&" },
    { c: "8", s: "*" },
    { c: "9", s: "(" },
    { c: "0", s: ")" },
    { c: "-", s: "_" },
    { c: "+", s: "=" },
    { c: "q", s: "Q" },
    { c: "w", s: "W" },
    { c: "e", s: "E" },
    { c: "r", s: "R" },
    { c: "t", s: "T" },
    { c: "y", s: "Y" },
    { c: "u", s: "U" },
    { c: "i", s: "I" },
    { c: "o", s: "O" },
    { c: "p", s: "P" },
    { c: "{", s: "[" },
    { c: "}", s: "]" },
    { c: "a", s: "A" },
    { c: "s", s: "S" },
    { c: "d", s: "D" },
    { c: "f", s: "F" },
    { c: "g", s: "G" },
    { c: "h", s: "H" },
    { c: "j", s: "J" },
    { c: "k", s: "K" },
    { c: "l", s: "L" },
    { c: ";", s: ":" },
    { c: "'", s: '"' },
    { c: "\\", s: "|" },
    { c: "z", s: "Z" },
    { c: "x", s: "X" },
    { c: "c", s: "C" },
    { c: "v", s: "V" },
    { c: "b", s: "B" },
    { c: "n", s: "N" },
    { c: "m", s: "M" },
    { c: ",", s: "<" },
    { c: ".", s: ">" },
    { c: "/", s: "?" },
];

function VirtualKeyboard(props) {
    const [shiftOn, setShiftOn] = useState(false);
    const [charkeys, setCharkeys] = useState([]);
    const reducer = useCallback((state, action) => {
        var _a, _b;
        let ret = { shuffle: false };
        if (((_a = props.shuffleOn) === null || _a === void 0 ? void 0 : _a.includes(action.type)) ||
            ((_b = props.shuffleOn) === null || _b === void 0 ? void 0 : _b.includes("key")))
            ret = { shuffle: true };
        return ret;
    }, [props.shuffleOn]);
    const [state, dispatch] = useReducer(reducer, { shuffle: false });
    const onChange = useCallback((v, key) => {
        dispatch({ type: key });
        props.onChange(v);
    }, [props]);
    const keys = useMemo(() => {
        return charkeys.map((v) => (shiftOn ? v.s : v.c));
    }, [charkeys, shiftOn]);
    useEffect(() => {
        setCharkeys((k) => {
            var _a;
            let ret = k.length > 0 ? k : props.charKeys || KEYS;
            if ((((_a = props.shuffleOn) === null || _a === void 0 ? void 0 : _a.includes("start")) && k.length === 0) ||
                state.shuffle)
                ret = ret.sort(() => 0.5 - Math.random());
            return ret.slice();
        });
    }, [props.charKeys, props.shuffleOn, state.shuffle]);
    const updateText = useCallback((v) => onChange(`${props.value}${v}`, "charkey"), [onChange, props.value]);
    const backspace = useCallback(() => onChange(props.value.substring(0, props.value.length - 1), "backspace"), [onChange, props.value]);
    const clear = useCallback(() => onChange("", "clear"), [onChange]);
    const tab = useCallback((v) => onChange(`${props.value}\t`, "tab"), [onChange, props.value]);
    const space = useCallback((v) => onChange(`${props.value} `, "space"), [onChange, props.value]);
    return (jsxs("div", { className: props.className, style: {
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            gap: props.gap || "5px",
        }, children: [jsxs(FlexGrid, { column: 14, proportion: [...[...Array(13)].map(() => 7), 9], style: {
                    gap: props.gap || "5px",
                }, children: [keys
                        .slice(0, 13)
                        .map((v) => (jsx(Button, Object.assign({ text: v, onClick: updateText }, props.buttonProps), v))), jsx(Button, Object.assign({ text: "\u232B", onClick: backspace }, props.buttonProps))] }), jsxs(FlexGrid, { column: 13, proportion: [16, ...[...Array(12)].map(() => 7)], style: {
                    gap: props.gap || "5px",
                }, children: [jsx(Button, Object.assign({ text: "Tab", onClick: tab }, props.buttonProps)), keys
                        .slice(13, 25)
                        .map((v) => (jsx(Button, Object.assign({ text: v, onClick: updateText }, props.buttonProps), v)))] }), jsxs(FlexGrid, { column: 13, proportion: [...[...Array(12)].map(() => 7), 16], style: {
                    gap: props.gap || "5px",
                }, children: [keys
                        .slice(25, 37)
                        .map((v) => (jsx(Button, Object.assign({ text: v, onClick: updateText }, props.buttonProps), v))), jsx(Button, Object.assign({ text: "Shift", onClick: () => setShiftOn((v) => !v), active: shiftOn }, props.buttonProps))] }), jsxs(FlexGrid, { column: 6, proportion: [
                    9,
                    ...[...Array(4)].map(() => 7),
                    28,
                    ...[...Array(5)].map(() => 7),
                ], style: {
                    gap: props.gap || "5px",
                }, children: [jsx(Button, Object.assign({ text: "Clear", onClick: clear }, props.buttonProps)), keys
                        .slice(37, 41)
                        .map((v) => (jsx(Button, Object.assign({ text: v, onClick: updateText }, props.buttonProps), v))), jsx(Button, Object.assign({ text: "Space", onClick: space }, props.buttonProps)), keys
                        .slice(41, 46)
                        .map((v) => (jsx(Button, Object.assign({ text: v, onClick: updateText }, props.buttonProps), v)))] })] }));
}

export { VirtualKeyboard };
//# sourceMappingURL=index.js.map
