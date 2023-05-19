const User = require('../models/user');
const { pool } = require('../../config/mysql')

exports.userInfoMysql = async (req, res, next) => {
  pool.query("SELECT * from sample_table", function (err, result) {
    if (err) {
      console.log(err)
      res.status(500);
      res.send({ "message": "No data found" });
    } else {
      res.json({ result });
    }
  })
};

exports.userInfo = async (req, res, next) => {
  const users = await User.get(req.params.id)

  console.log(users);

  try {
    res.json({ users });
  } catch (error) {
    next();
  }
};
