const mongoose = require('mongoose');

const RatingSchema  = new mongoose.Schema({
  rating: {
    type: number,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;