const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
// const Profile = require("../models/profile").Profile;
// const Post = require("../models/post").Post;
// const Activity = require("../models/activitiy").Activity;

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
    res.render('activities');
})

//trainers page
router.get("/trainers", (req, res) => {
    res.render("trainer");
})

const getActivityFromDB = () => {
    //connecting to db/activities to retrieve the info
    mongoose.connect(dbURI, function(err, db) {
        const cursor = db.collection("activities").find({});

        function iterateFunc(doc) {
            console.log(JSON.stringify(doc, null, 4));
            
            db.collection("profiles").find({activities: doc._id}).toArray(function(err, results) {
                console.log(results);
            });
        }
        
        function errorFunc(error) {
            console.log(error);
        }
        cursor.forEach(iterateFunc, errorFunc);
    })
}

const renderAllActivities = async function (req, res) {
    activity = await getActivityFromDB()

    res.render("activities", {
        activity: activity
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
        //renderAllActivities()
        res.redirect("activities")
    }
})
module.exports = router;