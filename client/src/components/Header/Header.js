import React, { useContext, useEffect, useState } from 'react';
import Loading from '../Loading/Loading.js';
import '../../css/Header/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { GetRequest } from '../../utils/requests';
import ResponsiveList from './ResponsiveList';
import MainList from './MainList';
import { UserContext } from '../../Context/UserProvider';
import { AiOutlineMenu } from 'react-icons/ai';
import { CartContext } from '../../Context/CartProvider.js';

const Header = () => {
	//context
	const { admin, setUser } = useContext(UserContext);
	const { setCart } = useContext(CartContext);
	//
	const navigate = useNavigate();

	//states
	const [showAdmin, setShowAdmin] = useState(false);
	const [loading, setLoading] = useState(false);

	const hideMenu = _ => setShowAdmin(false);

	// ! logout
	async function logout() {
		setLoading(true);
		try {
			const res = await GetRequest('/logout');
			if (res.status === 200) {
				localStorage.clear();
				setCart([]);
				setUser('');
				setLoading(false);
				navigate('/login');
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	return (
		<>
			<Loading open={loading} setOpen={setLoading} />

			<div className="container">
				<div className="logo">
					<Link to="/" className="logo">
						{/* <img className="cart-logo" src={"/images/logo/N3-cart.png"} alt="" /> */}
						<img src={'/images/logo/5.png'} alt="" />
					</Link>
					{admin && (
						<div className="admin">
							<span onClick={_ => setShowAdmin(!showAdmin)}>
								<AiOutlineMenu />
							</span>
							<div className={`admin-dashboard ${showAdmin && 'show'}`}>
								<Link onClick={hideMenu} className="admin-dashboard-btn" to={`/create-product`}>
									Create New Product
								</Link>
								<Link onClick={hideMenu} className="admin-dashboard-btn" to={`/users`}>
									All Users
								</Link>
								<Link onClick={hideMenu} className="admin-dashboard-btn" to={`/all-orders`}>
									All Orders
								</Link>
								<Link onClick={hideMenu} className="admin-dashboard-btn" to={`/update-product`}>
									Update Products
								</Link>
							</div>
						</div>
					)}
				</div>

				<nav>
					<ResponsiveList logout={logout} />
					<MainList logout={logout} />
				</nav>
			</div>
		</>
	);
};

export default Header;
