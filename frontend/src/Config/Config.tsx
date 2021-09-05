require('dotenv').config();

const stage: 'dev' | 'test' | 'prod' = 'dev';

const envURL = {
  dev: {
    clientBaseURL: 'http://localhost:8081',
    serverBaseURL: 'http://localhost:3001/dev/',
  },
  test: {
    clientBaseURL: 'https://test.securebizapp.com',
    serverBaseURL:
      'https://d8xbt0df82.execute-api.ap-southeast-2.amazonaws.com/test/',
  },
  prod: {
    clientBaseURL: 'https://securebizapp.com',
    serverBaseURL:
      'https://6slw4eqlz4.execute-api.ap-southeast-2.amazonaws.com/prod/',
  },
};

export const url = envURL[stage];

//https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5
