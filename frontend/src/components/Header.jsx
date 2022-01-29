import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { GiLion } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} =  useSelector((state) => state.auth)

    const onLogout = () => {
        // Goes to logout and reset in authSlice.js
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return( 
    <header className='header'>
        <div>
            <Link to='/' style={{color: '#00dbd0'}}>
                <GiLion style={{transform: 'scale(2.8)'}} />
            </Link>
            <Link to='/' className='logo'>
                &nbsp;&nbsp;&nbsp;AgiLion
            </Link>
            <br /><p>You ask, We solve<br/> As agile as a lion!</p>
        </div>
        <ul>
            { user ? (
                <>
                    <li>
                        <button className='btn' onClick={onLogout}><FaSignOutAlt /> Logout</button>
                    </li>
                </>
            ) : 
            ( 
                <>
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
                </>
            ) }
        </ul>
    </header>
  )
}

export default Header;
