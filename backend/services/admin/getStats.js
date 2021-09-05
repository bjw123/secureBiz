const service = require('../Service');
const models = require('../../models/index');
const { decrypt } = require('../../utils/cryptfun');

const getStats = async () => {
  try {
    const conn = await models.connectDb();
    const st = await conn.models.Stats.find();

    console.log('getStats', st);
    models.closeDb();
    return st;
  } catch (e) {
    models.closeDb();
    console.log('getStats error', e);
    service.reject(405, 'Invalid input');
  }
};

module.exports = getStats;
