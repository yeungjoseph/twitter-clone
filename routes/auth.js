var express = require('express');
var userModel = require('../models/user');

var router = express.Router();

/* Begin routes */
router.get('/login', function(req, res) {
    return res.render('login');
});

router.post('/login', function(req, res) {
  userModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) 
        return res.status(500).send(err);
    if (user == null || req.body.password != user.password)
        res.render('login', { login_error: 'Incorrect email or password.' });
    else {
        req.session.user = user;
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
        req.session.user = user;
        res.redirect('/');
    });
});


module.exports = router;
