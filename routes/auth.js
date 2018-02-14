var express = require('express');
var bcrypt = require('bcrypt');
var userModel = require('../models/user');

var router = express.Router();

const saltRounds = 10;

/* Begin routes */
router.get('/login', function(req, res) {
    return res.render('login');
});

router.post('/login', function(req, res) {
  userModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) 
        return res.status(500).send(err);
    
    if (user != null) {
        bcrypt.compare(req.body.password.trim(), user.password,
            function(err, success) {
                if (err) return res.status(500).send(err);
                if (success) {
                    req.session.user = user;
                    return res.redirect('/');
                }
                return res.render('login', { login_error: 'Incorrect email or password.' });
            });
    }  
    else 
        res.render('login', { login_error: 'Incorrect email or password.' });
  });
});

router.post('/user', function(req, res) {
    bcrypt.hash(req.body.password.trim(), saltRounds,
        function(err, hash) {
            var newUser = new userModel({
                display_name: req.body.display_name,
                handle: req.body.handle.trim(),
                email: req.body.email.trim(),
                password: hash
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
});


module.exports = router;
