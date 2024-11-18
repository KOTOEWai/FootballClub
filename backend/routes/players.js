const express = require('express');

const router = express.Router();
const Playercontroller = require('../controllers/players')


router.post('/createplayer',Playercontroller.createPlayer);
router.get('/', Playercontroller.getAllPlayers);
router.get('/:id',Playercontroller.getPlayerById);
router.put('/:id',Playercontroller.updatePlayer);
router.delete('/:id',Playercontroller.deletePlayer);



module.exports = router;