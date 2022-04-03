const express = require("express");
const ActivityPost = require("../models/activityPost");
const router = express.Router();
const activityPost = require("../models/activityPost");

router.get("/activity_post", (req, res) => {
  res.render("activity_post");
});

// router.post("/newActivity", async (req, res) => {
//   const newActivityPost = new activityPost(req.body);
//   try {
//     await newActivityPost.save();
//     await ActivityPost.findOneAndUpdate(
//     //   { _id: req.user._id },
//     //   { profile: newProfile },
//     //   { useFindAndModify: false }
//     // );
//     res.redirect("/activity_post");
//   } catch (err) {
//     console.log(err);
//     res.redirect("/activity_post");
//   }
// });

module.exports = router;
