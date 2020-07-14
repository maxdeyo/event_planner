const Event = require('../models/event.model.js');
 
// Save FormData - User to MongoDB
exports.save = (req, res) => {
  console.log('Post a User: ' + JSON.stringify(req.body));
  
    // Create a Customer
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        dtstart: req.body.dtstart,
        dtend: req.body.dtend,
        summary: req.body.summary
    });
 
    // Save a Customer in the MongoDB
    event.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
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