'use strict';

const models = require('../models/index');
const ExpressionResolver = require('./ExpressionResolver');
const QuestionAnswered = require('./QuestionAnswered');

const AnsweredQuestionSetProcessor = class AnsweredQuestionSetProcessor {
  QuestionCategory;
  QuestionsAnswered; // {module.QuestionAnswered[]}
  Expressions; // {module.Expression[]}
  CalculationRules; // {module.CalculationRule[]}
  Level; // {number} The calculated maturity level.
  Category; // {string} The category string key.

  /**
   * Construct using QuestionAnswered
   *
   * @param {module.QuestionAnswered[]} QuestionsAnswered Array of QuestionAnswered objects.
   */
  constructor(QuestionsAnswered) {
    this.QuestionsAnswered = QuestionsAnswered;
  }

  /**
   * Query the DB for the category and return a Promise that holds the result array.
   *
   * @param {string} category The category string key from Categories.json's "QuestionCategory" value.
   * @returns {Promise<Array<Document>>} The Mongoose docs returned from DB.
   */
  processQuestionCategory = async (category) => {
    const query = { QuestionCategory: category };
    const categoryData = await models
      .connectDb()
      .then(() => models.Category.findOne(query));

    // categoryData is the query result doc object, extract the Expressions properties from it.
    this.Expressions = categoryData.Expressions;

    // Get the array of CalculationRule object, that contains if-else statements in it.
    const CalculationRules = this.loadConditions(categoryData.Expressions);

    // Filtered the this.QuestionsAnswered array, return a new array of categories with QuestionCategory matches.
    const categoryQuestionsAnswered = this.QuestionsAnswered.filter(
      (qa) => qa.QuestionCategory === category
    );

    // This will give you the final level in number form.
    this.Level = this.evaluateConditionsScore(
      categoryQuestionsAnswered,
      CalculationRules,
      category
    );

    this.QuestionCategory = categoryData;
    return { category: QuestionCategory, level: this.Level };
  };

  /**
   * Filter the QuestionsAnswered array by querying the matching QuestionSetNumber.
   *
   * @param {number} QuestionSetNumber
   * @returns {module.QuestionAnswered} Return the first element from the filtered array.
   */
  filterQuestion = (QuestionSetNumber) => {
    const QuestionsAnswered = this.QuestionsAnswered;
    const filteredQuestionsAnswered = QuestionsAnswered.filter(
      (qa) => qa.QuestionSetNumber === QuestionSetNumber
    );
    // If there is element object having `QuestionSetNumber` match from the QuestionAnswered array, return that element.
    if (filteredQuestionsAnswered.length > 0) {
      return filteredQuestionsAnswered[0];
    }

    // Assign dummy values to the object, if no matching answered questions are found.
    // For any numbers that passed in filterQuestion(), it'll always return a QuestionAnswered object.
    // The condition properties like Answer and SelectedOptions are purposely being null or empty array, so when
    // evaluating it, the conditions using dummy object like this will always be false.
    // This is just to prevent undefined errors when accessing filterQuestion(x)'s properties like SelectedOptions.
    const emptyAnsweredQuestions = new QuestionAnswered(
      this.Category,
      'DUMMY',
      '',
      0,
      0,
      0,
      0,
      []
    );
    emptyAnsweredQuestions.Answer = null;
    emptyAnsweredQuestions.SelectedOptions = [];

    return emptyAnsweredQuestions;
  };

  /**
   * Evaluate the answers against the calculation rules to get a maturity level.
   *
   * @param {module.QuestionAnswered[]} QuestionsAnswered
   * @param {module.CalculationRule[]} CalculationRules
   * @param {string} Category
   * @returns {number} The final maturity level.
   */
  evaluateConditionsScore = (QuestionsAnswered, CalculationRules, Category) => {
    // Assign the filter function to "Q()" function notation.
    const Q = this.filterQuestion;
    this.Category = Category;
    let level = 0;

    // We want to evaluate from higher level first.
    CalculationRules.sort((a, b) => b.Level - a.Level);

    // Iterate CalculationRules array, and use eval to evaluate the condition string as JavaScript.
    for (let rule of CalculationRules) {
      // Example rule string value will be like: "if (Q(1).answer == false) level = 0"
      // "Q(1)" will return a {module.QuestionAnswered} object has the attributes to evaluate in the eval statement.
      if (eval(rule.Condition) === true) {
        // If true then stop evaluation and break with result level.
        eval(rule.Statement);
        break;
      }
    }

    // If no condition match in eval statement, return 0 by default.
    return level;
  };

  /**
   * Convert expressions from DB collection to JavaScript if-else statement in string form.
   *
   * @param expressions
   * @returns {module.CalculationRule[]}
   */
  loadConditions = (expressions) => {
    const exps = expressions;
    if (!exps || exps.length === 0) {
      throw new Error('Invalid expressions found.');
    }

    return (this.CalculationRules = exps.map((expression) => {
      const resolver = new ExpressionResolver(expression);
      return resolver.expressionConditionString();
    }));
  };
};

module.exports = AnsweredQuestionSetProcessor;
