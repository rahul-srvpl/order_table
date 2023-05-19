const mongoose = require('mongoose');
const logger = require('../../../config/logger');
// const crmModel = require('../../models/bs_crm');
const crmnavModel = require('../../models/bs_crm_nav');

exports.addCrmNavbar = async (req, res, next) => {
    const crmnavData = new crmnavModel(req.body);

    crmnavData.save(function (err) {
        if (err) {
            logger.info("unable to insert document", err)
            res.status(500);
            res.send({ "message": "unable to insert document" });
            return
        }
        res.send({ "success": true });
    });
};
