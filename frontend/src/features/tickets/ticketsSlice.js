import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketsService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create a new ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()

                        return thunkAPI.rejectWithValue(message)
    }
})

// Get user tickets
export const getTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()

                        return thunkAPI.rejectWithValue(message)
    }
})

// Get a ticket of a user by ticketId
export const getTicketById = createAsyncThunk('tickets/get', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTicketById(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()

                        return thunkAPI.rejectWithValue(message)
    }
})

// Close ticket of a user by ticketId
export const closeTicketById = createAsyncThunk('tickets/close', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.closeTicketById(ticketId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                        || error.message || error.toString()

                        return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createTicket.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createTicket.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createTicket.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.tickets = action.payload
        })
        .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getTicketById.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getTicketById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.ticket = action.payload
        })
        .addCase(getTicketById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(closeTicketById.fulfilled, (state, action) => {
            state.isLoading = false
            state.tickets.map((ticket) => ticket._id === action.payload._id ? (ticket.status ='done') : ticket)
        })

    }
})

export const {reset} =ticketSlice.actions
export default ticketSlice.reducer