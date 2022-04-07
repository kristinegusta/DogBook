const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;

// OUR CODE

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

/*
router.get("/show/:id", (req, res) => {
  renderProfileWithPosts(req.params.id, req, res);
});
*/
module.exports = router;
