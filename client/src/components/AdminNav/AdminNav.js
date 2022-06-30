/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/AdminNav/AdminNav.css';
import { UserContext } from '../../Context/UserProvider';

const AdminNav = () => {
	const [showAdminNav, setShowAdminNav] = useState(false);
	const { admin } = useContext(UserContext);

	const adminNavRef = useRef();

	const hideList = e => {
		if (showAdminNav && admin) {
			if (!adminNavRef.current.contains(e.target)) {
				setShowAdminNav(false);
			}
		}
	};
	useEffect(() => {
		window.addEventListener('click', e => {
			hideList(e);
		});

		return () => window.removeEventListener('click', e => hideList(e));
	}, [showAdminNav]);

	return (
		<div className={`admin-nav ${!showAdminNav && 'hide'}`} ref={adminNavRef}>
			<div className="admin-title">Admin Dashboard</div>

			<div className="admin-lists">
				<NavLink to={'/create-product'} onClick={() => setShowAdminNav(false)}>
					Create Product
				</NavLink>
				<NavLink to={'/update-product'} onClick={() => setShowAdminNav(false)}>
					Update Products
				</NavLink>
				<NavLink to={'/users'} onClick={() => setShowAdminNav(false)}>
					All Users
				</NavLink>
				<NavLink to={'/all-orders'} onClick={() => setShowAdminNav(false)}>
					All Orders
				</NavLink>
			</div>

			<span className="side-btn" onClick={() => setShowAdminNav(!showAdminNav)}>
				Admin
			</span>
		</div>
	);
};

export default AdminNav;
