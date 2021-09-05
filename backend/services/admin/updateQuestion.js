const Service = require('../Service');
const models = require('../../models/index');
const { updateQuestionValidator } = require('../validators/question');

const updateQuestion = async (questionNo, change) => {
  try {
    const conn = await models.connectDb();
    const questionModel = conn.models.Question;

    const filter = { QuestionNumber: questionNo };
    const newValue = {
      $set: change
    };
    return await questionModel.findOneAndUpdate(filter, newValue).exec((e) => {
      if (e) {
        console.log('questionModel error');
      }
      models.closeDb();
      return 'success';
    });
  } catch (e) {
    models.closeDb();
    console.log(e);
  }
};
module.exports = updateQuestion;

// /**
//  * Update a question
//  * Update a question
//  *
//  * id Long ID of question to patch
//  * question Question question to update (optional)
//  * no response value expected for this operation
//  * */
// const updateQuestion = ({ QuestionNumber, question }) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       // Initialise connection and models.
//       const conn = await models.connectDb();
//       const questionModel = conn.models.Question;

//       // Validate input.
//       const validator = await updateQuestionValidator(
//         conn,
//         QuestionNumber,
//         question
//       );
//       if (validator.hasValidationError) {
//         reject(Service.rejectResponse(validator.validationErrorMsg, 400));
//       }

//       // Find question that has the QuestionNumber and update it.
//       const filter = { QuestionNumber: QuestionNumber };
//       await questionModel
//         .findOneAndUpdate(filter, { $set: question })
//         .exec((e) => {
//           if (e) reject(Service.rejectResponse(e, 500));

//           resolve(Service.successResponse(question));
//         });
//     } catch (e) {
//       reject(
//         Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
//       );
//     }
//   });

// module.exports = updateQuestion;
