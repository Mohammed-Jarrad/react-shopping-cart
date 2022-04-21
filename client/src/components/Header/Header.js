import React from 'react';
import '../../css/Header/Header.css';
import { Link } from 'react-router-dom';
import { GetRequest } from '../../utils/requests';
import ResponsiveList from './ResponsiveList';
import MainList from './MainList';

const Header = () => {
	// ! logout
	async function logout() {
		try {
			const res = await GetRequest('/logout');
			if (res.status === 200) {
				localStorage.removeItem('token');
				localStorage.removeItem('user');
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
					Big<span>S</span>tore
					{/* <img src={'/images/logo.png'} alt='' /> */}
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
