let mongoose = require("mongoose");
let eventSchema = mongoose.Schema({
    name: String,
    description: String,
    geocode: String,
    location: String,
    dtstart: String,
    dtend: String,
    summary: String,
    recurrence: String,
    tzid: String,
    priority: String,
    resources: String,
    username: String
});

module.exports = mongoose.model("Event", eventSchema, "events");