import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Orders from '../../pages/Orders/Orders';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/SignUp/SignUp';
import CreateProduct from '../../pages/CreateProduct/CreateProduct';
import Profile from '../../pages/Profile/Profile';
import ScrollToTop from '../Scrolling/ScrollToTop';
import ErrorPage from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { UserContext } from '../../Context/UserProvider';
import Users from '../Users/Users';
import AllOrders from '../AllOrders/AllOrders';
import UpdateProduct from '../../pages/UpdateProduct/UpdateProduct';
import Cart from '../Cart/Cart';
import SingleOrder from '../../pages/SingleOrder/SingleOrder';
import SingleProduct from '../../pages/SingleProduct/SingleProduct';
import UpdateProductForm from '../../pages/UpdateProductForm/UpdateProductForm';
import MainPage from '../../pages/MainPage/MainPage';
import ScrollToTopWhenRefresh from './ScrollToTopWhenRefresh';
import SingleCategory from '../../pages/SingleCategory/SingleCategory';
import AdminNav from '../AdminNav/AdminNav';

const App = () => {
	//context
	const { admin, token } = useContext(UserContext);

	return (
		<>
			<div className="layout">
				<ScrollToTop />

				<header className="header-layout">
					<Header />
				</header>

				<div className="main-layout">
					<ScrollToTopWhenRefresh>
						{admin ? <AdminNav /> : null}
						<Routes>
							{/* For All */}
							<Route exact={'true'} path="/" element={<MainPage />} />
							<Route exact={'true'} path="/product/:id" element={<SingleProduct />} />
							<Route exact={'true'} path="/all-products" element={<Home />} />
							<Route exact={'true'} path="/category/:category" element={<SingleCategory />} />
							{/* For New User */}
							<Route exact={'true'} path="/login" element={token ? <ErrorPage /> : <Login />} />
							<Route exact={'true'} path="/signup" element={token ? <ErrorPage /> : <SignUp />} />
							{/* For User */}
							<Route exact={'true'} path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
							<Route
								exact={'true'}
								path="/profile"
								element={token ? <Profile /> : <Navigate to="/login" />}
							/>
							<Route exact={'true'} path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
							<Route
								exact={'true'}
								path="/order/:id"
								element={token ? <SingleOrder /> : <Navigate to="/login" />}
							/>
							{/* For Admin */}
							<Route exact={'true'} path="/users" element={admin ? <Users /> : <ErrorPage />} />
							<Route
								exact={'true'}
								path="/create-product"
								element={admin ? <CreateProduct /> : <ErrorPage />}
							/>
							<Route exact={'true'} path="/all-orders" element={admin ? <AllOrders /> : <ErrorPage />} />
							<Route
								exact={'true'}
								path="/update-product"
								element={admin ? <UpdateProduct /> : <ErrorPage />}
							/>
							<Route
								exact={'true'}
								path="/update-product/:id"
								element={admin ? <UpdateProductForm /> : <ErrorPage />}
							/>
							{/* For Error PATH NAME */}
							<Route path="*" element={<ErrorPage />} />
						</Routes>
					</ScrollToTopWhenRefresh>
				</div>

				<footer className="footer-layout">
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default App;
