'use strict'

const Expression = require('./Expression')
const CalculationRule = require('./CalculationRule')

module.exports = class ExpressionResolver {
  RuleObj
  ExpressionCondition
  ExpressionStatement
  Level

  /**
   * Constructor takes expression object to  initialise internal variables.
   *
   * @param {module.Expression} expression Pass in the Expression object to resolve.
   */
  constructor(expression) {
    if (typeof expression !== 'object' || !expression) {
      throw new Error('Invalid expression object received.')
    }

    if (!Array.isArray(expression.Rules) || expression.Rules.length === 0) {
      throw new Error('Invalid rule format in expression found.')
    }

    this.RuleObj = new Expression(expression.Operator, expression.Rules, expression.Override, expression.Level)
    this.Level = expression.Level
    // This builds if-else statements.
    this.ExpressionStatement = `if ${this.expressionToString(expression)} level = ${this.Level}`
    // This returns condition only.
    this.ExpressionCondition = `${this.expressionToString(expression)}`
  }

  /**
   * This function takes {module.Expression} expression object and return a condition string built from it.
   *
   * Eg. The below is an Expression object:
   *  {
   *      "Operator": "AND",
   *      "Rules": [
   *          "Q(1).answer == true",
   *          {
   *              "Operator": "ALLIN",
   *              "Rules": ["Q(2).selectedOptions", ["a", "b", "c", "d", "e"]]
   *          },
   *          "Q(3).answer == true",
   *          "Q(4).answer == true"
   *      ],
   *      "Override": false,
   *      "Level": 2
   *  }
   *
   * The function will take the above object and return you below condition in string form:
   * (Q(1).answer == true
   * && (Q(2).selectedOptions.every((el) => (["a", "b", "c", "d", "e"].indexOf(el) !== -1)))
   * && Q(3).answer == true
   * && Q(4).answer == true)
   *
   * @param {module.Expression} exp Expression object.
   * @returns {string}
   */
  expressionToString = (exp) => {
    const expressionToString = this.expressionToString
    let conditionString = ``
    let rules

    // Based on the Operator string value, eg. "Operator": "AND", handle it case by case.
    switch(exp.Operator) {
      case 'AND':
        // Construct condition strings and return an array.
        rules = exp.Rules.map(rule => {
          if (typeof rule === 'object') {
            // If there are nested rules objects like the below:
            //  Rules: [
            //     'Q(1).answer == true',
            //     { Operator: 'ANYIN', Rules: [Array] }, <- Keep converting it until it's all string.
            //     'Q(3).answer == false'
            //   ]
            // Converting it to string recursively.
            return `(${expressionToString(rule)})`
          }

          // If it's in string form like 'Q(3).answer == false', return it directly.
          if (typeof rule === 'string') {
            return rule
          }
        })

        // Concatenation of string condition array using && for 'AND' operator.
        conditionString += `(${rules.join(' && ')})`
        break
      case 'OR':
        // Construct condition strings and return an array.
        rules = exp.Rules.map(rule => {
          if (typeof rule === 'object') {
            // If there are nested rules objects like the below:
            //  Rules: [
            //     'Q(1).answer == true',
            //     { Operator: 'ANYIN', Rules: [Array] }, <- Keep converting it until it's all string.
            //     'Q(3).answer == false'
            //   ]
            // Converting it to string recursively.
            return `(${expressionToString(rule)})`
          }

          // If it's in string form like 'Q(3).answer == false', return it directly.
          if (typeof rule === 'string') {
            return rule
          }
        })

        // Concatenation of string condition array using || for 'OR' operator.
        conditionString += `(${rules.join(' || ')})`
        break
      case 'IN':
        // Using Array.includes to check expression like this:
        // { "Operator": "IN", "Rules": ["Q(2).Answer", ["a", "b"]]}
        // If Q(2).Answer == "b", the result string will be `(["a", "b"].includes("b"))`.
        conditionString += `(${JSON.stringify(exp.Rules[1])}.includes(${exp.Rules[0]}))`
        break
      case 'ANYIN':
        // The result string format: `(firstArr.filter(x => secondArr.indexOf(x) !== -1).length > 0)`.
        conditionString += `(${exp.Rules[0]}.filter(x => ${JSON.stringify(exp.Rules[1])}.indexOf(x) !== -1).length > 0)`
        break
      case 'ALLIN':
        // The result string format: `(selectedOptions.every((el) => (allOptions.indexOf(el) !== -1)))`.
        conditionString += `(${exp.Rules[0]}.every((el) => (${JSON.stringify(exp.Rules[1])}.indexOf(el) !== -1)))`
        break
      default:
        // By default, Operator is empty ("Operator": ""), should use the first and the only rule only.
        conditionString += `(${exp.Rules[0]})`
    }

    return conditionString
  }

  /**
   * Return the condition string and result level included in a CalculationRule object.
   *
   * @returns {CalculationRule}
   */
  expressionConditionString = () => {
    return new CalculationRule(this.ExpressionStatement, this.ExpressionCondition, this.Level)
  }
}
