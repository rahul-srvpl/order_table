const { s3 } = require('../../../config/s3');
const logger = require('../../../config/logger');

exports.signedUrls = async (req, res, next) => {
  const { account, requestUrls } = req.body;


  if (s3[account]) {
    const finalResp = [];
    requestUrls && requestUrls.forEach((item, index) => {
      const { bucketName, filePath, expiry } = item;

      const params = { Bucket: bucketName, Key: filePath };

      console.log("params:", params.Key);
      s3[account].headObject(params, function (err, metadata) {
        if (err && err.code === 'NotFound') {
          logger.info("file not found, filePath:" + filePath, err);
          finalResp.push({ ...item, success: false, message: "file not found in the bucket" })
        } else {
          params.Expires = expiry;
          s3[account].getSignedUrl('getObject', params, function (err, url) {
            if (err) {
              logger.info("Unable to get signed url, filePath:" + filePath, err);
              finalResp.push({ ...item, success: false })
            } else {
              finalResp.push({ ...item, signedUrl: url, success: true })
            }
            cb();
          });
        }
      });
    });


    function cb() {
      if (requestUrls.length === finalResp.length) {
        res.send(finalResp)
      }
    }


  } else {
    res.status(400);
    res.send({ "message": "No associated account found" });
  }
};
