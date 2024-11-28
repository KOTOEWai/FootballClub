const express = require('express');
const router = express.Router();
const Playercontroller = require('../controllers/players')
const upload = require('../helper/upload')

const uploadFields = upload.fields([
    { name: 'profileImage', maxCount: 4 }
])

router.post('/createplayer',uploadFields,Playercontroller.createplayer);
router.get('/', Playercontroller.getAllPlayers);
router.get('/:id',Playercontroller.getPlayerById);
router.put('/:id',uploadFields,Playercontroller.updatePlayer);
router.delete('/:id',Playercontroller.deletePlayer);



module.exports = router;