require('dotenv').config();

const stage = process.env.NODE_ENV || 'dev';

const cred = {
  dbUser: process.env.ATLAS_DB_USER,
  dbPassword: process.env.ATLAS_DB_PASSWORD.replace(/\\n/g, ''),
  clusterName: process.env.CLUSTER_NAME,
  dbName: process.env.MONGODB_DB_NAME,
  sessionSecret: process.env.MONGODB_SESSION_SECRET,
  sessionCollection: process.env.MONGODB_SESSION_COLLECTION_NAME,
  tokenSecret: process.env.TOKEN_SECRET,
  encryptSecret: process.env.ENCRYPT_SECRET
};

const atlasDbUser = cred.dbUser;
const atlasDbPassword = cred.dbPassword;
// const env = process.env.MONGODB_ENV;
const dbName = cred.dbName;
// Session config.
const sessionStorageSecret = cred.sessionSecret;
const sessionStorageCollection = cred.sessionCollection;
const tokenSecret = cred.tokenSecret;
const encryptSecret = cred.encryptSecret;

console.log('-------cred----------', cred);

// const AtlasURI = `mongodb+srv://admin:admin@cluster0.5cdt0.mongodb.net/secureBiz`;

const AtlasURI = `mongodb+srv://${atlasDbUser}:${atlasDbPassword.replace(
  /\s/g,
  ''
)}@${cred.clusterName}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

console.log('-------AtlasURI credentials---------', AtlasURI);
/**
 * Return session storage option object.
 *
 * @param store
 * @returns {{saveUninitialized: boolean, name: string, secret: string, store, resave: boolean, unset: string}}
 */
const sessionStorageOptions = (store) => ({
  secret: sessionStorageSecret, // Generate a secret here
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
  store: store,
  name: dbName
});

const collectionLocations = {
  Category: '../database/Categories.json',
  Feedback: '../database/Feedback.json',
  Question: '../database/Questions.json'
};

const uri = AtlasURI;

exports.config = {
  uri: uri,
  sessionStorageCollection: sessionStorageCollection,
  sessionStorageOptions: sessionStorageOptions,
  collectionLocations: collectionLocations,
  tokenSecret: tokenSecret,
  encryptSecret: encryptSecret
};
