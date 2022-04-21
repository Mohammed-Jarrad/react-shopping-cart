import React, { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import * as Icon from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';

const ResponsiveList = ({ logout }) => {
	const [showResponsive, setShowResponsive] = useState(false);
	const user = localStorage.user ? JSON.parse(localStorage.user) : '';
	const fullName = user && `${user.name.first_name} ${user.name.last_name}`;
	const responsiveRef = useRef();

	const hideResponsive = e => {
		if (user) {
			if (responsiveRef.current.contains(e.target)) {
				return;
			} else {
				setShowResponsive(false);
			}
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', hideResponsive);

		return () => document.removeEventListener('mousedown', hideResponsive);
	}, []);

	const hideToggleMenu = _ => setShowResponsive(!showResponsive);

	return (
		<div className={`main-responsive-list ${!user && 'hide'}`}>
			<span className='toggle-bar' onClick={() => setShowResponsive(!showResponsive)}>
				{showResponsive ? <FaTimes /> : <FaBars />}
			</span>
			<div className={`responsive-list ${showResponsive && 'move'}`} ref={responsiveRef}>
				<div className='profile-ul'>
					<Link to='/profile' onClick={hideToggleMenu}>
						<span>{fullName}</span>
						<img src={user.user_image} alt='user figure' />
					</Link>
				</div>

				<div className='basic-ul'>
					<Link to='/' onClick={hideToggleMenu}>
						<Icon.AiFillHome />
						Home
					</Link>
					<Link to='/products' onClick={hideToggleMenu}>
						<BsCart4 />
						Products
					</Link>
					<Link to='/orders' onClick={hideToggleMenu}>
						<RiShoppingBag3Fill />
						Orders
					</Link>
				</div>

				<div className='logout'>
					<Link
						to='#'
						onClick={() => {
							hideToggleMenu();
							logout();
						}}
					>
						<HiOutlineLogout title='Logout' />
						Log Out
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ResponsiveList;
