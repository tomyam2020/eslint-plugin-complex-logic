# eslint-plugin-max-return-statements-per-function

This rule checks the number of logical operators in a conditional expression to see the complexity of the conditional expression.

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

The rule takes one option, which is the maximum number of logical operators in an expression. The default is 5.

You can set the option like this in `.eslintrc.js`:

```js
module.exports = {
  plugins: ["complex-logic"],
  rules: {
    "complex-logic/complex-logic": ["error", 5],
  },
};
```

## License

MIT