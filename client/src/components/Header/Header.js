/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import '../../css/Header/Header.css'
import { NavLink, Link } from 'react-router-dom'
import { BsCart4 } from 'react-icons/bs'
import { GetRequest } from '../../utils/requests'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Image } from 'cloudinary-react'



const Header = () => {

    //! my states
    const user = localStorage.user ? JSON.parse(localStorage.user) : '';
    const full_name = user ? `${user.name.first_name} ${user.name.last_name}` : '';
    const [showDropMenu, setShowDropMenu] = useState(false);

    //! hide drop menu
    const dropRef = useRef();
    useEffect(() => {
        if (user) {
            document.addEventListener('click', (e) => {
                if (dropRef.current.contains(e.target)) {
                    return;
                } else {
                    setShowDropMenu(false);
                }
            });
        }
    }, [user])

    // ! logout
    async function logout() {
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
                <nav >
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

                                    <li className='drop-menu'>
                                        <div
                                            onClick={() => setShowDropMenu(!showDropMenu)}
                                            ref={dropRef}
                                        >
                                            <Image className="profile-img" publicId={user.user_image} cloudName='dipbhxayl' />
                                        </div>
                                        <ul
                                            className='drop-list'
                                            style={{ display: showDropMenu ? "block" : "none" }}

                                        >
                                            <li>
                                                <MdKeyboardArrowRight />
                                                <Link to="/profile">
                                                    My Account
                                                </Link>
                                            </li>
                                            <li>
                                                <MdKeyboardArrowRight />
                                                <Link to="#" onClick={logout}>
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ul>
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
        </header >
    )
}

export default Header