const Match = require('../models/match');

exports.createMatch = async (req, res) => {
  try {
    const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
    const { matchDate, stadium, homeTeam, awayTeam, teamlogo, score, referees, location, matchType } = req.body;

    // Validate required fields
    if (!matchDate || !stadium || !homeTeam || !awayTeam || !teamlogo || !referees || !location || !matchType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate team logos
    if (!teamlogo.every((url) => imageUrlRegex.test(url))) {
      return res.status(400).json({ message: "One or more team logos are invalid image URLs." });
    }

    // Create match
    const match = new Match({
      matchDate,
      stadium,
      homeTeam,
      awayTeam,
      teamlogo,
      score,
      referees,
      location,
      matchType,
    });

    const savedMatch = await match.save();
    res.status(201).json({ message: "Match created successfully!", match: savedMatch });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllMatches = async (req, res) => {
    try {
      const matches = await Match.find();
      res.status(200).json(matches);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  exports.getMatchById = async (req, res) => {
    try {
      const { id } = req.params;
      const match = await Match.findById(id);
  
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }
  
      res.status(200).json(match);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };


  exports.updateMatch = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      // Validate team logos if present
      const imageUrlRegex = /\.(jpeg|jpg|gif|png|webp|svg)$/i;
      if (updatedData.teamlogo && !updatedData.teamlogo.every((url) => imageUrlRegex.test(url))) {
        return res.status(400).json({ message: "Invalid image URL format for one or more team logos." });
      }
  
      // Update the match
      const updatedMatch = await Match.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedMatch) {
        return res.status(404).json({ message: "Match not found" });
      }
  
      res.status(200).json({ message: "Match updated successfully!", match: updatedMatch });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  
  exports.deleteMatch = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMatch = await Match.findByIdAndDelete(id);
      if (!deletedMatch) {
        return res.status(404).json({ message: "Match not found" });
      }
      res.status(200).json({
        message: "Match deleted successfully!",
        match: deletedMatch,
      });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message});
  }
}