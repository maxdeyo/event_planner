const Event = require('../models/event.model.js');
 
// Save FormData - Event to MongoDB
exports.save = (req, res) => {
  console.log('Post a User: ' + JSON.stringify(req.body));
  
    // Create an Event
    let event = new Event({
        name: req.body.name || "Untitled Note",
        description: req.body.description || "Untitled Note",
        location: req.body.location || "Untitled Note",
        dtstart: req.body.dtstart || "Untitled Note",
        dtend: req.body.dtend || "Untitled Note",
        summary: req.body.summary|| "Untitled Note",
        recurrence: req.body.recurrence|| null,
        tzid: req.body.tzid|| null,
        resources: req.body.resources|| null,
        priority: req.body.priority|| null,
        username: req.body.username || null
    });
 
    // Save an Event in the MongoDB
    event.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
// Fetch all Events
exports.findAll = (req, res) =>  {
  console.log("Fetch all Events");
  
    Event.find()
    .then(events => {
        res.send(events);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findAllByUser = (req, res) =>  {
    console.log("Fetch all Events By User" + req.params.username);

    Event.find({username: req.params.username})
        .then(events => {
            res.send(events);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};