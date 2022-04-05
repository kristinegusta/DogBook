const mongoose = require("mongoose");
const TagSchema = require("./tag").TagSchema;

const TrainerProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  // image: {
  //   data: Buffer,
  //   contentType: String,
  //   required: true
  // },
  email: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  // ratings: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Rating"
  //   }
  // ],

  phone: {
    type: String,
    required: true,
  },

  website: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  tag: TagSchema,
});

const TrainerProfile = mongoose.model("TrainerProfile", TrainerProfileSchema);

module.exports = { TrainerProfile, TrainerProfileSchema };
