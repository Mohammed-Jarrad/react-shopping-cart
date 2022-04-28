import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../../css/Main/Main.css';
import {UserContext} from '../../Context/UserProvider';

const Main = () => {
	//context
	const {user, fullName} = useContext(UserContext);

	return (
		<div className='main-page'>
			<div className='content'>
				{typeof user === 'object' ? (
					<h1>Welcome, {fullName}</h1>
				) : (
					<h1>
						Welocome, Please <NavLink to='/login'>LOG IN</NavLink> to started Shopping
					</h1>
				)}
				<Link to={'/products'}>Go Home</Link>
			</div>
		</div>
	);
};

export default Main;
