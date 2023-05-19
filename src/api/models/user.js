const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  }
}, {
  timestamps: true,
});

userSchema.statics = {
  async get(id) {
    try {
      let user = await this.findOne({ "userId": id }).exec();
      if (user) {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = mongoose.model('users', userSchema);
