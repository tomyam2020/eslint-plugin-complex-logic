# eslint-plugin-complex-logic

[![npm version](https://badge.fury.io/js/eslint-plugin-complex-logic.svg)](https://badge.fury.io/js/eslint-plugin-complex-logic)

This rule checks the number of logical operators in a conditional expression to see its complexity.

```js
/* eslint complex-logic/complex-logic: ["error", 4] */

// incorrect
if (true && true && true && true && true && true) {
}

const foo = true && true && true && true && true && true ? 1 : 0;

// correct
if (true && true && true && true && true) {
}

const bar = true && true && true && true && true ? 1 : 0;
```

## Installation

### npm

```shell
npm install --save-dev eslint-plugin-complex-logic
```

### yarn

```shell
yarn add -D eslint-plugin-complex-logic
```

## Usage

The rule takes one option, which is the maximum allowed number of logical operators in an expression. The default is 4.

You can set the option like this in `.eslintrc.js`:

```js
module.exports = {
  plugins: ["complex-logic"],
  rules: {
    "complex-logic/complex-logic": ["error", 4],
  },
};
```

## License

MIT
