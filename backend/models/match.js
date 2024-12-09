const mongoose = require('mongoose');

// Define the Match Schema
const MatchSchema = new mongoose.Schema(
  {
    matchDate: {
      type: Date,
      required: true,
    },
    matchTime: {
      type: String,
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
    teamlogo:[String]
    ,    
    homeTeamscore: {
    type: Number, 
    default: 0 },

    awayTeamscore: {
    type: Number, 
    default: 0 },

    referees:
    {
       type: String
    },
    location: {
      type: String,
      required: true,
    },
    matchType: {
         type: String
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
