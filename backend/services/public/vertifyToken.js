const jwt = require('jsonwebtoken');

const config = require('../../config/config');

const tokenSecret = config.config.tokenSecret;

const vertifyToken = async (accessToken) => {
  let tokenError;
  try {
    let decrytedData;
    jwt.verify(accessToken, tokenSecret, (err, decoded) => {
      tokenError = err;

      decrytedData = decoded;
    });
    if (decrytedData !== undefined) return true;
    return false;
  } catch (e) {
    return false;
  }
};
module.exports = vertifyToken;
