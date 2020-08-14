let mongoose = require("mongoose");
let eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    geocode: String,
    location: String,
    dtstart: {
        type: String,
        required: true
    },
    dtend: {
        type: String,
        required: true
    },
    summary: String,
    recurrence: String,
    tzid: String,
    priority: String,
    rsvp: String,
    sentby: String,
    mailto: String,
    resources: String,
    username: String
});

module.exports = mongoose.model("Event", eventSchema, "events");