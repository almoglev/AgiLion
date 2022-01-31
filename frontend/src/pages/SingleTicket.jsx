import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {getTicketById, reset, closeTicketById} from '../features/tickets/ticketsSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import {toast} from 'react-toastify'

function SingleTicket() {
  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
  const params = useParams()
  const {ticketId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError){
      toast.error(message)
    }

    dispatch(getTicketById(ticketId))

    // eslint-disable-next-line
  },[isError, message, ticketId])

  if (isLoading) {
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
      </header>
      {ticket.status !== 'done' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
      )}
    </div>
  )
}

export default SingleTicket;
