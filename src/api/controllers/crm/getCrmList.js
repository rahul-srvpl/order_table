const mongoose = require('mongoose');
const logger = require('../../../config/logger');
const crmModel = require('../../models/bs_crm');


exports.getCrmList = async (req, res, next) => {

  const { from, size } = req.body;

  crmModel.countDocuments(function (err, count) {

    if (err) {
      res.status(500);
      res.send({ "message": "unable to get total count" });
      return
    }

    const findQuery = crmModel.find({});
    findQuery.select('name email');
    findQuery.limit(size);
    findQuery.skip(from);

    findQuery.exec(function (err, crmList) {
      if (err) {
        res.status(500);
        res.send({ "message": "unable to find document" });
        return
      }
      res.send({ from: from, size: size, count: count, crmList })
    });

  })


};
