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
	const { setUser } = useContext(UserContext);
	const { setCart } = useContext(CartContext);
	//
	const navigate = useNavigate();

	//states
	const [loading, setLoading] = useState(false);

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
			<Loading open={loading} />

			<div className="container">
				<div className="logo">
					<Link to="/" className="logo">
						{/* <img className="cart-logo" src={"/images/logo/N3-cart.png"} alt="" /> */}
						<img src={'/images/logo/5.png'} alt="" />
					</Link>
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
