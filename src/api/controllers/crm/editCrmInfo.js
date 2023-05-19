const mongoose = require('mongoose');
const logger = require('../../../config/logger');
const crmModel = require('../../models/bs_crm');

exports.editCrmInfo = async (req, res, next) => {
  const crmId = req.params.id;
  const query = { _id: crmId };
  const crmInfo = req.body
  delete crmInfo._id

  crmModel.findOneAndUpdate(query, crmInfo, function (err, data) {
    if (!data) {
      logger.info("No records found")
      res.status(400);
      res.send({ "message": "No records found" });
      return
    }
    if (err) {
      logger.info("unable to update document", err)
      res.status(500);
      res.send({ "message": "unable to update document" });
      return
    }
    res.send({ "success": true });
  });
};
