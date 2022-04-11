const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Profile = require("../models/profile").Profile;
// const Post = require("../models/post").Post;
const Activity = require("../models/activitiy").Activity;
const Trainer = require("../models/trainerK").Trainer;
const Review = require("../models/review").Review;
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;

//test page
router.get("/test", (req, res) => {
  res.render("oldActivity_post");
});

// Activity Review page
router.get("/ActivityReview", (req, res) => {
  let activityId = req.url.split("?");
  // res.render("activityReview")
  renderActivityReview(res, activityId[1], req);
});
const renderActivityReview = async function (res, id, req) {
  let activity = await getActivityFromDB(id);
  let reviews = await getReviewFromDB(id);
  res.render("activityReview", {
    activity: activity,
    reviews: reviews,
    user: req.user
  });
};

// Activity About Page
router.get("/ActivityAbout", (req, res) => {
  let activityId = req.url.split("?");
  renderActivityAbout(res, activityId[1], req);
});
const renderActivityAbout = async function (res, id, req) {
  let activity = await getActivityFromDB(id);
  res.render("activities-about", {
    activity: activity,
    user: req.user,
  });
};
async function getReviewFromDB(id) {
  let reviews = [];
  const cursor = await Activity.find({ _id: id });
  const review = await Review.find({ _id: cursor[0].reviews });
  // console.log(review);
  for (let i = 0; i < review.length; i++) {
    let doc = review[i];

    let info = {
      reviewId: "",
      description: "",
      rating: "",
      time: "",
      authorName: "",
      authorImg: "",
    };

    info.reviewId = doc._id;
    info.description = doc.description;
    info.rating = doc.rating;
    let date = doc.date.toString().split("GMT");
    info.time = date[0].trim();

    const result = await Profile.find({ reviews: doc._id });
    info.authorName = result[0].name;
    info.authorImg = result[0].url;
    reviews.push(info);
  }
  return reviews;
};

const getActivityFromDB = async (id) => {
  let activities = [];

  const cursor = await Activity.find({ _id: id });
  console.log(cursor)
  for (let i = 0; i < cursor.length; i++) {
    let doc = cursor[i];

    let info = {};

    info.activityId = doc._id;
    info.activityName = doc.name;
    info.description = doc.description;
    info.location = doc.location;
    info.url = doc.url;

    let date = doc.date.toString().split("GMT");
    info.time = date[0].trim();

    const result = await Profile.find({ activities: doc._id });
    info.authorName = result[0].name;
    info.authorImg = result[0].url;
    activities.push(info);
  }
  return activities;
};

//landing page
router.get("/", (req, res) => {
  res.render("index");
});
// dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if (!req.user.profile) {
    res.render("dashboard", {
      user: req.user,
    });
  } else {
    // renderDashboardWithPosts(req, res)
    // renderAllActivities()
    res.redirect("activities");
  }
});
// trainer dashboard
router.get("/trainerCreate", ensureAuthenticated, (req, res) => {
  if (!req.user.profile) {
    res.render("trainerCreate", {
      user: req.user,
    });
  } else {
    res.redirect("activities");
  }
});

/* EVERYTHING ACTIVITIES RELATED */
//rendering activities page
router.get("/activities", (req, res) => {
  renderAllActivities(res, req);
});

const getActivitiesFromDB = async () => {
  let activities = [];
  const cursor = await Activity.find({});
  for (let i = 0; i < cursor.length; i++) {
    let doc = cursor[i];
    let reviews = [];

    const review = await Review.find({ _id: cursor[i].reviews });
    for (let i = 0; i < review.length; i++) {
      let doc = review[i];
      let rating = doc.rating;
      reviews.push(rating);
    }

    let info = {
      activityId: "",
      activityName: "",
      description: "",
      location: "",
      time: "",
      authorName: "",
      authorImg: "",
      rating: "",
      reviews: "",
    };

    if (reviews.length === 0) {
      info.rating = 0;
    } else {
      let total = 0;
      for (let rating of reviews) {
        total += rating;
      }
      info.rating = Math.round((total / reviews.length) * 10) / 10;
    }
    info.reviews = reviews.length;
    info.activityId = doc._id;
    info.activityName = doc.name;
    info.description = doc.description;
    info.location = doc.location;
    info.url = doc.url;

    let date = doc.date.toString().split("GMT");
    info.time = date[0].trim();


    const result = await Profile.find({ activities: doc._id });
    info.authorName = result[0].name;
    info.authorImg = result[0].url;

    activities.push(info);
  }
  return activities;
};

