const Event = require('../models/event.model.js');
 
// Save FormData - Event to MongoDB
exports.save = (req, res) => {
    console.log('Post an event: ' + JSON.stringify(req.body));

    let event = new Event({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        geocode: req.body.geocode,
        dtstart: req.body.dtstart,
        dtend: req.body.dtend,
        summary: req.body.summary,
        recurrence: req.body.recurrence,
        tzid: req.body.tzid,
        priority: req.body.priority,
        rsvp: req.body.rsvp,
        sentby: req.body.sentby,
        mailto: req.body.mailto,
        resources: req.body.resources,
        username: req.body.username
    });
    // Saving it to the database.
    event.save(function (err) {
        if (err) {
            console.log('Error on save!');
            res.status(500).json({ message: err });
        } else {
            console.log('Event Saved!');
            res.status(200).json({ message: 'Event Saved' });
        }
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
            res.status(200);
            res.send(events);
        }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};