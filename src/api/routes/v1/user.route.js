const express = require('express');
const controller = require('../../controllers/user');


const router = express.Router();

router.get("/info/:id", controller.userInfo);
router.get("/info/mysql/:id", controller.userInfoMysql);

module.exports = router;
