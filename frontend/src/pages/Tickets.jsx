import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketsSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function Tickets() {
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    },[isSuccess, dispatch])

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return <div>TICKETS</div>;
}

export default Tickets;
