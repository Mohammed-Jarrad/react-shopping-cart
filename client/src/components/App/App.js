import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import Orders from '../../pages/Orders/Orders';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import Main from '../Main/Main';
import CreateProduct from '../../pages/CreateProduct/CreateProduct';
import Profile from '../../pages/Profile/Profile';
import ScrollToTop from '../Scrolling/ScrollToTop';
import ErrorPage from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {UserContext} from '../../Context/UserProvider';
import Users from '../Users/Users';
import AllOrders from '../AllOrders/AllOrders';

const App = () => {
	const {token, admin} = useContext(UserContext);

	return (
		<div className='layout'>
			<ScrollToTop />

			<Header />
			<Routes>
				<Route exact={'true'} path='/' element={<Main />} />
				<Route exact={'true'} path='/login' element={<Login />} />

				<Route exact={'true'} path='/signup' element={<SignUp />} />
				{token && (
					<>
						<Route exact={'true'} path='/products' element={<Home />} />
						<Route exact={'true'} path='/orders' element={<Orders />} />
						<Route exact={'true'} path='/profile' element={<Profile />} />
					</>
				)}
				{admin && ( //  * admin dashboard !
					<>
						<Route exact={'true'} path='/users' element={<Users />} />
						<Route exact={'true'} path='/create-product' element={<CreateProduct />} />
						<Route exact={'true'} path='/all-orders' element={<AllOrders />} />
					</>
				)}
				<Route path='*' element={<ErrorPage />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
