/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react'
import '../../css/Header/Header.css'
import { NavLink, Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { BsCart4 } from 'react-icons/bs'
import { RiArrowRightSLine } from 'react-icons/ri'
import { CurrentUserContext } from '../App/App'

const Header = () => {

    const currenUser = useContext(CurrentUserContext)

    const [showLoginMenu, setShowLoginMenu] = useState(false)
    const hideOrShowMenu = () => setShowLoginMenu(!showLoginMenu)

    const logout = async () => {
        hideOrShowMenu();
        try {
            const res = await fetch('/logout', { method: "GET" })
            console.log(res)
            // res.status = 401 && window.location.replace(res.url)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <header>
            <div className='container'>
                <NavLink to='/'><h1><BsCart4 /> Big Store</h1></NavLink>
                <nav>
                    <ul className='main-list'>
                        {
                            typeof currenUser === "object" && (
                                <>
                                    <li><NavLink exact={'true'} to='/products'> PRODUCTS </NavLink></li>
                                    <li><NavLink exact={'true'} to='/orders'> ORDERS </NavLink></li>
                                </>
                            )
                        }
                        <li><NavLink exact={'true'} to='/'> MAIN </NavLink></li>

                        <li className='login-drop'>
                            <button onClick={hideOrShowMenu}>
                                SIGN
                            </button>
                            <Fade cascade>
                                <ul
                                    className='drop-content'
                                    style={{ display: `${showLoginMenu ? 'block' : 'none'}` }}
                                >
                                    {
                                        typeof currenUser === 'object'
                                            ? (
                                                <li><RiArrowRightSLine size='1.5em' /><Link onClick={logout} to='/logout'> LOG OUT </Link></li>
                                            )
                                            : (
                                                <>
                                                    <li><RiArrowRightSLine size='1.5em' /><Link onClick={hideOrShowMenu} to='/login'> LOG IN </Link></li>
                                                    <li><RiArrowRightSLine size='1.5em' /><Link onClick={hideOrShowMenu} to='/signup'> SIGN UP </Link></li>
                                                </>
                                            )
                                    }
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