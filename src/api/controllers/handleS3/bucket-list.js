const { s3 } = require('../../../config/s3');
const logger = require('../../../config/logger');

exports.bucketLists = async (req, res, next) => {
  const { account } = req.body;
  let bucketList = [];

  if (s3[account]) {
    s3[account].listBuckets(function (err, data) {
      if (err) {
        logger.info('Bucket list error:', err);
        res.status(err.statusCode);
        res.send({ "message": "unable to connect to s3" });
      } else {
        bucketList = data.Buckets.map(n => {
          return { name: n.Name, createdOn: n.CreationDate }
        });
        res.json({ "bucketList": bucketList });
      }
    });
  } else {
    res.status(400);
    res.send({ "message": "No associated account found" });
  }
};
