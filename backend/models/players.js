const mongoose = require('mongoose');

// Define the Player Schema
const PlayerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      enum: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
      required: true,
    },
    jerseyNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 99,
    },
    age: {
      type: Number,
      required: true,
      min: 16,
    },
    nationality: {
      type: String,
      required: true,
    },
    height: {
      type: Number, // in cm
      required: true,
    },
    weight: {
      type: Number, // in kg
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    stats: {
      appearances: { type: Number, default: 0 },
      goals: { type: Number, default: 0 },
      assists: { type: Number, default: 0 },
      cleanSheets: { type: Number, default: 0 },
    },
    contract: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      salary: { type: Number, required: true }, // annual salary in USD
    },
    isInjured: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
      default: "default-player.jpg",
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

// Export the Player Model
const Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;
