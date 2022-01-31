import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {getTicketById, closeTicketById} from '../features/tickets/ticketsSlice'
import {getNotes, reset as notesReset} from '../features/notes/noteSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'


function SingleTicket() {
  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)
  const params = useParams()
  const {ticketId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError){
      toast.error(message)
    }

    dispatch(getTicketById(ticketId))
    dispatch(getNotes(ticketId))

    // eslint-disable-next-line
  },[isError, message, ticketId])

  if (isLoading || notesIsLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Sorry, something went wrong</h3>
  }

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicketById(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  return ( 
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('he-IL', {timeZone:'Asia/Jerusalem'})}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
        {(!notes || notes.length == 0) && <h4>No notes yet</h4>}
      </header>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'done' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
      )}
      <br />
    </div>
  )
}

export default SingleTicket;
