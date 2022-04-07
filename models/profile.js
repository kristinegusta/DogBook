const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  bio: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },

  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Comment"
  //   }
  // ],

  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity"
    }
  ],

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],

  // posts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Post"
  //   }
  // ],
});
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = { Profile, ProfileSchema };
