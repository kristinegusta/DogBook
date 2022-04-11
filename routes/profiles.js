const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const dotenv = require('dotenv').config();
const { ensureAuthenticated } = require("../config/auth");

//CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_SECRETKEY
});

// OUR CODE

router.get("/edit", (req, res) => {
  res.render("edit", {
    user: req.user
  })
})
router.post("/edit", async (req, res) => {
  let fileStr;
  let uploadResponse;
  try {
    fileStr = req.files.image;
    uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});
  } catch (err) {
    fileStr = false;
  }
  if (fileStr) {
    await Profile.findOneAndUpdate({ _id: req.user.profile._id }, { url: uploadResponse.url }, { useFindAndModify: false })
  }
  await Profile.findOneAndUpdate({ _id: req.user.profile._id }, {bio: req.body.bio,}, { useFindAndModify: false })
  await Profile.findOneAndUpdate({ _id: req.user.profile._id }, {name: req.body.name}, { useFindAndModify: false })
  res.redirect("/profile");
})


router.post("/new", async (req, res) => {
  //img upload handle
  // console.log(req.files.image);
  let fileStr;
  let uploadResponse;
  try {
    fileStr = req.files.image;
    uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});
  } catch (err) {
    fileStr = "https://picsum.photos/300/600";
    uploadResponse = await cloudinary.uploader.upload(fileStr);
  }

  const newProfile = new Profile({
    name: req.body.name,
    bio: req.body.bio,
    url: uploadResponse.url
  });
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
  //img upload handle
  const fileStr = req.files.image || "https://picsum.photos/300/600";
  const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});

  const newTrainer = new TrainerProfile({
    name: req.body.name,
    email: req.body.email,
    bio: req.body.bio,
    location: req.body.location,
    phone: req.body.phone,
    website: req.body.website,
    url: uploadResponse.url
  });

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


module.exports = router;
