const mongoose = require('mongoose');

// Define the Match Schema
const MatchSchema = new mongoose.Schema(
  {
    matchDate: {
      type: Date,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
      trim: true,
    },
    homeTeam: {
      type: String,
      required: true,
    },
    awayTeam: {
      type: String,
      required: true,
    },
    teamlogo: {
      type: [String], // Specifies an array of strings
     
    },    
    score: {
      homeTeam: { type: Number, default: 0 },
      awayTeam: { type: Number, default: 0 },
    },
    referees:[{ type: String }],
    location: {
      type: String,
      required: true,
    },
    matchType: {
        enum: ["FIFA Club World Cup", "UEFA", "Spanish Clup", "European Cups", "European Super Cup", "LaLiga", "Spanish Super Cup"],
        default: ["LaLiga"]
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
  
);

// Export the Match Model
const Match = mongoose.model("Match", MatchSchema);
module.exports = Match;
