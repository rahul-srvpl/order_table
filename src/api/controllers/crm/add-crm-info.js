const mongoose = require('mongoose');
const logger = require('../../../config/logger');
const crmModel = require('../../models/bs_crm');

exports.addCrmInfo = async (req, res, next) => {
  const crmData = new crmModel(req.body);

  crmData.save(function (err) {
    if (err) {
      logger.info("unable to insert document", err)
      res.status(500);
      res.send({ "message": "unable to insert document" });
      return
    }
    res.send({ "success": true });
  });
};
