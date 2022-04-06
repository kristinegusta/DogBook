const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Profile = require("../models/profile").Profile;
// const Post = require("../models/post").Post;
const Activity = require("../models/activitiy").Activity;
const Trainer = require("../models/trainerK").Trainer;
const Review = require("../models/review").Review;
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;

//test page
router.get('/test', (req, res) => {
    res.render("oldActivity_post")
})


// Activity Review page
router.get("/ActivityReview", (req, res) => {
    let activityId = req.url.split("?")
    // res.render("activityReview")
    renderActivityReview(res, activityId[1])
})
const renderActivityReview = async function (res, id) {
    let activity = await getActivityFromDB(id)
    let reviews = await getReviewFromDB(id)

    res.render("activityReview", {
        activity: activity,
        reviews: reviews
    });
}

// Activity About Page
router.get("/ActivityAbout", (req, res) => {
    let activityId = req.url.split("?")
    renderActivityAbout(res, activityId[1])
})
const renderActivityAbout = async function (res, id) {
    let activity = await getActivityFromDB(id)

    res.render("activities-about", {
        activity: activity
    });
}

const getReviewFromDB = async (id) => {
    let reviews = [];
    const cursor = await Activity.find({_id: id});
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
        }
        
        
        info.reviewId = doc._id
        info.description = doc.description
        info.rating = doc.rating
        let date = doc.date.toString().split("GMT")
        info.time = date[0].trim()
        
        const result = await Profile.find({ reviews: doc._id });
        info.authorName = result[0].name
        reviews.push(info)
    }
    return reviews;
}

const getActivityFromDB = async (id) => {
    let activities = [];
    //an idea to be ttested
    // if (id) {
    //     console.log("you clicked on a card");
    // } else {
    //     console.log("you just clicked on activities");
    // }
    const cursor = await Activity.find({_id: id});

    for (let i = 0; i < cursor.length; i++) {
        let doc = cursor[i];

        let info = {
            activityId: "",
            activityName: "",
            description: "",
            location: "",
            time: "",
            authorName: "",
        }

        info.activityId = doc._id
        info.activityName = doc.name
        info.description = doc.description
        info.location = doc.location

        let date = doc.date.toString().split("GMT")
        info.time = date[0].trim()

        const result = await Profile.find({ activities: doc._id });
        info.authorName = result[0].name
        activities.push(info)
    }
    return activities;
}

//landing page
router.get('/', (req, res) => {
    res.render('index');
})
// dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    } else {
        // renderDashboardWithPosts(req, res)
        // renderAllActivities()
        res.redirect("activities")
    }
})
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
router.get('/activities', (req, res) => {
    renderAllActivities(res)
})

const getActivitiesFromDB = async () => {
    let activities = [];
    const cursor = await Activity.find({});

    for (let i = 0; i < cursor.length; i++) {
        let doc = cursor[i];

        let info = {
            activityId: "",
            activityName: "",
            description: "",
            location: "",
            time: "",
            authorName: "",
        }

        info.activityId = doc._id
        info.activityName = doc.name
        info.description = doc.description
        info.location = doc.location

        let date = doc.date.toString().split("GMT")
        info.time = date[0].trim()

        const result = await Profile.find({ activities: doc._id });
        info.authorName = result[0].name
        activities.push(info)
    }
    return activities;
}


const renderAllActivities = async function (res) {
    let activities = await getActivitiesFromDB()


    res.render("activities", {
        activities: activities
    });
}

/* EVERYTHING TRAINER RELATED */
//trainers page
router.get("/trainers", (req, res) => {
    renderAllTrainers(res);
  });
  
  const notScrappedGetTrainersFromDB = async () => {
    let trainers = [];
    const cursor = await TrainerProfile.find({});
  
    for (let i = 0; i < cursor.length; i++) {
      let doc = cursor[i];
  
      let info = {
        activityId: "",
        trainerName: "",
        email: "",
        location: "",
        phone: "",
        website: "",
        bio: "",
        time: "",
      };
  
      info.activityId = doc._id;
      info.trainerName = doc.name;
      info.email = doc.email;
      info.location = doc.location;
      info.phone = doc.phone;
      info.website = doc.website;
      info.bio = doc.bio;
      info.time = doc.date;
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
  const renderAllTrainers = async function (res) {
    let scrappedTrainers = await getTrainerFromDB();
    let trainers = await notScrappedGetTrainersFromDB();
    // console.log(trainers);
    // console.log(scrappedTrainers);
  
    res.render("trainer", {
      trainers: trainers,
      scrappedTrainers: scrappedTrainers,
    });
  };
  
  module.exports = router;
  