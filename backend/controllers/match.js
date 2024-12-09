const Match = require('../models/match');
const path = require('path');
const removefiles = require('../helper/file')

exports.createMatch = async (req, res) => {
  try {
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    // Extract uploaded files
    const teamlogo = req.files?.teamlogo?.map((file) => file.filename ) || [];

    // Validate required fields
    const { matchDate, matchTime, stadium, homeTeam, awayTeam, referees, location,homeTeamscore , awayTeamscore, matchType } = req.body;

    if (!matchDate || !matchTime || !stadium || !homeTeam || !awayTeam || !referees || !location || !matchType || !homeTeamscore || !awayTeamscore) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!teamlogo.length) {
      return res.status(400).json({ message: "At least one team logo is required." });
    }

    // Create match
    const match = new Match({
      matchDate,
      matchTime,
      stadium,
      homeTeam,
      awayTeam,
      teamlogo,
      referees,
      location,
      homeTeamscore ,
      awayTeamscore,
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
    console.log(req.body)
    console.log(req.params)
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
    console.log(req.body);
    try {
        const { id } = req.params;
        // Handle file uploads if present
        const uploadedLogos = req.files?.teamlogo?.map((file) => file.filename) || [];
        if (uploadedLogos.length > 0) {
            req.body.teamlogo = uploadedLogos; // Add uploaded files to the update data
        }

        // Validate incoming data (optional)
        const allowedFields = ['matchDate', 'matchTime', 'stadium', 'homeTeam', 'awayTeam', 'teamlogo', 'referees', 'location', 'homeTeamscore', 'awayTeamscore', 'matchType'];
        const sanitizedData = Object.keys(req.body)
            .filter((key) => allowedFields.includes(key))
            .reduce((obj, key) => { obj[key] = req.body[key]; return obj; }, {});

        // Fetch the current match to get existing logos
        const currentMatch = await Match.findById(id);
        if (!currentMatch) {
            return res.status(404).json({ message: "Match not found" });
        }

        // Remove old logos
        await Promise.all(currentMatch.teamlogo.map(logo => removefiles(path.join(__dirname, '/../uploads', logo))));

        // Update the match
        const updatedMatch = await Match.findByIdAndUpdate(id, sanitizedData, { new: true });

        if (!updatedMatch) {
            return res.status(404).json({ message: "Match not found" });
        }

        res.status(200).json({ message: "Match updated successfully!", match: updatedMatch });
    } catch (err) {
        console.error("Error in updateMatch:", err);
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
 
      // Remove old logos
      await Promise.all(deletedMatch.teamlogo.map(logo => removefiles(path.join(__dirname, '/../uploads', logo))));
      res.status(200).json({
        message: "Match deleted successfully!",
        match: deletedMatch,
      });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message});
  }
}