import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Main/Main.css';
import { useContext } from 'react';
import { handleLoggedContext } from '../App/App';

const Main = () => {
	const [user] = useState(localStorage.user ? JSON.parse(localStorage.user) : '');
	const handleLogged = useContext(handleLoggedContext);

	return (
		<div className='main-page'>
			<div className='content'>
				{typeof user === 'object' ? (
					<h1>Welcome, {`${user.name.first_name} ${user.name.last_name}`}</h1>
				) : (
					<h1>
						Welocome, Please <NavLink to='/login'>LOG IN</NavLink> to started Shopping
					</h1>
				)}
				<button onClick={() => handleLogged('/products')}> Get Started </button>
			</div>
		</div>
	);
};

export default Main;
