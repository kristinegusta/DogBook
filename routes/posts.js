const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
// const User = require("../models/user")
// const Post = require("../models/post").Post
const Review = require("../models/review").Review;
const Activity = require("../models/activitiy").Activity
const cloudinary = require("cloudinary");
const { ensureAuthenticated } = require('../config/auth');

//post review
router.post("/newReview", ensureAuthenticated, async (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    } else {
        // console.log(req.headers.referer);
        let activityId = req.headers.referer.split("?")

        try {
            const newReview = new Review({
                rating: req.body.rating,
                description: req.body.review,
            })
            await newReview.save()
            await Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { reviews: newReview._id } }, { useFindAndModify: false })
            await Activity.findOneAndUpdate({ _id: activityId[1] }, { $push: { reviews: newReview._id } }, { useFindAndModify: false })
            res.redirect(`/ActivityReview?${activityId[1]}`)
        } catch (err) {
            console.log(err);
            res.redirect(`/ActivityReview?${activityId[1]}`)
        }
    }
})

//Post my activity handle
router.get('/postActivity', ensureAuthenticated, (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    } else {
        res.render('post');
    }
})

router.post("/newActivity", async (req, res) => {
    console.log(req.body);

    try {
        const newActivity = new Activity({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
        })
        await newActivity.save()
        await Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { activities: newActivity._id } }, { useFindAndModify: false })
        res.redirect('/activities')
    } catch (err) {
        console.log(err);
        res.redirect("/posts/postActivity")
    }
})

// router.post("/new", async (req, res) => {
//     console.log(req.body)

//     try {
//         const fileStr = req.files.image;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});
//         console.log(uploadResponse);
//         const url = uploadResponse.url
//         const newPost = new Post({
//             title: req.body.title,
//             post_content: req.body.post_content,
//             url: url
//         })
//         await newPost.save()
//         await Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { posts: newPost._id } })
//         res.redirect('/dashboard')
//     } catch (err) {
//         console.log(err)
//         res.redirect("/dashboard")
//     }

// })
/*
Hangling uploads
router.post("/upload-image", async (req, res) => {
    try {

        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
*/




module.exports = router;