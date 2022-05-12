/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { BsCart4, BsPersonCircle } from 'react-icons/bs';
import { AiFillHome, AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { UserContext } from '../../Context/UserProvider';
import { CartContext } from '../../Context/CartProvider';
import ThemeToggle from './ThemeToggle';

const MainList = ({ logout }) => {
	const { user } = useContext(UserContext);
	const { cart } = useContext(CartContext);
	const [showDropMenu, setShowDropMenu] = useState(false);

	// * hide & drop menu
	const dropRef = useRef();
	const hideDrop = e => {
		if (user) {
			!dropRef.current.contains(e.target) && setShowDropMenu(false);
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
			{user ? (
				<React.Fragment>
					<li>
						<NavLink to="/cart" className="cart-link">
							<BsCart4 />
							<span>{cart.length}</span>
						</NavLink>
					</li>

					<li>
						<NavLink to="/orders">
							<RiShoppingBag3Fill /> ORDERS
						</NavLink>
					</li>

					<li>
						<NavLink to="/all-products">
							<AiFillHome /> HOME
						</NavLink>
					</li>

					<li ref={dropRef} className="drop-menu">
						<img onClick={() => setShowDropMenu(!showDropMenu)} src={user['user_image']} alt="user figure" />
						<div className={`menu-content ${showDropMenu && 'move'}`}>
							<Link to="/profile" onClick={() => setShowDropMenu(false)}>
								<BsPersonCircle /> Profile
							</Link>
							<Link to="#" onClick={handleClickLogout}>
								<AiOutlineLogout /> Log Out
							</Link>
						</div>
					</li>

					<li className="theme">
						<ThemeToggle />
					</li>
				</React.Fragment>
			) : (
				<>
					<li>
						<NavLink className="login" to="/login" title="Login">
							<AiOutlineUser />
						</NavLink>
					</li>
					<li>
						<NavLink className="signup" to="/signup" title="Signup">
							<AiOutlineUserAdd />
						</NavLink>
					</li>
					<li className="theme">
						<ThemeToggle />
					</li>
				</>
			)}
		</ul>
	);
};

export default MainList;
