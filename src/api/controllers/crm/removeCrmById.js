const logger = require('../../../config/logger');
const crmModel = require('../../models/bs_crm');


exports.removeCrmById = async (req, res, next) => {

  const crmId = req.params.id;

  crmModel.findByIdAndRemove({ _id: crmId }, function (err) {
    if (err) {
      console.log("unable to remove by ID", err)
      res.status(500);
      res.send({ "message": "unable to remove document by ID" });
      return
    }
    res.send({ "success": true });
  })
};
