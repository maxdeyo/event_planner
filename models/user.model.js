let mongoose = require("mongoose");
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);