'use strict'

/**
 * The Expression object is the mapping from the Categories.json expressions for calculating the maturity levels:
 * https://bitbucket-students.deakin.edu.au/projects/DCVENT-PG/repos/asd-essential-eight-cyber-mitigation-toolkit_2020t3/browse/database/Categories.json#11-78
 */
module.exports = class Expression {
  Operator
  Rules
  Override
  Level

  constructor (Operator, Rules, Override = false, Level = 0) {
    this.Operator = Operator
    this.Rules = Rules
    this.Override = Override
    this.Level = Level
  }
}
