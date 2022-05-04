import React, {useContext} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
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
import UpdateProduct from '../UpdateProduct/UpdateProduct';
import MyCart from '../../pages/MyCart/MyCart';
import SingleProduct from '../../pages/SingleProduct/SingleProduct';
import Cart from '../Cart/Cart';

const App = () => {
	const {user, admin} = useContext(UserContext);

	return (
		<BrowserRouter>
			<div className='layout'>
				<ScrollToTop />

				<Header />

				<Routes>
					{/* For All */}
					{/* <Route exact={'true'} path='/' element={<Main />} /> */}
					<Route exact={'true'} path='/product/:id' element={<SingleProduct />} />
					<Route exact={'true'} path='/' element={<Home />} />
					{/* For New User */}
					<Route exact={'true'} path='/login' element={user ? <ErrorPage /> : <Login />} />
					<Route exact={'true'} path='/signup' element={user ? <ErrorPage /> : <SignUp />} />
					{/* For User */}
					<Route exact={'true'} path='/orders' element={user ? <Orders /> : <Navigate to='/login' />} />
					<Route exact={'true'} path='/profile' element={user ? <Profile /> : <Navigate to='/login' />} />
					<Route exact={'true'} path='/cart' element={user ? <Cart /> : <Navigate to='/login' />} />
					{/* For Admin */}
					<Route exact={'true'} path='/users' element={admin ? <Users /> : <ErrorPage />} />
					<Route exact={'true'} path='/create-product' element={admin ? <CreateProduct /> : <ErrorPage />} />
					<Route exact={'true'} path='/all-orders' element={admin ? <AllOrders /> : <ErrorPage />} />
					<Route exact={'true'} path='/update-product' element={admin ? <UpdateProduct /> : <ErrorPage />} />☻
					{/* For Error PATH NAME */}
					<Route path='*' element={<ErrorPage />} />
				</Routes>

				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
