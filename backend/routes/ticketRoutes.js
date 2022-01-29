const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getTickets, getTicketById, createTicket, deleteTicketById, updateTicketById} = require('../controllers/ticketController')

// The requests (go to ticketController.js)
router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicketById).delete(protect, deleteTicketById).put(protect, updateTicketById)

module.exports = router