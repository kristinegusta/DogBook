const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Profile = require("../models/profile").Profile;
// const Post = require("../models/post").Post;
const Activity = require("../models/activitiy").Activity;
const Trainer = require("../models/trainerK").Trainer;
const Review = require("../models/review").Review;
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;





module.exports = router;