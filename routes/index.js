const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Profile = require("../models/profile").Profile;
// const Post = require("../models/post").Post;
const Activity = require("../models/activitiy").Activity;

//db info
const mongoose = require("mongoose");
const dbPassword = "0TeEaRuCdH5yqRpJ";
const dbURI = `mongodb+srv://MangoDBTester:${dbPassword}@dogbookdb.w3p76.mongodb.net/DogBookDB?retryWrites=true&w=majority`;

//landing page
router.get('/', (req, res) => {
    res.render('index');
})

//rendering activities page
router.get('/activities', (req, res) => {
    //call renderacrivities renderAllActivities()
    renderAllActivities(res)
    // res.render('activities');
})

//trainers page
router.get("/trainers", (req, res) => {
    res.render("trainer");
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
    
        const result = await Profile.find({activities: doc._id});
        info.authorName = result[0].name
        activities.push(info)
    } 

    return activities;  
}


const renderAllActivities = async function (res) {
    let activities = await getActivityFromDB()
    console.log(activities);

    res.render("activities", {
        activities: activities
    });
}


// const getProfileAndPopulate = function (id) {
//     return Profile.findById(id).populate("posts")
// }

// const renderDashboardWithPosts = async function (req, res) {
//     posts = await getProfileAndPopulate(req.user.profile._id)

//     res.render('dashboard', {
//         user: req.user,
//         posts: posts
//     });
// }



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
module.exports = router;