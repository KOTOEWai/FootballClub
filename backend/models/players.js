const mongoose = require('mongoose');

// Define the schema for the Player
const playerSchema = new mongoose.Schema({
    name: { type: String, required: true , unique:true},
    position: { type: String, required: true },
    jerseyNumber: { type: Number, required: true , unique:true },
    age: { type: Number, required: true },
    nationality: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number },
    team: { type: String, required: true },
    isInjured: { type: Boolean, default: false },
    profileImage: [String],
    stats: {
        appearances: { type: Number, default: 0 },
        goals: { type: Number, default: 0 },
        assists: { type: Number, default: 0 },
        cleanSheets: { type: Number, default: 0 }
    },
    contract: {
        startDate: { type: Date },
        endDate: { type: Date },
        salary: { type: Number, default: 0 }
    }
});

// Create and export the Player model
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
