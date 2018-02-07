var express = require('express');
var tweetModel = require('../models/tweet');

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

module.exports = router;