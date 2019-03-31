const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', async function(next) {
  var user = this;
  try {
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    return next();
  } catch (error) {
    return next(error);
  }
});

// UserSchema.methods.comparePassword = async candidatePassword => {
//   return bcrypt.compare(candidatePassword, this.password);
// };

let User = new mongoose.model('User', UserSchema, 'users');

module.exports = User;
