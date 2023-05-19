const express = require('express');

const { addCrmNavbar } = require('../../controllers/crm/add-crm-navbar');
const { addCrmInfo } = require('../../controllers/crm/add-crm-info');
const { getCrmList } = require('../../controllers/crm/getCrmList');
const { removeCrmById } = require('../../controllers/crm/removeCrmById');
const { editCrmInfo } = require('../../controllers/crm/editCrmInfo');


const router = express.Router();

router.post("/add-crm-navbar", addCrmNavbar);
router.post("/add-crm-info", addCrmInfo);
router.post("/get-crm-list", getCrmList);
router.post("/remove-crm/:id", removeCrmById);
router.post("/edit-crm/:id", editCrmInfo);

module.exports = router;
