import React from 'react';
import '../../css/Header/Header.css';
import {Link} from 'react-router-dom';
import {GetRequest} from '../../utils/requests';
import ResponsiveList from './ResponsiveList';
import MainList from './MainList';

const Header = () => {
	// ! logout
	async function logout() {
		try {
			const res = await GetRequest('/logout');
			if (res.status === 200) {
				localStorage.clear();
				sessionStorage.removeItem('cart');
				window.location.assign('/login');
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<header>
			<div className='container'>
				<Link to='/' className='logo'>
					{/* <img src={'/images/logo-1.png'} alt='' /> */}
					SHOPERLY!
				</Link>

				<nav>
					<ResponsiveList logout={logout} />
					<MainList logout={logout} />
				</nav>
			</div>
		</header>
	);
};

export default Header;
