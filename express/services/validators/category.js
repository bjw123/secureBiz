/**
 * Validator for adding a category.
 *
 * @param conn
 * @param category
 * @returns {Promise<{hasValidationError: boolean, validationErrorMsg: string}>}
 */
const addCategoryValidator = async (conn, category) => {
  let hasValidationError = false;
  let validationErrorMsg = '';

  if (!category.QuestionCategory || !category.Slug || !category.CodeName) {
    hasValidationError = true;
    validationErrorMsg = 'Invalid input data.';
    return { hasValidationError, validationErrorMsg };
  }

  // Minimum length for Expressions check.
  if (!category.Expressions || category.Expressions.length === 0) {
    hasValidationError = true;
    validationErrorMsg = 'Invalid Expressions data.';
    return { hasValidationError, validationErrorMsg };
  }

  const categoryModel = conn.models.Category;
  const uniqueFieldMatches = await existingCategoryUniqueFieldMatches(
    categoryModel,
    category
  );
  if (uniqueFieldMatches && uniqueFieldMatches.QuestionCategory) {
    hasValidationError = true;
    validationErrorMsg = 'Duplicate QuestionCategory, CodeName or Slug.';
    return { hasValidationError, validationErrorMsg };
  }

  return { hasValidationError, validationErrorMsg };
};

/**
 * Validation for updating a category.
 *
 * @param {Mongoose} conn
 * @param {object} category
 * @param {string} id
 * @returns {Promise<{hasValidationError: boolean, validationErrorMsg: string}>}
 */
const updateCategoryValidator = async (conn, category, id) => {
  let hasValidationError = false;
  let validationErrorMsg = '';

  if (
    !category.QuestionCategory ||
    !category.Slug ||
    !category.CodeName ||
    !id
  ) {
    hasValidationError = true;
    validationErrorMsg =
      'Path param {id}, QuestionCategory, Slug and CodeName are required.';
    return { hasValidationError, validationErrorMsg };
  }

  const found = await conn.models.Category.findOne({ _id: id }).exec();
  if (!found) {
    hasValidationError = true;
    validationErrorMsg =
      'Record not found. Please check path param {id} and/or the request body _id.';
    return { hasValidationError, validationErrorMsg };
  }

  return { hasValidationError, validationErrorMsg };
};

/**
 * Find a match by QuestionCategory, Slug and CodeName.
 *
 * @param {object} categoryModel
 * @param {object} category
 * @returns {Promise<*>}
 */
const existingCategoryUniqueFieldMatches = async (categoryModel, category) => {
  return await categoryModel
    .findOne({
      $or: [
        { QuestionCategory: category.QuestionCategory },
        { Slug: category.slug },
        { CodeName: category.CodeName }
      ]
    })
    .exec()
    .catch((e) => e);
};

module.exports = { addCategoryValidator, updateCategoryValidator };
