const Service = require('../Service');
const models = require('../../models/index');

const getAllAdminUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('getAllAdminUser triggered');
      const conn = await models.connectDb();
      // get all admin users from AdminUser Collection
      conn.models.AdminUser.find().exec((e, result) => {
        if (e) reject(Service.reject(500, 'error', undefined));

        models.closeDb();
        resolve(result);
      });
    } catch (e) {
      models.closeDb();
      Service.reject('failed');
    }
  });

module.exports = getAllAdminUser;
