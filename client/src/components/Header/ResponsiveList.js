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
		<div className={`main-responsive-list ${showResponsive ? 'move' : ''}`}>
			<div className={`responsive-list`} ref={responsiveRef}>
				<span className='toggle-bar' onClick={() => setShowResponsive(!showResponsive)}>
					{showResponsive ? <FaTimes /> : <FaBars />}
				</span>

				<div className='profile-ul'>
					<HiOutlineLogout
						title='Logout'
						onClick={() => {
							hideToggleMenu();
							logout();
						}}
					/>
					<Link to='/profile' onClick={hideToggleMenu}>
						{fullName}
						<img src={user.user_image} alt='' />
					</Link>
				</div>

				<div className='basic-ul'>
					<Link to='/' onClick={hideToggleMenu}>
						<Icon.AiFillHome />
						Home
					</Link>
					<Link to='/products' onClick={hideToggleMenu}>
						<RiShoppingBag3Fill />
						Products
					</Link>
					<Link to='/orders' onClick={hideToggleMenu}>
						<BsCart4 />
						Orders
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ResponsiveList;
