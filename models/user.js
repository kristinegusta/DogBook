const mongoose = require('mongoose');
const ProfileSchema = require("./user profile").ProfileSchema
// const TrainerProfileSchema = require("./trainer profile").TrainerProfileSchema

const UserSchema  = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  profile: ProfileSchema,
  // trainerProfile: TrainerProfileSchema,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
