/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from 'react'
import '../../css/Header/Header.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { BsCart4 } from 'react-icons/bs'
import { RiArrowRightSLine } from 'react-icons/ri'
import { CurrentUserContext, handleLoggedContext } from '../App/App'
import { GetRequest } from '../../utils/requests'
// import Requests from '../../utils/requests'


const Header = () => {
    // const requests = new Requests();

    const hadleLogged = useContext(handleLoggedContext);
    const [showLoginMenu, setShowLoginMenu] = useState(false);
    const [user] = useState(localStorage.user ? JSON.parse(localStorage.user) : '')

    const hideOrShowMenu = () => setShowLoginMenu(!showLoginMenu)

    async function logout() {
        hideOrShowMenu();
        try {
            const res = await GetRequest('/logout');
            console.log('logoutRseponse', res)
            console.log('dataLogout', await res.json())
            if (res.status === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.assign('/login');
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <header>
            <div className='container'>
                <NavLink to='/'><h1><BsCart4 /> Big Store</h1></NavLink>
                <nav>
                    <ul className='main-list'>
                        <li><NavLink exact={'true'} to='/'> HOME </NavLink></li>
                        {
                            typeof user === 'object'
                                ? <>

                                    <li>
                                        <NavLink exact={'true'} to='/products'>PRODUCTS</NavLink>
                                    </li>

                                    <li>
                                        <NavLink exact={'true'} to='/orders'>ORDERS</NavLink>
                                    </li>

                                    <li>
                                        <Link className='logout' to={'#'} onClick={logout}>LOG OUT</Link>
                                    </li>

                                </>
                                : <>

                                    <li><Link className='login' to='/login'>LOG IN</Link></li>
                                    <li><Link className='signup' to='/signup'>SIGN UP</Link></li>

                                </>
                        }
                    </ul>

                </nav>
            </div>
        </header>
    )
}

export default Header