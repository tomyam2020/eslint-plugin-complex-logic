const { RuleTester } = require("eslint");
const rule = require("../rules/complex-logic");

const ruleTester = new RuleTester();

ruleTester.run("complex-logic", rule, {
  valid: [
    {
      code: "if (true && true && true && true && true) {}",
    },
    {
      code: "if (true && true && true && true && true && true) {}",
      options: [5],
    },
    {
      code: "const foo = true && true && true && true && true ? 1 : 0;",
      parserOptions: { ecmaVersion: 6 },
    },
  ],
  invalid: [
    {
      code: "if (true && true && true && true && true && true) {}",
      errors: [
        {
          messageId: "exceed",
          data: { count: "5", max: 4 },
        },
      ],
    },
    {
      code: "if (true && true && true && true && true) {}",
      options: [3],
      errors: [
        {
          messageId: "exceed",
          data: { count: "4", max: 3 },
        },
      ],
    },
    {
      code: "const foo = true && true && true && true && true && true ? 1 : 0;",
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          messageId: "exceed",
          data: { count: "5", max: 4 },
        },
      ],
    },
  ],
});
