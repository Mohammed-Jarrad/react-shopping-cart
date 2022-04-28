import React, {createContext} from 'react';
import {useNavigate} from 'react-router-dom';
import CartProvider from '../../Context/CartProvider';
import FilterProvider from '../../Context/FilterProvider';
import HomeProvider from '../../Context/HomeProvider';
import OrdersProvider from '../../Context/OrdersProvider';
import UserProvider from '../../Context/UserProvider';
import {GetRequest} from '../../utils/requests';
import App from './App';

export const handleLoggedContext = createContext();
const Index = () => {
	// * handle logged
	const navigate = useNavigate();
	async function handleLogged(url) {
		try {
			const res = await GetRequest(url);
			console.log('handleLogged', res);
			if (res.status === 401) {
				// Not Authorized
				navigate('/login');
			} else {
				navigate(url);
			}
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<UserProvider>
			<handleLoggedContext.Provider value={handleLogged}>
				<CartProvider>
					<HomeProvider>
						<OrdersProvider>
							<FilterProvider>
								<App />
							</FilterProvider>
						</OrdersProvider>
					</HomeProvider>
				</CartProvider>
			</handleLoggedContext.Provider>
		</UserProvider>
	);
};

export default Index;
