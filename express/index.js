const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');

const launchServer = async () => {
  try {
    this.expressServer = new ExpressServer(
      config.URL_PORT,
      config.OPENAPI_YAML
    );
    this.expressServer.validateEnvironment();
    this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    console.error(error);
    logger.error('Express Server failure', error.message);
    await this.close();
  }
};

launchServer().catch((e) => logger.error(e));
