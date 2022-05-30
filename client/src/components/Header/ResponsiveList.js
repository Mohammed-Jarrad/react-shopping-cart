/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { FaShoppingBasket } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as Icon from 'react-icons/ai';
import { BsCart4 } from 'react-icons/bs';
import { UserContext } from '../../Context/UserProvider';
import { CartContext } from '../../Context/CartProvider';
import ThemeToggle from './ThemeToggle';

const ResponsiveList = ({ logout }) => {
	//context
	const { user, token, fullName } = useContext(UserContext);
	const { cart } = useContext(CartContext);
	//states
	const [showResponsive, setShowResponsive] = useState(false);
	const responsiveRef = useRef();

	const hideResponsive = e => {
		if (token) {
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
		<div className={`main-responsive-list ${!token && 'hide'}`}>
			<div className="toggle-bar" onClick={() => setShowResponsive(!showResponsive)}>
				{showResponsive ? <FaTimes /> : <FaBars />}
			</div>
			<div className={`responsive-list ${showResponsive && 'move'}`} ref={responsiveRef}>
				<div className="profile-ul">
					<Link to="/profile" onClick={hideToggleMenu}>
						<span>{fullName}</span>
						<img src={token ? user['user_image'] : null} alt="user figure" />
					</Link>
				</div>

				<div className="theme">
					<ThemeToggle />
				</div>

				<div className="basic-ul">
					<Link to="/" onClick={hideToggleMenu}>
						<Icon.AiFillHome />
						Home
					</Link>

					<Link to="/all-products" onClick={hideToggleMenu}>
						<FaShoppingBasket />
						PRODUCTS
					</Link>

					<Link to="/cart" onClick={hideToggleMenu} className="cart-link">
						<div className="cart-link">
							<BsCart4 />
							<span>{cart.length}</span>
						</div>
						Cart
					</Link>

					<Link to="/orders" onClick={hideToggleMenu}>
						<RiShoppingBag3Fill />
						Orders
					</Link>
				</div>

				<div className="logout">
					<Link
						to="#"
						onClick={() => {
							hideToggleMenu();
							logout();
						}}
					>
						<HiOutlineLogout title="Logout" />
						Log Out
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ResponsiveList;
