const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Profile = require("../models/profile").Profile;
const Post = require("../models/post").Post

//landing page
router.get('/', (req, res) => {
    res.render('index');
})
//rendering activities page to fix it
router.get('/activities', (req, res) => {
    res.render('activities');
})
/*
//register page
router.get('/register', (req, res) => {
    res.render('register');
})
*/

const getProfileAndPopulate = function (id) {
    return Profile.findById(id).populate("posts")
}


const renderDashboardWithPosts = async function (req, res) {
    posts = await getProfileAndPopulate(req.user.profile._id)

    res.render('dashboard', {
        user: req.user,
        posts: posts
    });
}



router.get('/dashboard', ensureAuthenticated, (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    } else {
        // renderDashboardWithPosts(req, res)
        // render activities page
        res.render("activites")
    }
})
module.exports = router;