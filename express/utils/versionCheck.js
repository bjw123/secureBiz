require('dotenv').config();
const semver = require('semver');
const readline = require('readline');
const pkg = require('../package.json');

/**
 * Check the system installed Node version meet the major version requirement,
 * if not throw error and let it crash.
 */
const validateNodeEnvVersion = () => {
  // System Node version.
  const nodeVersions = process.versions.node;

  const pagEnginesNode = pkg.engines.node;
  let pkgMajorVersionNumber;
  if (pkg.engines.node) {
    pkgMajorVersionNumber = semver.major(
      pagEnginesNode.match(/[\d\.-]+/).join()
    );
  }

  if (pkgMajorVersionNumber !== semver.major(nodeVersions)) {
    const errMsg = `Environment Node version ${nodeVersions} ``does not meet package Node version ${pagEnginesNode} requirement.`;
    const extraMsg = `Required Node version ${pagEnginesNode} but found ${nodeVersions}.`;
    console.error(extraMsg);

    // Throw error and let it crash.
    throw new Error(errMsg);
  }
};

const validateEnvironmentVariables = () => {
  const fs = require('fs');
  const path = '.env';

  // Purposely throw an error and crash the server if express/.env file is not found,
  // check only if it's not in production environment.
  if (
    !fs.existsSync(path) &&
    !(process.env.NODE_ENV && process.env.NODE_ENV === 'production')
  ) {
    const errMsg =
      'express/.env file does not exist, please create the file and fill in the variables ';
    ('from the template file .env.template');
    throw new Error(errMsg);
  }

  const readInterface = readline.createInterface({
    input: fs.createReadStream('../express/.env.template'),
    console: false
  });

  try {
    readInterface.on('line', (line) => {
      if (
        !line.match(/^#.*/g) &&
        line.match(/^[A-Z].*[!^=]/g) &&
        line.split('=').length > 0
      ) {
        const varName = line.split('=')[0];

        if (!process.env.hasOwnProperty(varName)) {
          throw new Error(
            `${varName} key does not exist in express/.env file.`
          );
        }

        if (
          typeof process.env[varName] === 'undefined' ||
          (typeof process.env[varName] !== 'undefined' &&
            process.env[varName].length === 0)
        ) {
          throw new Error(`${varName} value in express/.env file is invalid.`);
        }
      }
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { validateNodeEnvVersion, validateEnvironmentVariables };
