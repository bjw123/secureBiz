require('dotenv').config();

const atlasDbUser = process.env.ATLAS_DB_USER;
const atlasDbPassword = process.env.ATLAS_DB_PASSWORD;
const env = process.env.MONGODB_ENV;

const dbName = process.env.MONGODB_DB_NAME;

// Session config.
const sessionStorageSecret = process.env.MONGODB_SESSION_SECRET;
const sessionStorageCollection = process.env.MONGODB_SESSION_COLLECTION_NAME;

const localURI = 'mongodb://localhost:27017/';
const AtlasURI = `mongodb+srv://${atlasDbUser}:${atlasDbPassword}@cluster0.3gobj.mongodb.net/${dbName}?retryWrites=true&w=majority`;

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

// change 'local' to 'atlas' to access cloudDB
const uri = env === 'local' ? localURI : AtlasURI;

exports.dbConnect = {
  uri: uri,
  sessionStorageCollection: sessionStorageCollection,
  sessionStorageOptions: sessionStorageOptions,
  collectionLocations: collectionLocations
};
