/**
 * This script adds the DB population and clear command for migration/dev purpose:
 * - Command format: npm run migrate [MODEL_NAME] [OPERATION_FLAG]
 * - Eg. To clear Question model's collection (which is Questions)
 * run: `npm run migrate Question down`
 * this will clear up Question collection.
 * To populate Question model's collection using database/Questions.json file's data, run:
 * `npm run migrate Question up`
 * - The DB migration command use cases:
 * - Testing update/delete endpoints with frequent DB record updates, can restore collection quickly
 * - Migrations for a fresh MongoDB install
 * - The model and collection name definitions can be found from:
 * express/models folder.
 */

const fs = require('fs');
const models = require('../models/index');
const config = require('../config/dbConnect');

const modelName = process.argv[2];
const command = process.argv[3];
if (!command || command.length === 0 || !modelName || modelName.length === 0) {
  console.error(
    'Command is not complete. Check your format: node refreshCollection [modelName] [command]'
  );
  process.exit(1);
}

let p;
let collectionLocation;
let conn;

try {
  if (!config.dbConnect.collectionLocations.hasOwnProperty(modelName)) {
    throw new Error(`Model ${modelName} is not found.`);
  }

  collectionLocation = config.dbConnect.collectionLocations[modelName];
  conn = async () => await models.connectDb();
} catch (e) {
  console.error(e);
  process.exit(1);
}

const down = async () => {
  conn = await models.connectDb();
  await conn.models[modelName]
    .deleteMany()
    .exec()
    .then(() => {
      console.log(`Deleting all data in ${modelName} model collection.`);
    })
    .catch((e) => console.error(e));
};

const up = async () => {
  conn = await models.connectDb();
  const questions = JSON.parse(fs.readFileSync(collectionLocation, 'utf8'));
  const countDocs = await conn.models[modelName].countDocuments();
  if (countDocs >= questions.length) {
    await down();
    console.log('Cleared collection before inserting the JSON data.');
  }
  await conn.models[modelName]
    .insertMany(questions)
    .then(async () => {
      console.log(
        `Installed the json file's data to ${modelName} model collection.`
      );
      // Rebuild all indexes
      await conn.models[modelName].createIndexes();
    })
    .catch((e) => console.error(e));
};

switch (command) {
  case 'up':
    p = up();
    break;
  case 'down':
    p = down();
    break;
  default:
    console.log('Args not found. Skipping...');
}

Promise.all([p]).then(() => {
  console.log('All done. \nExiting...');
  process.exit(0);
});
