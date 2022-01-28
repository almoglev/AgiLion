import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { GiLion } from "react-icons/gi";
import {Link} from 'react-router-dom'

function Header() {
  return( 
    <header className='header'>
        <div className='logo'>
            <Link to='/'><GiLion style={{transform: 'scale(1.8)'}} />&nbsp;&nbsp;&nbsp;Agilion</Link>
        </div>
        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt />Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser />Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header;
