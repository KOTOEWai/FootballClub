const express = require('express');
const router = express.Router();

const Matchcontroller = require('../controllers/match');
const upload = require('../helper/upload')



const uploadFields = upload.fields([
    { name: 'teamlogo', maxCount: 2 }
]);
// Routes
router.post('/createMatch',uploadFields,Matchcontroller.createMatch);
router.get('/', Matchcontroller.getAllMatches);
router.get('/:id', Matchcontroller.getMatchById);
router.put('/:id',uploadFields,Matchcontroller.updateMatch);
router.delete('/:id', Matchcontroller.deleteMatch);

module.exports = router;