const renderAllActivities = async function (res, req) {
  let activities = await getActivitiesFromDB();

  res.render("activities", {
    activities: activities,
    user: req.user,
  });
};

/* EVERYTHING TRAINER RELATED */
//trainers page
router.get("/trainers", (req, res) => {
  renderAllTrainers(res, req);
});

const notScrappedGetTrainersFromDB = async () => {
  let trainers = [];
  const cursor = await TrainerProfile.find({});

  for (let i = 0; i < cursor.length; i++) {
    let doc = cursor[i];

    let info = {};

    info.trainerId = doc._id;
    info.trainerName = doc.name;
    info.email = doc.email;
    info.location = doc.location;
    info.phone = doc.phone;
    info.website = doc.website;
    info.bio = doc.bio;
    info.time = doc.date;
    info.url = doc.url;
    trainers.push(info);
  }

  return trainers;
};

const getTrainerFromDB = async () => {
  let scrappedTrainers = [];
  const cursor = await Trainer.find({});

  for (let i = 0; i < cursor.length; i++) {
    let doc = cursor[i];
    let info = {};

    info.trainerId = doc._id;
    info.name = doc.name;
    info.street = doc.street;
    info.city = doc.city;
    info.country = doc.country;
    info.phone = doc.phone;
    info.email = doc.email;
    info.website = doc.website;

    scrappedTrainers.push(info);
  }
  return scrappedTrainers;
};
const renderAllTrainers = async function (res, req) {
  let scrappedTrainers = await getTrainerFromDB();
  let trainers = await notScrappedGetTrainersFromDB();

  res.render("trainer", {
    trainers: trainers,
    scrappedTrainers: scrappedTrainers,
    user: req.user
  });
};

//profile page

router.get("/profile", ensureAuthenticated, async (req, res) => {
  // console.log(req.user.profile);
  if (!req.user.profile) {
    res.render('dashboard', {
      user: req.user
    });
  } else {
    let reviews = await getReviewsFromDB(req.user.profile._id);
    let activities = await getActivitysFromDB(req.user.profile._id);
    res.render("profile", {
      user: req.user,
      reviews: reviews,
      activities: activities,
    });
  }
})

async function getReviewsFromDB(id) {
  let reviews = [];
  const cursor = await Profile.find({ _id: id });
  const review = await Review.find({ _id: cursor[0].reviews });
  // console.log(review);
  for (let i = 0; i < review.length; i++) {
    let doc = review[i];

    let info = {
      reviewId: "",
      description: "",
      rating: "",
      time: "",
      authorName: "",
      authorImg: "",
      activityId: "",
    };

    info.reviewId = doc._id;
    info.description = doc.description;
    info.rating = doc.rating;
    let date = doc.date.toString().split("GMT");
    info.time = date[0].trim();

    info.authorName = cursor[0].name;
    info.authorImg = cursor[0].url;

    let actiId = await Activity.find({reviews: review[i]._id})
    info.activityId = actiId[0]._id
    console.log(info.activityId);
    reviews.push(info);
  }
  return reviews;
};
const getActivitysFromDB = async (id) => {
  let activities = [];
  const profile = await Profile.find({ _id: id });
  const cursor = await Activity.find({ _id: profile[0].activities });

  for (let i = 0; i < cursor.length; i++) {
    let doc = cursor[i];
    let reviews = [];

    const review = await Review.find({ _id: cursor[i].reviews });
    for (let i = 0; i < review.length; i++) {
      let doc = review[i];
      let rating = doc.rating;
      reviews.push(rating);
    }

    let info = {
      activityId: "",
      activityName: "",
      description: "",
      location: "",
      time: "",
      authorName: "",
      authorImg: "",
      rating: "",
      reviews: "",
    };

    if (reviews.length === 0) {
      info.rating = 0;
    } else {
      let total = 0;
      for (let rating of reviews) {
        total += rating;
      }
      info.rating = Math.round((total / reviews.length) * 10) / 10;
    }
    info.reviews = reviews.length;

    info.activityId = doc._id;
    info.activityName = doc.name;
    info.description = doc.description;
    info.location = doc.location;

    let date = doc.date.toString().split("GMT");
    info.time = date[0].trim();

    info.authorName = profile[0].name;
    info.authorImg = profile[0].url;
    activities.push(info);
  }
  return activities;
};
module.exports = router;