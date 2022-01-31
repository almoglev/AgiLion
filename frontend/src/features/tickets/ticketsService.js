import axios from 'axios'

const API_URL = '/api/tickets/'

// Create new ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response =  await axios.post(API_URL, ticketData, config)
    return response.data
}

// Get all tickets of a user
const getTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response =  await axios.get(API_URL, config)
    return response.data
}

// Get a ticket of a user by ticket id
const getTicketById = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response =  await axios.get(API_URL + ticketId, config)
    return response.data
}

const ticketService = {
    createTicket,
    getTickets,
    getTicketById
}

export default ticketService