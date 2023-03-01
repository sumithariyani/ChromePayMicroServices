const express = require('express');
const router = express.Router();
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const session = require('express-session');
// After you declare "app"


router.use(session({
    secret: 'melody hensley is my spirit animal', resave: true,
    saveUninitialized: true
}));
//require('dotenv').config();

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


// Configure the Facebook strategy for use by Passport.
passport.use(new Strategy({
    clientID: '1467410000407007',
    clientSecret: '6bab3beec74f17e8c86f4200c70432d4',
    callbackURL: 'https://localhost:3300/api/v1/user/return',
    //profile: ['id', 'displayName'],

},
    function (accessToken, refreshToken, profile, done) {
        //Check the DB to find a User with the profile.id
        // User.findOne({ facebook_id: profile.id }, function (err, user) {
        //     if (err) {
        //         console.log(err);  // handle errors!
        //     }

        //     if (user) {
        //         done(null, user); //Login if User already exists
        //     } else { //else create a new User
        //         user = new User({
        //             facebook_id: profile.id, //pass in the id and displayName params from Facebook
        //             name: profile.displayName
        //         });
        //         user.save(function (err) { //Save User if there are no errors else redirect to login.
        //             if (err) {
        //                 console.log(err);  // handle errors!
        //             } else {
        //                 console.log("saving user ...");
        //                 done(null, user);
        //             }
        //         });
        //     }
        // });
        console.log(profile)
        return done(null, profile);
    }
));

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());

// Define routes.
router.get('/home',
    (req, res) => {
        res.json({ user: user });
    });

router.get('/login', (req, res) => { res.json({ msg: "login failed" }); });

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/api/v1/user/home');
    });
//view rawpasspostJS - FacebookStrategy.js hosted with ❤ by GitHub


module.exports = router