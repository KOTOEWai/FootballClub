const mongoose = require('mongoose');

const User = new mongoose.Schema({
       name: {type: String, required: true},
       email: {type: String, required: true, unique: true},
       role: {
              type: String,
              enum: ["admin", "coach", "player", "staff", "fan"],
              default: "fan",
            },
       password: {type: String, required: true},
})

module.exports = mongoose.model('User', User);