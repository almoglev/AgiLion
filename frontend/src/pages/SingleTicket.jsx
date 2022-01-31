import {useEffect, useState} from 'react';
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {getTicketById, closeTicketById} from '../features/tickets/ticketsSlice'
import {getNotes, reset as notesReset, createNote} from '../features/notes/noteSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}
Modal.setAppElement('#root')

function SingleTicket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")

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

  // Open/Close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, ticketId}))
    closeModal()
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

      {ticket.status !== 'done' && (
        <button className='btn' onClick={openModal}><FaPlus /> Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea 
              name="noteText" 
              id="noteText" 
              rows="3" 
              className='form-control' 
              placeholder='Note text' 
              value={noteText} 
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button className='btn' type="submit">Submit</button>
          </div>
        </form>
      </Modal>

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
