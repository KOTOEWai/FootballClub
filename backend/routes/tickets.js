
const express = require('express');

const router = express.Router();
const ticketcontroller = require('../controllers/ticket')

router.get('/',ticketcontroller.getTickets);
router.get('/:id',ticketcontroller.getSingleTicket);
router.post('/',ticketcontroller.createTicket);
router.put('/:id',ticketcontroller.updateTicket);
router.delete('/:id',ticketcontroller.deleteTicket);

module.exports = router;
