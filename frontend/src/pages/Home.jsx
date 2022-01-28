import React from 'react'
import {Link} from 'react-router-dom'
import {FaMarker, FaBoxOpen} from 'react-icons/fa'

function Home() {
    return( 
        <>
            <section className='heading'>
                <h1>What do you need help with?</h1>
                <p>Please choose an option below</p>
            </section>

            <Link to='/new-ticket' className='btn btn-reverse btn-block'>
                <FaMarker />Write a new ticket
            </Link>

            <Link to='/tickets' className='btn btn-block'>
                <FaBoxOpen />All my tickets
            </Link>
        </>
    )
}

export default Home;
