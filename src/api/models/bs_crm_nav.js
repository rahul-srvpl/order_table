const mongoose = require('mongoose');
const crmnavSchema = new mongoose.Schema({
    icon: {
        type: String,
    },
    title: {
        type: String,
    },
    to: {
        type: String,
    }
});


module.exports = mongoose.model('crmnav', crmnavSchema);
