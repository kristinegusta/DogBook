const mongoose = require('mongoose');

const TagSchema  = new mongoose.Schema({
  tag: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = {Tag, TagSchema};