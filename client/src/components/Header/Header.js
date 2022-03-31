/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import '../../css/Header/Header.css'
import { NavLink, Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { BsCart4 } from 'react-icons/bs'
import { RiArrowRightSLine } from 'react-icons/ri'

const Header = () => {

    let [showLoginMenu, setShowLoginMenu] = useState(false)

    let hideOrShowMenu = () => setShowLoginMenu(!showLoginMenu)

    return (
        <header>
            <div className='container'>
                <NavLink to='/'><h1><BsCart4 /> Big Store</h1></NavLink>
                <nav>
                    <ul className='main-list'>
                        <li><NavLink exact={'true'} to='/orders'> Orders </NavLink></li>
                        <li><NavLink exact={'true'} to='/'> Home </NavLink></li>
                        <li className='login-drop'>
                            <button onClick={hideOrShowMenu}>
                                Signin
                            </button>
                            <Fade cascade>
                                <ul
                                    className='drop-content'
                                    style={{ display: `${showLoginMenu ? 'block' : 'none'}` }}
                                >
                                    <li><RiArrowRightSLine size='1.5em'/><Link onClick={hideOrShowMenu} to='/login'> Login </Link></li>
                                    <li><RiArrowRightSLine size='1.5em'/><Link onClick={hideOrShowMenu} to='/signup'> Signup </Link></li>
                                </ul>
                            </Fade>
                        </li>
                    </ul>

                </nav>
            </div>
        </header>
    )
}

export default Header