const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Profile = require("../models/profile").Profile;
// const Post = require("../models/post").Post;
const Activity = require("../models/activitiy").Activity;
const Trainer = require("../models/trainerK").Trainer;

//db info
const mongoose = require("mongoose");
const dbPassword = "0TeEaRuCdH5yqRpJ";
const dbURI = `mongodb+srv://MangoDBTester:${dbPassword}@dogbookdb.w3p76.mongodb.net/DogBookDB?retryWrites=true&w=majority`;

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
/* EVERYTHING ACTIVITIES RELATED */
//rendering activities page
router.get('/activities', (req, res) => {
    renderAllActivities(res)
})

const getActivityFromDB = async () => {
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
        info.time = doc.date

        const result = await Profile.find({ activities: doc._id });
        info.authorName = result[0].name
        activities.push(info)
    }
    return activities;
}


const renderAllActivities = async function (res) {
    let activities = await getActivityFromDB()


    res.render("activities", {
        activities: activities
    });
}

/* EVERYTHING TRAINER RELATED */
//trainers page
router.get("/trainers", (req, res) => {
    renderAllTrainers(res)
})

const getTrainerFromDB = async () => {
    let trainers = [];
    const cursor = await Trainer.find({});

    for (let i = 0; i < cursor.length; i++) {
        let doc = cursor[i];
        let info = {}

        info.trainerId = doc._id
        info.name = doc.name
        info.street = doc.street
        info.city = doc.city
        info.country = doc.country
        info.phone = doc.phone
        info.email = doc.email
        info.website = doc.website

        trainers.push(info)
    }
    return trainers;
}
const renderAllTrainers = async function (res) {
    let trainers = await getTrainerFromDB()
    /*console.log(trainers);*/

    res.render("trainer", {
        trainers: trainers
    });
}





module.exports = router;