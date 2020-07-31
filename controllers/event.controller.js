const Event = require('../models/event.model.js');
 
// Save FormData - User to MongoDB
exports.save = (req, res) => {
  console.log('Post a User: ' + JSON.stringify(req.body));
  
    // Create a Customer
    let event = new Event({
        name: req.body.name || "Untitled Note",
        description: req.body.description || "Untitled Note",
        location: req.body.location || null,
        dtstart: req.body.dtstart || "Untitled Note",
        dtend: req.body.dtend || "Untitled Note",
        summary: req.body.summary|| "Untitled Note",
        recurrence: req.body.recurrence|| null,
        tzid: req.body.tzid|| null,
        resources: req.body.resources|| null,
        priority: req.body.priority|| null
    });
 
    // Save a Event in the MongoDB
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