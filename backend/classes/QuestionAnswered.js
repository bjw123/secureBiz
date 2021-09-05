'use strict'

const QUESTION_TYPE_MULTIPLE = 'MULTIPLE'
const QUESTION_TYPE_RADIO = 'RADIO'
const QUESTION_TYPE_BOOLEAN = 'BOOLEAN'

module.exports = class QuestionAnswered {
  QuestionCategory
  QuestionType // Must be one element of the array [ "MULTIPLE", "RADIO", "BOOLEAN" ]
  Mitigation
  QuestionSetNumber
  QuestionNumber
  QuestionCore
  QuestionCoreNumber
  QuestionLabel
  QuestionDescription
  QuestionAnswersString
  Answers // {array} This is the question's original answers selected by user, always array format.
  Answer // {string|boolean} Selected answer derived from original user answers for "RADIO", "BOOLEAN" question type.
  SelectedOptions // {array} Selected answers derived from original user answers for "MULTIPLE" question type.
  isValidationFailed = false // {boolean} This flag will be true if the validation fails.
  validationFailedType // {string} This is to record the question type for which the validation fails.
  validationErrorMessage // {string} This is to set the error message for the question.

  /**
   * Construct the singular form of the question answered by the user.
   *
   * @param QuestionCategory {string}
   * @param QuestionType {string}
   * @param Mitigation {string}
   * @param QuestionSetNumber {number}
   * @param QuestionNumber {number}
   * @param QuestionCore {number}
   * @param QuestionCoreNumber {number}
   * @param Answers  // {array} This is the question's original answers selected by user, always array format.
   * @param QuestionLabel
   * @param QuestionDescription
   */
  constructor (
    QuestionCategory= '',
    QuestionType= '',
    Mitigation = '',
    QuestionSetNumber,
    QuestionNumber,
    QuestionCore,
    QuestionCoreNumber,
    Answers,
    QuestionLabel = '',
    QuestionDescription = ''
  ) {
    this.QuestionCategory = QuestionCategory
    this.QuestionType = QuestionType
    this.Mitigation = Mitigation
    this.QuestionSetNumber = QuestionSetNumber
    this.QuestionNumber = QuestionNumber
    this.QuestionCore = QuestionCore
    this.QuestionCoreNumber = QuestionCoreNumber
    this.Answers = Answers
    this.QuestionLabel = QuestionLabel
    this.QuestionDescription = QuestionDescription

    this.formatAnswers()
  }

  /**
   * Based on the type of the question [ "MULTIPLE", "RADIO", "BOOLEAN" ],
   * respective derived properties will need to be updated.
   */
  formatAnswers = () => {
    if (typeof this.QuestionType !== 'string' || this.QuestionType.length === 0) {
      throw new Error('Questions type value is invalid.')
    }

    const answersLength = this.Answers.length

    switch (this.QuestionType) {
      case QUESTION_TYPE_MULTIPLE:
        if (answersLength === 0 || answersLength < 2 || this.isAnswersHaveDuplicate()) {
          this.setValidationError(QUESTION_TYPE_MULTIPLE)
          break
        }
        // Pass on to SelectedOptions directly.
        this.SelectedOptions = this.Answers.map(answer => answer.Value)
        this.QuestionAnswersString = this.Answers.map(answer => `<div>${answer.Value.toUpperCase()}: ${answer.Label}</div>`)
          .join('<br>')
        break
      case QUESTION_TYPE_RADIO:
        if (answersLength === 0 || answersLength > 1 || this.isAnswersHaveDuplicate()) {
          this.setValidationError(QUESTION_TYPE_RADIO)
          break
        }
        // There can only be one element, use the first element of the user selected answers array as the answer.
        // Eg. Convert it from array Answers = ['a'] to string Answer = 'a'.
        this.Answer = this.Answers[0].Value
        this.QuestionAnswersString = `${this.Answers[0].Value.toUpperCase()}: ${this.Answers[0].Label}`
        break
      case QUESTION_TYPE_BOOLEAN:
        if (answersLength === 0 || answersLength > 1 || this.isAnswersHaveDuplicate()) {
          this.setValidationError(QUESTION_TYPE_BOOLEAN)
          break
        }
        // There can only be one element, use the first element of the user selected answers array as the answer.
        // Eg. Convert it from array Answers = [true] to boolean Answer = true.
        this.Answer = (this.Answers[0].Value === true) || false
        this.QuestionAnswersString = this.Answers[0].Label.toString().toUpperCase()
        break
      default:
    }
  }

  /**
   * Under any circumstance, the answers should not contain objects that have identical `Value`.
   *
   * @returns {boolean}
   */
  isAnswersHaveDuplicate = () => {
    const answersValues = this.Answers.map(a => a.Value)

    return answersValues.some((item, idx) => answersValues.indexOf(item) !== idx)
  }

  /**
   * Set validation flag and error message.
   *
   * @param {string} type
   */
  setValidationError = (type) => {
    this.isValidationFailed = true
    this.validationFailedType = type
    this.validationErrorMessage = `Invalid ${this.validationFailedType} input from category ${this.QuestionCategory} `
      + `questions #${this.QuestionSetNumber}'s answers.`
  }
}
