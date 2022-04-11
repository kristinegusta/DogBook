const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Profile = require("../models/profile").Profile;
// const Post = require("../models/post").Post;
const Activity = require("../models/activitiy").Activity;
const Trainer = require("../models/trainerK").Trainer;
const Review = require("../models/review").Review;
const TrainerProfile = require("../models/trainerProfile").TrainerProfile;


// Trainer about ( KAATS STYLE)

router.get("/show/:id", async (req, res) => {
    const trainerQuery = await TrainerProfile.findById(req.params.id)


    res.render('trainer-about', {
        trainer: trainerQuery,
        user: req.user
    })
})

router.get("/reviews/:id", async (req, res) => {
    const trainerQuery = await TrainerProfile.findById(req.params.id)
    const trainerReviews = await getTrainerReviewsFromDB(req.params.id)

    res.render('trainerReviews', {
        trainer: trainerQuery,
        user: req.user,
        reviews: trainerReviews
    })
})

async function getTrainerReviewsFromDB(id) {
    let reviews = [];
    const cursor = await TrainerProfile.find({ _id: id });
    const review = await Review.find({ _id: cursor[0].reviews });

    console.log(review);
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

router.post("/newTrainerReview", ensureAuthenticated, async (req, res) => {
    if (!req.user.profile) {
        res.render('dashboard', {
            user: req.user
        });
    } else {

        let trainerId = req.headers.referer.split("reviews/")


        try {
            const newReview = new Review({
                rating: req.body.rating,
                description: req.body.review,
            })
            await newReview.save()
            await Profile.findOneAndUpdate({ _id: req.user.profile._id }, { $push: { reviews: newReview._id } }, { useFindAndModify: false })
            await TrainerProfile.findOneAndUpdate({ _id: trainerId[1] }, { $push: { reviews: newReview._id } }, { useFindAndModify: false })
            res.redirect(`/about/reviews/${trainerId[1]}`)
        } catch (err) {
            console.log(err);
            res.redirect(`/about/reviews/${trainerId[1]}`)
        }


    }
})

let checkExisingReviews = async (id, req) => {
    let check = true;
    const cursor = await Trainer.find({ _id: id });
    const reviews = await Review.find({ _id: cursor[0].reviews });
    for (const review of reviews) {
        const userProfile = await Profile.find({ reviews: review._id })
        if ((userProfile[0]._id).toString() == (req.user.profile._id).toString()) {
            check = false;
        }
    }
    return check
}

module.exports = router;
