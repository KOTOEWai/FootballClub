const Player = require ('../models/players');

exports.createPlayer = async (req, res) => {
    try {
      const playerData = req.body;
      if(!playerData){
        return res.status(400).json({ message: "Please provide player data" });
      }
      // Create a new player
      const player = new Player(playerData);
      const savedPlayer = await player.save();
  
      res.status(201).json({
        message: "Player created successfully!",
        player: savedPlayer,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  exports.getAllPlayers = async (req, res) => {
    try {
      const players = await Player.find();
      res.status(200).json(players);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  exports.getPlayerById = async (req, res) => {
    try {
      const { id } = req.params;
      const player = await Player.findById(id);
  
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
  
      res.status(200).json(player);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  exports.updatePlayer = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedPlayer = await Player.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
  
      res.status(200).json({
        message: "Player updated successfully!",
        player: updatedPlayer,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  exports.deletePlayer = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPlayer = await Player.findByIdAndDelete(id);
  
      if (!deletedPlayer) {
        return res.status(404).json({ message: "Player not found" });
      }
  
      res.status(200).json({
        message: "Player deleted successfully!",
        player: deletedPlayer,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  