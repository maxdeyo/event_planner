let mongoose = require("mongoose");
let eventSchema = mongoose.Schema({
    name: String,
    description: String,
    location: String,
    dtstart: String,
    dtend: String,
    summary: String
});

module.exports = mongoose.model("Event", eventSchema, "events");