
const express = require('express');
const { bucketLists} = require('../../controllers/handleS3/bucket-list');
const { fileUpload} = require('../../controllers/handleS3/file-upload');
const { signedUrls} = require('../../controllers/handleS3/signed-urls');
let multer  = require('multer');
let upload  = multer({ storage: multer.memoryStorage() });



const router = express.Router();

router.post("/bucket-lists", bucketLists);
router.post("/signed-urls", signedUrls);
router.post("/upload", upload.any("file"), fileUpload);

module.exports = router;
