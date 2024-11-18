const express = require('express');

const router = express.Router();
const Matchcontroller = require('../controllers/match')


router.post('/creatematch',Matchcontroller.createMatch);
router.get('/', Matchcontroller.getAllMatches);
router.get('/:id',Matchcontroller.getMatchById);
router.put('/:id',Matchcontroller.updateMatch);
router.delete('/:id',Matchcontroller.deleteMatch);



module.exports = router;