/**
 * Validation for update question service.
 *
 * @param {Mongoose} conn
 * @param {number} QuestionNumber QuestionNumber of a question.
 * @param {object} question Question object from the request body.
 * @returns {Promise<{hasValidationError: boolean, validationErrorMsg: string}>}
 */
const updateQuestionValidator = async (conn, QuestionNumber, question) => {
  let hasValidationError = false;
  let validationErrorMsg = '';

  // Check consistency of the QuestionNumber in path param and in the request body.
  if (
    !QuestionNumber ||
    !question.QuestionNumber ||
    QuestionNumber !== question.QuestionNumber
  ) {
    hasValidationError = true;
    validationErrorMsg =
      'Invalid QuestionNumber found either in the path param or QuestionNumber value.';
    return { hasValidationError, validationErrorMsg };
  }

  // Check if Answers have duplicate valued items.
  const questionValue = question.Answers.map((item) => item.Value);
  const isDuplicate = question.Answers.some(
    (item, idx) => questionValue.indexOf(item.Value) !== idx
  );
  if (isDuplicate) {
    hasValidationError = true;
    validationErrorMsg = 'Answers have duplicate values.';
    return { hasValidationError, validationErrorMsg };
  }

  // Check minimum length of Answers.
  if (!question.Answers || question.Answers.length < 2) {
    hasValidationError = true;
    validationErrorMsg = 'Please provide at least two answers.';
    return { hasValidationError, validationErrorMsg };
  }

  // Check if the record with the QuestionNumber exists.
  const found = await conn.models.Question.findOne({
    QuestionNumber: QuestionNumber
  }).exec();

  if (!found) {
    hasValidationError = true;
    validationErrorMsg =
      'Record not found. Please check QuestionNumber in the path param and the request body.';
    return { hasValidationError, validationErrorMsg };
  }

  return { hasValidationError, validationErrorMsg };
};

/**
 * Validate the payload and return error flag and error message.
 *
 * @param {Mongoose} conn
 * @param {object} question
 * @returns {Promise<{hasValidationError: boolean, validationErrorMsg: string}>}
 */
const addQuestionValidator = async (conn, question) => {
  let hasValidationError = false;
  let validationErrorMsg = '';

  const questionModel = conn.models.Question;

  // Answers length must be less than 2 or falsy.
  if (!question.Answers || question.Answers.length < 2) {
    hasValidationError = true;
    validationErrorMsg = 'Please provide at least two answers.';
    return { hasValidationError, validationErrorMsg };
  }

  // Check for duplicate valued Answers item.
  const questionValue = question.Answers.map((item) => item.Value);
  const isDuplicate = question.Answers.some(
    (item, idx) => questionValue.indexOf(item.Value) !== idx
  );
  if (isDuplicate) {
    hasValidationError = true;
    validationErrorMsg = 'Answers have duplicate values.';
    return { hasValidationError, validationErrorMsg };
  }

  // Do not provide ID for insertion.
  if (question.id) {
    hasValidationError = true;
    validationErrorMsg = 'Do not provide the ID for adding a new record.';
    return { hasValidationError, validationErrorMsg };
  }

  // If QuestionCore value is true, then QuestionCoreNumber must present and must be a number.
  if (
    question.QuestionCore === true &&
    typeof question.QuestionCoreNumber !== 'number'
  ) {
    hasValidationError = true;
    validationErrorMsg = 'Invalid QuestionCoreNumber.';
    return { hasValidationError, validationErrorMsg };
  }

  const existingQuestionNumber = await questionModel
    .findOne({ QuestionNumber: question.QuestionNumber })
    .exec()
    .catch((e) => e);

  // QuestionNumber must be unique.
  if (existingQuestionNumber && existingQuestionNumber.QuestionNumber) {
    hasValidationError = true;
    validationErrorMsg = 'Duplicate QuestionNumber.';
    return { hasValidationError, validationErrorMsg };
  }

  const existingQuestionCoreNumber = await questionModel
    .findOne({ QuestionCoreNumber: question.QuestionCoreNumber })
    .exec()
    .catch((e) => e);

  // QuestionCoreNumber must be unique.
  if (
    existingQuestionCoreNumber &&
    existingQuestionCoreNumber.QuestionCoreNumber
  ) {
    hasValidationError = true;
    validationErrorMsg = 'Duplicate QuestionCoreNumber.';
    return { hasValidationError, validationErrorMsg };
  }

  const foundDuplicateQuestionSetNumber = await existingQuestionSetNumber(
    questionModel,
    question
  );

  // Check QuestionSetNumber in the QuestionCategory. QuestionSetNumber must be unique in a QuestionCategory.
  if (
    foundDuplicateQuestionSetNumber &&
    foundDuplicateQuestionSetNumber.QuestionSetNumber
  ) {
    hasValidationError = true;
    validationErrorMsg =
      `Duplicate QuestionSetNumber ${question.QuestionSetNumber}` +
      ` in QuestionCategory ${question.QuestionCategory}.`;
    return { hasValidationError, validationErrorMsg };
  }

  return { hasValidationError, validationErrorMsg };
};

/**
 *
 * @param {object} questionModel
 * @param {object} question
 * @returns {Promise<*>}
 */
const existingQuestionSetNumber = async (questionModel, question) => {
  return await questionModel
    .findOne({
      QuestionCategory: question.QuestionCategory,
      QuestionSetNumber: question.QuestionSetNumber
    })
    .exec()
    .catch((e) => e);
};

module.exports = { addQuestionValidator, updateQuestionValidator };
