'use strict'

module.exports = class Answer {
  Value
  Label
  QuestionNext
  QuestionNextCore

  constructor (Value, Label, QuestionNext, QuestionNextCore) {
    this.Value = Value
    this.Label = Label
    this.QuestionNext = QuestionNext
    this.QuestionNextCore = QuestionNextCore
  }
}
