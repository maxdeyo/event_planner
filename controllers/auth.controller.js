const mongoose = require('mongoose');
const passport = require('passport');
let User = require("../models/user.model.js");

let userController = {};

//Restrict access to root page
userController.home = function(req, res){
    res.render('index', { user : req.user });
}

//Go to registration page
userController.register = function(req, res){
    res.render('register');
}

//Post registration
userController.doRegister = function(req, res) {
    User.register(new User({ username: req.body.username, name: req.body.name }),
        req.body.password, function(err, user){
        if(err){
            return console.log('error');
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
}

//Go to login page
userController.login = function(req, res) {
    res.render('login');
}

userController.doLogin = function(req, res) {
    passport.authenticate('local')(req, res, function(){
        res.redirect('/');
    })
}

userController.logout = function(req, res) {
    req.logout();
    res.redirect('/');
}

module.exports = userController;