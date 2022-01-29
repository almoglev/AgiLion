const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get current user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    // req.user has all info about the user from db, but we want to send only the id, name and email to the frontend
    res.status(200).json({message: 'getTickets'})
})

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    // req.user has all info about the user from db, but we want to send only the id, name and email to the frontend
    res.status(200).json({message: 'createTicket'})
})

module.exports = {
    getTickets,
    createTicket
}