import React from 'react'
import '../../css/Header/Header.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className='container'>
                <p>Shopping Cart</p>
                <nav>
                    <ul>
                        <li><NavLink to='/'> Home </NavLink></li>
                        <li><NavLink to='/orders'> Orders </NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header