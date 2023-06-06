<div align="center">
    <a href="https://swashapp.io/" target="blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Keyboard-icon_Wikipedians.svg" width="300" alt="Swash Logo" />
    </a>
</div>

<div align="center">
    <b>React Virtual Keyboard</b>
</div>

# Virtual Keyboard

React Virtual Keyboard is a small library for react developers who they need a customizable virtual keyboard for their applications.

# Issues & Questions

For reporting issues or asking questions please use the [github issues](https://github.com/sajjadkarimi/react-virtual-keyboard) or contact [skarimi68@gmail.com](mailto://skarimi68@gmail.com).

# Getting Started

You can simply add this library to your react application using npm or yarn.

```bash
npm install react-virtual-keyboard

yarn add react-virtual-keyboard
```

## How to use

After installing library, you can use VirtualKeyboard component in your application same as below:

```bash
import { VirtualKeyboard } from 'react-virtual-keyboard';

...
      <VirtualKeyboard
        className="virtualKeyboard"
        value={text}
        onChange={setText}
        shuffleOn={["charkey", "start"]}
        buttonProps={{
          className: "btn",
          activeClassName: "activeBtn",
        }}
        gap="10px"
      />
    </div>
```

### Props

| Prop        | Options                                                                  | Description                                                                                                                                                                                                                                      |
| :---------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className   | string                                                                   | CSS class name to change keyboard pan                                                                                                                                                                                                            |
| value       | string                                                                   | State value of keyboard                                                                                                                                                                                                                          |
| onChange    | Function `(value: string) => void`                                       | onChange method                                                                                                                                                                                                                                  |
| shuffleOn   | Array of `start`, `charkey`, `space`, `clear`, `tab`, `backspace`, `key` | If this array includes one of these options, character keys will be shuffled on that event. for example `start` option shuffles keys on mount, `tab` option shuffles keys when tab key is pressed and `key` option shuffles them on each button. |
| buttonProps | Object containing `className` and `activeClassName`                      | You can customize buttons based on your need using className. and add another style to `shift` button when it is pressed using activeClassName                                                                                                   |
| gap         | string or number                                                         | This prop let you change the gap among buttons                                                                                                                                                                                                   |
| charKeys    | Array of `{ c: string, s: string} `                                      | You will be able to change character keys of keyboard by providing an array of `c` as character and `s` as corresponding character which will be shown when shift is pressed                                                                     |
