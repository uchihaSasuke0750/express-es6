const express = require('express')

var app = express()
require('dotenv').config({ path: __dirname + '/.env' })

// const db = require( '../db/models')

// const bcrypt = require('bcrypt')
// const saltRounds = 10
// const jwt = require('jsonwebtoken')
// const moment = require('moment')
// const uuidv4 = require('uuid/v4')

// var generator = require('generate-password')

const router = express.Router()

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'pug')
app.set('views','./views')

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// const getUser = async obj => {
//   return await db.users.findOne({
//       where: obj,
//   });
// };

// const getToken = async obj => {
//   return await db.OauthAccessToken.findOne({
//       where: obj,
//   });
// };

// Use the FacebookStrategy within Passport.
var userProfile = '';

var access_token= '';

passport.use(new FacebookStrategy({
    clientID: "445543739681651",
    clientSecret:"5bfc310e6e4fa970c172d85072ddb91f" ,
    callbackURL: "https://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName' , 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      access_token=accessToken;
      //Check whether the User exists or not using profile.id
      if(profile){
        userProfile = profile
      }
      return done(null, profile);
    });
  }
));

router.get('/', async function(req, res){
//   let user = await db.users.findOne({
//     where: {
//        email: userProfile._json.email
//     },
// });
// if(user){
//   let alreadyExist = await getToken({ user_id: user.id });

//   if(alreadyExist) {
//       db.OauthAccessToken.destroy({
//           where: { id: alreadyExist.dataValues.id }
//       });
//   }

//   let uuid = uuidv4()

//   let data = await db.OauthAccessToken.create({
//       id: uuid,
//       user_id: user.id,
//       name: "Facebook",
//       scopes: '[*]',
//       revoked: 0,
//       expires_at: moment().add(300, 'days').unix(),
//   })

//   let payload = { id: uuid };

//   let jwtOptions = {};

//   jwtOptions.secretOrKey = process.env.SECRET_KEY;

//   access_token = jwt.sign(payload, jwtOptions.secretOrKey);

//   console.log("user found")
//   } else {
//     var password = generator.generate({
//         length: 10,
//         numbers: true
//       });

//     let user = await db.users.create({
//       name: userProfile._json.name ,
//       email: userProfile._json.email,
//       password: password,
//       role_id: 1
//     }).then(function (data) {
//         // if (data) {
//         // res.json(data) ;
//         // }
//     });


//   let data = await db.OauthAccessToken.create({
//     id: uuid,
//     user_id: user.id,
//     name: "Facebook",
//     scopes: '[*]',
//     revoked: 0,
//     expires_at: moment().add(300, 'days').unix()
//   })

//   let payload = { id: uuid };

//   let jwtOptions = {};

//   jwtOptions.secretOrKey = process.env.SECRET_KEY;

//   access_token = jwt.sign(payload, jwtOptions.secretOrKey);

// }
//   res.render('index', { token: access_token , expires_at: moment().add(300, 'days').unix() })
});

router.get('/account', ensureAuthenticated, function(req, res){
//   res.render('account', { user: req.user });
});

router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/login' }),
  function(req, res) {
    // res.redirect('/');
    
  });

router.get('/logout', function(req, res){
  req.logout();
  // res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  // res.redirect('/login')
}

module.exports = router;