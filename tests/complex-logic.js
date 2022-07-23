const { RuleTester } = require("eslint");
const rule = require("../rules/complex-logic");

const ruleTester = new RuleTester();

ruleTester.run("complex-logic", rule, {
  valid: [
    {
      code: "if (true && true && true && true && true && true) {}",
    },
    {
      code: "if (true && true && true && true && true && true && true) {}",
      options: [6],
    },
  ],
  invalid: [
    {
      code: "if (true && true && true && true && true && true && true) {}",
      errors: [
        {
          messageId: "exceed",
          data: { count: "6", max: 5 },
        },
      ],
    },
    {
      code: "if (true && true && true && true && true && true) {}",
      options: [4],
      errors: [
        {
          messageId: "exceed",
          data: { count: "5", max: 4 },
        },
      ],
    },
  ],
});
