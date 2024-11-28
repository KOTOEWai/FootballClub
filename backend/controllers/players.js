
const Player = require('../models/players')

const paseNasted = (data)=>{
  const result = {};
  for (const key in data){
    if (key.includes(".")){
      const [parent,child ] = key.split(".");
      result[parent] = result[parent] || {};
      result[parent][child] = data[key];
    }else{
      result[key] = data[key];
    }
  }
  return result;
};
exports.createplayer =  async (req, res) => {

    try {
        const profileImage = req.files?.profileImage?.map((file)=>file.filename) || [];
        const  { stats, contract} = paseNasted(req.body);
        const {
            name, position, jerseyNumber, age, nationality, height, weight, team, isInjured
        } = req.body;
         
        const newPlayer = new Player({
            name,
            position,
            jerseyNumber,
            age,
            nationality,
            height,
            weight,
            team,
            isInjured,
            profileImage,
            stats, 
            contract 
        });
       const savedPlayer =  await newPlayer.save();
       res.status(201).json({ message: 'Player created successfully', player: savedPlayer });
    } catch (error) {
      if(error.code ===11000){
        res.status(400).json({ message: 'Player with this name already exists' });
      }
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

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

       if(!req.files){
        console.log("image is missing bro")
       }
      if (req.files) {
        const profileImage = req.files?.profileImage?.map((file)=>file.filename) || [];
        req.body.profileImage = profileImage;
      }

      const updatedPlayer = await Player.findByIdAndUpdate(id,req.body , {
        new: true,
        runValidators: true,
      });
  
      if (!updatedPlayer) {
        return res.status(404).json({ message: 'Player not found' });
      }
      res.status(200).json({ message: 'Player updated successfully!', player: updatedPlayer });
    } catch (err) {
      console.error('Error updating player:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
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
  