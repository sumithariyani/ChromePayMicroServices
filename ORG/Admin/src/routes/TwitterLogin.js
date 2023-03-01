//const LoginWithTwitter = require('login-with-twitter');

const express = require('express');
const router = express.Router();


var
    passport = require('passport')
    , util = require('util')
    , TwitterStrategy = require('passport-twitter').Strategy
    , session = require('express-session')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
//config = require('./configuration/config')

require("../index")

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the TwitterStrategy within Passport.

passport.use(new TwitterStrategy({
    consumerKey: 'z3Dhvc06uHUurYOabuVU7CUs0',
    consumerSecret: 'wfMGyLoZtcFfoxnAjN1kpKy0jZJNK898FHlXdpjnKLeIMMLBZ3',
    callbackURL: 'https://example.com/twitter/callback'

    //profile: ['id', 'displayName'],

},
    function (accessToken, refreshToken, profile, done) {

        console.log(profile)
        return done(null, profile);
    }
));



router.use(cookieParser());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
    secret: 'keyboard cat', key: 'sid', resave: true,
    saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.static(__dirname + '/public'));

router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

router.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', { user: req.user });
});

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}


module.exports = router













