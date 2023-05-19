const logger = require('./../config/logger');
const { bs_region, bs_secretAccessKey, bs_accessKeyId, dwd_region, dwd_secretAccessKey, dwd_accessKeyId } = require('./vars');
const AwsList = {
  bs: require('aws-sdk'),
  dwd: require('aws-sdk')
};
const s3Instance = {
  bs: null,
  dwd: null
};

exports.initS3 = () => {

  AwsList.bs.config.update({
    region: bs_region,
    secretAccessKey: bs_secretAccessKey,
    accessKeyId: bs_accessKeyId
  });

  s3Instance.bs = new AwsList.bs.S3({ apiVersion: '2006-03-01' });

  AwsList.dwd.config.update({
    region: dwd_region,
    secretAccessKey: dwd_secretAccessKey,
    accessKeyId: dwd_accessKeyId
  });

  s3Instance.dwd = new AwsList.bs.S3({ apiVersion: '2006-03-01' });

  logger.info('S3 initiated...');
  return s3Instance
};

exports.s3 = s3Instance

