const { s3 } = require('../../../config/s3');
const logger = require('../../../config/logger');

exports.fileUpload = async (req, res, next) => {
  const { path, account, bucketName, permission } = req.body;
  console.log(req.files.length)
  if (s3[account]) {
    const uploadStatus = [];
    if (req.files.length <= 0) {
      res.status(400);
      res.send({ "message": "No files in the request body" });
    }
    req.files.forEach(item => {
      const { originalname, buffer } = item;
      const publicRead = permission === "public" && { ACL: "public-read" };
      const params = {
        ContentType: item.mimetype,
        Bucket: bucketName,
        Key: path + originalname,
        ...publicRead,
        Body: buffer
      };

      s3[account].upload(params, function (s3Err, data) {
        if (s3Err) {
          // logger.info("Unable to upload file", s3Err);
          console.log("Unable to upload file", s3Err);
          uploadStatus.push({
            filePath: path + originalname,
            message: "unable to upload to s3",
            success: false
          })
        } else {
          uploadStatus.push({ filePath: path + originalname, message: "file uploaded", success: true })
        }
        cb()
      });
    });

    function cb() {
      if (uploadStatus.length === req.files.length) {
        res.send(uploadStatus);
      }
    }


  } else {
    res.status(400);
    res.send({ "message": "No associated account found" });
  }
};
