const mongoose = require('mongoose');
const crmSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: String,
  }
});


module.exports = mongoose.model('crm', crmSchema);
