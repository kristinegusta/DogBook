const mongoose = require('mongoose');

const ReviewSchema  = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = {Review, ReviewSchema};