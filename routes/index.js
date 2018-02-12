var express = require('express');
var tweetModel = require('../models/tweet');
var userModel = require('../models/user');
var auth = require('../utils/auth');
var io = require('../io');

var router = express.Router();

router.use(auth.requireLogin);

/* GET home page. */
router.get('/', function(req, res, next) {
  tweetModel.find({}, function(err, tweets) {
    if (err) return res.status(500).send(err);
    res.render('main', { tweets: tweets });
  });
});

router.get('/logout', function (req, res) {
	req.session.reset();
	res.redirect('/login');
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
    // Broadcast to socket listeners
    io.instance().emit('newTweet', { data: page.toObject() });
    res.status(201).json(page);
  });
});

router.post('/user/follow/:handle', function(req, res, next) {
	userModel.findById(req.user._id, function(err, user) {
		if (err) return res.status(500).send(err);
		if (user) {
			// If the user is not already following the person, add them
			// to the following list
			var new_follow = req.params.handle.trim()
			if (!user.following.includes(new_follow))
			{
				user.following.push(new_follow);
				user.save(function(err, user){
					res.end();
				});
			}
		}
		else {
			next();
		}
	});
});

router.delete('/user/follow/:handle', function(req, res, next) {
	userModel.findById(req.user._id, function(err, user) {
		if (err) return res.status(500).send(err);
		if (user) {
			// If the user is following the person, delete them from
			// the following list
			var old_follow = req.params.handle.trim()
			if (user.following.includes(old_follow))
			{
				var index = user.following.indexOf(old_follow);
				user.following.splice(index, 1);
				user.save(function(err, user){
					res.end();
				});
			}
		}
		else {
			next();
		}
	});
});

router.get('/user/:handle', function(req, res, next) {
  userModel.findOne({ handle: req.params.handle.trim() }, 
  function(err, user) {
      if (err) return res.status(500).send(err);
      if (user) {
        tweetModel.find({ handle: req.params.handle.trim() },
         function(err, tweets) {
            if (err) return res.status(500).send(err);
            res.render('user', { tweets: tweets, profile: user });
          });
      }
      else {
          next();
      }
  });
});

module.exports = router; 