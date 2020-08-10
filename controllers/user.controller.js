const User = require('../models/user.model.js');

// Save FormData - User to MongoDB
exports.save = (req, res) => {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                //return res.redirect('/profile');
            }
        });
    }
};

// Fetch all Users
exports.findAll = (req, res) =>  {
    console.log("Fetch all Users");

    Event.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};