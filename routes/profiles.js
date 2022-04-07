const express = require("express");
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user");
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;
const cloudinary = require("cloudinary");
const fileupload = require("express-fileupload");
const dotenv = require('dotenv').config();

//CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_SECRETKEY
});

// OUR CODE

router.post("/new", async (req, res) => {
  //img upload handle
  const fileStr = req.files.image || "https://picsum.photos/300/600";
  const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});

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
