'use strict'

module.exports = class CalculationRule {
  Statement
  Condition
  Level

  /**
   * Singular form of the calculation rule, include the condition string and result level.
   * @param Statement
   * @param Condition
   * @param Level
   */
  constructor (Statement, Condition, Level) {
    this.Statement = Statement
    this.Condition = Condition
    this.Level = Level
  }
}
