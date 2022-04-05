const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;

// OUR CODE

// user profile
router.post("/new", async (req, res) => {
  const newProfile = new Profile(req.body);
  // newProfile.save();
  try {
    await newProfile.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { profile: newProfile },
      { useFindAndModify: false }
    );
    res.redirect("/activities");
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard");
  }
});

// trainer profile
router.post("/newTrainer", async (req, res) => {
  const newTrainer = new TrainerProfile(req.body);
  try {
    await newTrainer.save();
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { profile: newTrainer },
      { useFindAndModify: false }
    );
    res.redirect("/activities");
  } catch (err) {
    console.log(err);
    res.redirect("/trainerCreate");
  }
});

// router.post("/search", async(req, res) => {
//     console.log(req.body)
//     const profiles = await Profile.find({ "username": { $regex: req.body.user_input } })
//     res.send({ data: profiles })

// })

// const getUserProfileAndPosts = function(id) {
//     return Profile.findById(id).populate("posts")
// }

// const renderProfileWithPosts = async function(id, req, res) {

//     const posts = await getUserProfileAndPosts(id)
//     console.log(posts)
//     res.render('profile', {
//         user: req.user,
//         posts: posts
//     })
// }

router.get("/show/:id", (req, res) => {
  renderProfileWithPosts(req.params.id, req, res);
});

module.exports = router;
