const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const expressEjsLayout = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const fileupload = require("express-fileupload");
const dotenv = require('dotenv').config();

//passport config:
require("./config/passport")(passport);
//fileupload co
router.use(fileupload({ useTempFiles: true }))

//mongoose
// Dylan cluster
const dbURI = process.env.DB_URI
// Antoine cluster
// const dbPassword = "ppp111ppp111";
// const dbURI = `mongodb+srv://antoine:${dbPassword}@cluster0.h3l4q.mongodb.net/dogbook_database?retryWrites=true&w=majority`;

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected,,"))
    .catch((err) => console.log(err));




//EJS
app.set("view engine", "ejs");
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
router.use(fileupload({ useTempFiles: true }))
//express session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});

app.use(fileupload({ useTempFiles: true }));
app.use("/static", express.static("public"));

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/profiles", require("./routes/profiles"));
app.use("/posts", require("./routes/posts"));
app.use("/about", require("./routes/about"))
// app.use("/trainer", require("./routes/trainer"));
// app.use("/activity", require("./routes/activity"));

app.listen(process.env.PORT || 3000);