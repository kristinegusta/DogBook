const express = require('express');
const router = express.Router();
const Profile = require("../models/profile").Profile;
const User = require("../models/user")
const Post = require("../models/post").Post
const Activity = require("../models/activitiy").Activity
const cloudinary = require("cloudinary");
//mongoose
const mongoose = require("mongoose");
const { ensureAuthenticated } = require('../config/auth');
const dbPassword = "0TeEaRuCdH5yqRpJ";
const dbURI = `mongodb+srv://MangoDBTester:${dbPassword}@dogbookdb.w3p76.mongodb.net/DogBookDB?retryWrites=true&w=majority`;


// OUR CODE
//Post my activity handle
//login handle
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
        // var temporaryId = newActivity._id
        await Profile.findOneAndUpdate({_id: req.user.profile._id}, {$push: {activities: newActivity._id }}, {useFindAndModify: false})
        res.redirect('/activities')
    } catch (err) {
        // console.log(typeof temporaryId, temporaryId);
        // let test = temporaryId.stringify()
        // console.log(test, typeof test);
        // mongoose.connect(dbURI, function(err, db) {
        //     db.collection('activities', function(err, collection){
        //         console.log(err);
        //         collection.deleteOne({"_id": ObjectId(test)});
        //     })
        // })
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

router.post("/upload-image", async (req, res) => {
    try {

        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});





module.exports = router;