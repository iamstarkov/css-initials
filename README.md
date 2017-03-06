# initize

thoughtful and cross-browser `all: initial`.

—What is wrong about usual `all: initial`?
—Its [not supported in IE, Edge, Mobile android][IEEDGE].

—What do you mean by cross-browser?
—I took all properties and combined 'em with their initial values.

—What do you mean by thoughtful?
—There are several caveats about `all: initial` as it is now , and i build this package with those caveats in mind.

—What are the caveats?
— 1) initial values of `font-family`, `quotes` and `color` depends on browser
— 2) list of 14 properties depends on `currentcolor`, which is a reference to property `color`, which varies from browser to browser (hence prev point), and aforementioned list is: `-webkit-border-before-color`, `-webkit-text-fill-color`, `-webkit-text-stroke-color`, `border-block-end-color`, `border-block-start-color`, `border-bottom-color`, `border-inline-end-color`, `border-inline-start-color`, `border-left-color`, `border-right-color`, `border-top-color`, `column-rule-color`, `text-decoration-color`, `text-emphasis-color`.
— 3) initial value of `outline-color` is either `invert` if browser supports it, or `currentColor` otherwise.

—Is this all?
—It depends. If you want military grade CSS cascade defense, then no, otherwise hold on. Thing is that by spec `all: initial` doesnt apply initial values for `unicode-bidi` and `direction`.

—I never heard of `unicode-bidi`.
—To be honest, me neither. It is quite complicated and i dont know why one would need it. But as far as this property is not inherited its safe not to touch it.

—Whats up with `direction`?
—Correct question. First of all `direction` is all about `ltr/rtl` problem, second thing to notice is that its inheritable, so it will definitely affect your components. Its a problem from your components' bulletproofness point of view. and its also doesnt make sense to allow your components to inherit `direction` from outside world. because your components are optimised for `ltr` anyway, and `direction: rtl` wont make 'em automatically look good in arabic or hebrew. To fix `ltr/rtl` problem in proper way you would need relevant solution like [rtlcss][], because you dont only want to change direction, but you need to adjust `text-align`, `margin`, `padding`, `border-width`, etc.

—Is this all?
—yes, thanks for your attention.

[IEEDGE]: http://caniuse.com/#feat=css-all
[rtlcss]: https://github.com/MohammadYounes/rtlcss

## Usage

### css-in-js

#### jss

```
// once in your project, specify your
// ./src/components/app-initize/index.js
import initize from 'initize';

const basic = {
  'font-family': 'Arial, sans-serif',
  'quotes': '"“" "”" "‘" "’"',
  'color': 'black',
  'outline-color': 'black',
}

const appInitize = Object.assign({}, initize, basic);

export default appInitize;

// anywhere after in your components
// ./src/components/button/index.js

import React from 'react';
import cn from 'classnames';
import initize from '../app-initize';

const styles = {
  initize,
  button: { },
}

const Button = ({ sheet: { classes }, children, }) => (
  <button className={classes.initize + ' ' classes.button}>
    { children }
  </button>
};

export default injectSheet(styles)(Button);
```

#### styled-components

```js
// once in your project, specify your
// ./src/components/app-initize/index.js
import initize from 'initize';

const basic = {
  'font-family': 'Arial, sans-serif',
  'quotes': '"“" "”" "‘" "’"',
  'color': 'black',
  'outline-color': 'black',
}

const appInitize = Object.assign({}, initize, basic);

const toCSS = obj => Object.keys(obj).map(key => `${key}: ${obj[key]};`).join('\n');

export default toCSS(appInitize);

// anywhere after in your components
// ./src/components/button/index.js
import React from 'react';
import styled from 'styled-components';
import appInitize from '../app-initize';

const Button = styled.button`
  ${appInitize}
  display: inline-block;
  border-radius: 5px;
  /* …more styles here…*/
`;

export default Button;
```


## Caveats

* `color` varies from Browser To Browser
* `font-family` depends On User Agent
* `quotes` depends on User-Agent
