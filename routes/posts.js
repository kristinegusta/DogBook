const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
// const User = require("../models/user")
// const Post = require("../models/post").Post
const Review = require("../models/review").Review;
const Activity = require("../models/activitiy").Activity
const cloudinary = require("cloudinary");
const { ensureAuthenticated } = require('../config/auth');
const fileupload = require("express-fileupload");
const dotenv = require('dotenv').config();

//CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRETKEY
});

//post review
router.post("/newReview", ensureAuthenticated, async (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    } else {
        // console.log(req.headers.referer);
        let activityId = req.headers.referer.split("?")

        let allowReview = await checkExisingReviews(activityId[1], req)
        if (allowReview) {
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
        } else {
            //alert doesn't work maybe look into popup forms
            console.log("You already posted a review for this activity")
            res.redirect(`/ActivityReview?${activityId[1]}`)
        }
    }
})

let checkExisingReviews = async (id, req) => {
    let check = true;
    const cursor = await Activity.find({ _id: id });
    const reviews = await Review.find({ _id: cursor[0].reviews });
    for (const review of reviews) {
        const userProfile = await Profile.find({ reviews: review._id })
        if ((userProfile[0]._id).toString() == (req.user.profile._id).toString()) {
            check = false;
        }
    }
    return check
}

const getReviewFromDB = async (id) => {
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

//Post my activity handle
router.get('/postActivity', ensureAuthenticated, (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    } else {
        res.render('post', {
            user: req.user
        });
    }
})

router.post("/newActivity", ensureAuthenticated, async (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    }
    else {
        try {
            const fileStr = req.files.image || "https://picsum.photos/300/600";
            const uploadResponse = await cloudinary.uploader.upload(fileStr.tempFilePath, {});
            const newActivity = new Activity({
                name: req.body.name,
                description: req.body.description,
                location: req.body.location,
                url: uploadResponse.url
            })
            await newActivity.save()
            await Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { activities: newActivity._id } }, { useFindAndModify: false })
            res.redirect('/activities')
        } catch (err) {
            console.log(err);
            res.redirect("/posts/postActivity")
        }
    }
})

module.exports = router;