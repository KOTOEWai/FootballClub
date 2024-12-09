const Ticket = require('../models/ticket'); // Adjust the path if your file structure is different

// Get all tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('matchId');
    res.status(200).json( tickets );
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error: error.message });
  }
};

// Get a single ticket by ID
exports.getSingleTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('matchId');
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching ticket', error: error.message });
  }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
    console.log(req.body);
  try {
    const ticket = new Ticket(req.body);
  const savedticket =  await ticket.save();
    res.status(201).json({savedticket});
  } catch (error) {
    res.status(400).json({ message: 'Error creating ticket', error: error.message });
  }
};

// Update an existing ticket by ID
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error updating ticket', error: error.message });
  }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }
    res.status(200).json({ success: true, message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting ticket', error: error.message });
  }
};
