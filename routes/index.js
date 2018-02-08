var express = require('express');
var tweetModel = require('../models/tweet');
var userModel = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  tweetModel.find({}, function(err, tweets) {
    if (err) return res.status(500).send(err);
    res.render('main', { tweets: tweets });
  });
});

router.post('/tweet', function(req, res) {
  var newTweet = new tweetModel({
    author: req.body.author,
    handle: req.body.handle,
    content: req.body.content,
  });
  newTweet.save(function(err, page) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.end();
  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
  userModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) 
        return res.status(500).send(err);
    if (user == null || req.body.password != user.password)
        res.render('login', { login_error: 'Incorrect email or password.' });
    else {
        res.redirect('/');
    }
  });
});

router.post('/user', function(req, res) {
    var newUser = new userModel({
        display_name: req.body.display_name,
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save(function(err, user) {
        if (err) {
            console.log(err);
            return res.render('login', { reg_error: 'Username or email already taken!' });
        }
        res.redirect('/');
    });
});

module.exports = router; 