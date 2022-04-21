import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { BsCart4, BsPersonCircle } from 'react-icons/bs';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

const MainList = ({ logout }) => {
	const user = localStorage.user ? JSON.parse(localStorage.user) : '';
	const [showDropMenu, setShowDropMenu] = useState(false);

	// * hide & drop menu
	const dropRef = useRef();
	const hideDrop = e => {
		if (user) {
			if (dropRef.current.contains(e.target)) {
				return;
			} else {
				setShowDropMenu(false);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', hideDrop);

		return () => document.removeEventListener('mousedown', hideDrop);
	}, []);

	function handleClickLogout() {
		setShowDropMenu(false);
		logout();
	}

	return (
		<ul className={`main-list ${user && 'hide-register'}`}>
			{typeof user === 'object' ? (
				<React.Fragment>
					<li>
						<NavLink to='/products'>
							<BsCart4 /> PRODUCTS
						</NavLink>
					</li>

					<li>
						<NavLink to='/orders'>
							<RiShoppingBag3Fill /> ORDERS
						</NavLink>
					</li>

					<li>
						<NavLink to='/'>
							<AiFillHome /> HOME
						</NavLink>
					</li>
					<li ref={dropRef} className='drop-menu'>
						<img
							onClick={() => setShowDropMenu(!showDropMenu)}
							src={user && user.user_image}
							alt='user figure'
						/>
						<div className={`menu-content ${showDropMenu && 'move'}`}>
							<Link to='/profile' onClick={() => setShowDropMenu(false)}>
								<BsPersonCircle /> Profile
							</Link>
							<Link to='#' onClick={handleClickLogout}>
								<AiOutlineLogout /> Log Out
							</Link>
						</div>
					</li>
				</React.Fragment>
			) : (
				<>
					<li>
						<NavLink className='login' to='/login' title='Login'>
							<AiOutlineUser />
						</NavLink>
					</li>
					<li>
						<NavLink className='signup' to='/signup' title='Signup'>
							<AiOutlineUserAdd />
						</NavLink>
					</li>
				</>
			)}
		</ul>
	);
};

export default MainList;
