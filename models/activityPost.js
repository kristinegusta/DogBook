const mongoose = require("mongoose");

const ActivityPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const ActivityPost = mongoose.model("ActivityPost", ActivityPostSchema);

module.exports = ActivityPost;
