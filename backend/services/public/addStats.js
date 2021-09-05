const sanitizeHtml = require('sanitize-html');
const Service = require('../Service');
const models = require('../../models/index');

const addStats = async (category) => {
  try {
    if (category) {
      const conn = await models.connectDb();
      const Stats = conn.models.Stats;
      const insert = {
        category: sanitizeHtml(category),
        createdAt: Date.now()
      };

      //   console.log('insert', insert);
      const st = new Stats(insert);

      await st
        .save()
        .then((r) => {
          console.log('addStats saved', r);
        })
        .catch((e) => {
          console.log('Add stats failed', e);
        });
    }
  } catch (e) {
    console.log('Add stats failed', e);
  }
};
module.exports = addStats;
