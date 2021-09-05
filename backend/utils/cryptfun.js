const crypto = require('crypto');
const { type } = require('os');

const config = require('../config/config');

const alg = 'aes-256-ctr';
const secretKey = config.config.encryptSecret;
console.log('encryptSecret', config);
const rb = crypto.randomBytes(16);
const encrypt = (text) => {
  const cphr = crypto.createCipheriv(alg, secretKey, rb);
  const enc = Buffer.concat([cphr.update(text), cphr.final()]);
  return {
    rb: rb.toString('hex'),
    content: enc.toString('hex')
  };
};
const decrypt = (hash) => {
  console.log('decrypt', hash);
  const dcphr = crypto.createDecipheriv(
    alg,
    secretKey,
    Buffer.from(hash.rb, 'hex')
  );
  const dec = Buffer.concat([
    dcphr.update(Buffer.from(hash.content, 'hex')),
    dcphr.final()
  ]);
  return dec.toString();
};
module.exports = {
  encrypt,
  decrypt
};
