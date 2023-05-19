// import .env variables
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  //mysqlEnv: process.env.mysqlEnv,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  bs_region: process.env.bs_region,
  bs_secretAccessKey: process.env.bs_secretAccessKey,
  bs_accessKeyId: process.env.bs_accessKeyId,
  dwd_region: process.env.dwd_region,
  dwd_secretAccessKey: process.env.dwd_secretAccessKey,
  dwd_accessKeyId: process.env.dwd_accessKeyId
};
