import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { BsCart4, BsPersonCircle } from 'react-icons/bs';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';

const MainList = ({ logout }) => {
	const user = localStorage.user ? JSON.parse(localStorage.user) : '';
	const [showDropMenu, setShowDropMenu] = useState(false);

	// * hide & drop menu
	const dropRef = useRef();
	const hideDrop = e => {
		if (dropRef.current.contains(e.target)) {
			return;
		} else {
			setShowDropMenu(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', hideDrop);

		return () => document.removeEventListener('mousedown', hideDrop);
	}, [user]);

	const handleClickLogout = () => {
		setShowDropMenu(false);
		logout();
	};

	return (
		<ul className='main-list'>
			{typeof user === 'object' ? (
				<React.Fragment>
					<li>
						<NavLink to='/products'>
							PRODUCTS <BsCart4 />
						</NavLink>
					</li>

					<li>
						<NavLink to='/orders'>
							ORDERS <RiShoppingBag3Fill />
						</NavLink>
					</li>

					<li>
						<NavLink to='/'>
							HOME <AiFillHome />
						</NavLink>
					</li>
					<li ref={dropRef} className='drop-menu'>
						<img onClick={() => setShowDropMenu(!showDropMenu)} src={user && user.user_image} alt='user figure' />
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
						<Link className='login' to='/login'>
							LOG IN
						</Link>
					</li>
					<li>
						<Link className='signup' to='/signup'>
							SIGN UP
						</Link>
					</li>
				</>
			)}
		</ul>
	);
};

export default MainList;
