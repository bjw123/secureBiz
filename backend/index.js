// const logger = require('./logger');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OpenAPIBackend, ValidationResult } = require('openapi-backend');
const { OpenApiValidator } = require('express-openapi-validator');
const AdminsController = require('./controllers/AdminsController');
const PublicController = require('./controllers/PublicController');
const getAllQuestions = require('./services/public/getAllQuestions');
const addFeedback = require('./services/public/addFeedback');
const postCategoryCoreResult = require('./services/public/postCategoryCoreResult');
const queryQuestionCategoryResult = require('./services/public/queryQuestionCategoryResult');
const generatePdfReport = require('./services/public/generatePdfReport');
const getAllFeedback = require('./services/admin/getAllFeedback');
const getStats = require('./services/admin/getStats');
const updateQuestion = require('./services/admin/updateQuestion');
const getAllAdminUser = require('./services/admin/adminLogin');
const vertifyToken = require('./services/public/vertifyToken');
const addStats = require('./services/public/addStats');
const service = require('./services/Service');
const config = require('./config/config');
const ExpressServer = require('./expressServer');
const { encrypt, decrypt } = require('./utils/cryptfun');

const headers = {
  'content-type': 'application/json',
  'access-control-allow-origin': '*', // lazy cors config
  'Access-Control-Allow-Credentials': true
};

const api = new OpenAPIBackend({
  definition: './api/openapi.yaml',
  quick: true,
  validate: true
});
const spec = path.join(__dirname, './api/openapi.yaml');
const tokenSecret = config.config.tokenSecret;
// register some handlers

// Currently in used API by frontend
// publicAPI.postCategoryCoreResult
// publicAPI.addFeedback
// publicAPI.getAllQuestions
// publicAPI./category/result/pdf

api.register({
  adminlogin: async (c, event, context) => {
    try {
      console.log('event.body', event.body);
      const { email, password } = JSON.parse(event.body);

      // Retrieve userList from DB
      const userList = await getAllAdminUser();
      const userMatched = userList.find((v) => v.email === email);

      // Email match userList
      if (userMatched) {
        const storedPW = userMatched.password;

        // Create salt, hash password
        const salt = await bcrypt.genSalt(10);
        const pwHashed = await bcrypt.hash(password, salt);
        // Compare inputted pw with pw from DB
        const match = await bcrypt.compare(password, storedPW);
        if (match) {
          const accessToken = jwt.sign(JSON.stringify(email), tokenSecret);
          console.log('accessToken', accessToken);
          return service.success(200, undefined, {
            accessToken
          });
        }
        return service.reject(403, 'Invalidate credentials');
      }
      // Email Not match userList

      return service.reject(403, 'No such username.');
    } catch (e) {
      // General catch error
      console.log(e);
      return service.reject(403, 'Missing credentials or invalid format.');
    }
  },
  vertifytoken: async (c, event, context) => {
    try {
      const { accessToken } = JSON.parse(event.body);
      const result = await vertifyToken(accessToken);

      if (result) {
        return service.success(200, 'Token is valid.', { valid: true });
      }
      return service.reject(403, 'Invalid token.', { valid: false });
    } catch (e) {
      console.log(e);
      return service.reject(403, 'Invalidate token');
    }
  },
  getAllQuestions: async (c, event, context) => {
    try {
      const result = await getAllQuestions();
      return service.success(200, undefined, { result });
    } catch (e) {
      console.log(e);
      return service.reject(403, 'server error');
    }
  },
  updateQuestion: async (c, event, context) => {
    try {
      console.log('updateQuestion triggered');
      const { accessToken, questions } = JSON.parse(event.body);
      const vertify = await vertifyToken(accessToken);
      // token valid
      if (vertify) {
        // create a Promise list of MongoDB update request
        const updateList = [];
        questions.forEach((v, i) => {
          updateList.push(updateQuestion(v.number, v.change));
        });
        await Promise.all(updateList);
      }
      return service.success(200, 'success');
    } catch (e) {
      console.log(e);
      return service.reject(403, 'server error');
    }
  },
  addFeedback: async (c, event, context) => {
    //    console.log('addFeedback', event.body);
    //    return service.success(200, 'added');
    try {
      console.log('addFeedback', event.body);
      const { name, phone, email, content } = JSON.parse(event.body);
      // operation here
      const encryptedPhone = encrypt(phone);
      const encryptedEmail = encrypt(email);
      const result = await addFeedback({
        name,
        phone: encryptedPhone,
        email: encryptedEmail,
        content
      });
      return service.success(200, 'added');
    } catch (e) {
      console.log(e);
      return service.reject(500, 'server error');
    }
  },
  getAllFeedback: async (c, event, context) => {
    try {
      const { accessToken } = JSON.parse(event.body);
      const vertify = await vertifyToken(accessToken);
      if (vertify) {
        const result = await getAllFeedback();
        console.log('getAllFeedback', result);
        return service.success(200, undefined, { result: result });
      }
      return service.reject(403, 'Invalidate token');
    } catch (e) {
      console.log(e);
      return service.reject(500, 'server error');
    }
  },
  getStats: async (c, event, context) => {
    try {
      const { accessToken } = JSON.parse(event.body);
      const vertify = await vertifyToken(accessToken);
      if (vertify) {
        const result = await getStats();
        console.log('getStatsResults', result);
        return service.success(200, undefined, { result: result });
      }
      return service.reject(403, 'Invalidate token');
    } catch (e) {
      console.log(e);
      return service.reject(500, 'server error');
    }
  },

  postCategoryCoreResult: async (c, event, context) => {
    try {
      // const result = await postCategoryCoreResult(JSON.parse(event.body));
      const parsedBody = JSON.parse(event.body);
      const submittedCategory = parsedBody.Questions[0].QuestionCategory;

      const result = await queryQuestionCategoryResult(parsedBody);
      try {
        await addStats(submittedCategory);
      } catch (e) {
        console.log('addStats', e);
      } finally {
        return service.success(200, undefined, [
          { Level: result.level, QuestionCategory: submittedCategory }
        ]);
      }
    } catch (e) {
      console.log(e);
      return service.reject(500, 'server error');
    }
  },
  generatePdfReport: async (c, event, context) => {
    try {
      const pdfContent = await generatePdfReport(JSON.parse(event.body));
      console.log('generatePdfReport', pdfContent);
      return service.success(200, undefined, { ...pdfContent });
    } catch (e) {
      console.log(e);
      return service.reject(500, 'server error');
    }
  },

  notFound: async (c, event, context) =>
    service.reject(404, 'Unfortunately, API not found.')
});

// init api
api.init();

async function handler(event, context) {
  const handler = {
    method: event.httpMethod,
    path: event.path,
    query: event.queryStringParameters,
    body: event.body,
    headers: event.headers
  };

  console.log(handler);

  // return  OpenApiValidator.middleware({
  //   spec,
  //   operationHandlers: path.join(__dirname),
  // })

  return api.handleRequest(
    {
      method: event.httpMethod,
      path: event.path,
      query: event.queryStringParameters,
      body: event.body,
      headers: event.headers
    },
    event,
    context
  );
}

exports.handler = handler;

// const launchServer = async () => {
//   try {
//     this.expressServer = new ExpressServer(
//       config.URL_PORT,
//       config.OPENAPI_YAML
//     );
//     this.expressServer.validateEnvironment();
//     this.expressServer.launch();
//     logger.info('Express server running');
//   } catch (error) {
//     console.error(error);
//     logger.error('Express Server failure', error.message);
//     await this.close();
//   }
// };

// launchServer().catch((e) => logger.error(e));
