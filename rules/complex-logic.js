/**
 * @fileoverview A rule to check the complexity of logical expressions.
 * @author tomyam2020
 */

const DEFAULT_MAX_COUNT = 5;

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "check the complexity of logical expressions",
      recommended: false,
      url: "https://github.com/tomyam2020/eslint-plugin-complex-logic",
    },
    schema: [
      {
        type: "integer",
        minimum: 0,
        default: DEFAULT_MAX_COUNT,
      },
    ],
    messages: {
      exceed:
        "This logical expression has too many logical operators (the maximum allowed is {{max}}). Consider simplifying it.",
    },
  },

  create(context) {
    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    const maxLogicalExpressions = context.options[0] || DEFAULT_MAX_COUNT;
    const expressionStack = [];

    /**
     * @returns {void}
     * @private
     */
    function startExpression() {
      expressionStack.push(0);
    }

    /**
     * @param {ASTNode} node node to evaluate
     * @param {int} count Number of statements in node
     * @param {int} max Maximum number of statements allowed
     * @returns {void}
     * @private
     */
    function reportIfTooManyLogicalOperators(node, count, max) {
      if (count > max) {
        context.report({
          node,
          messageId: "exceed",
          data: { count, max },
        });
      }
    }

    /**
     * @param {ASTNode} node node to evaluate
     * @returns {void}
     * @private
     */
    function endExpression(node) {
      const count = expressionStack.pop();

      if (node.type !== "IfStatement") {
        return;
      }

      reportIfTooManyLogicalOperators(node, count, maxLogicalExpressions);
    }

    /**
     * @returns {void}
     * @private
     */
    function countLogicalOperator() {
      expressionStack[expressionStack.length - 1] += 1;
    }

    //--------------------------------------------------------------------------
    // Public API
    //--------------------------------------------------------------------------

    return {
      IfStatement: startExpression,

      LogicalExpression: countLogicalOperator,

      "IfStatement:exit": endExpression,
    };
  },
};
