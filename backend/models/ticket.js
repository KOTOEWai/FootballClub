const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a Match document
    ref: 'Match',
    required: true,
  },
  ticketType:{
    type: String,
    enum: ['VIP', 'Standard', 'Economy'], // Types of tickets
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  seating: {
    seatingType:{
    type: String, // Seat assignment
    required: true,
    },
    seatNumber: {
      type: [String], // Define seatNumber as an array of numbers
      default: ["01", "02","03", "04", "05","06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], // Set default as an array of seat numbers
    },
  },
 
 
});

module.exports = mongoose.model('Ticket', TicketSchema); 