// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
const s3 = require('./config/s3');

//const { pool, initMysqlTable} = require('./config/mysql')

// open mongoose connection
mongoose.connect();

//s3.initS3();

//initMysqlTable()

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
