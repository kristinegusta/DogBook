const mongoose = require('mongoose');

const ActivitySchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  // a bunch of pics to come

//   ratings: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Rating"
//     }
//   ],

//   comments: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Comment"
//     }
//   ],

});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = {Activity, ActivitySchema};