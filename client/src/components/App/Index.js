import React, {createContext} from 'react';
import {useNavigate} from 'react-router-dom';
import CartProvider from '../../Context/CartProvider';
import FilterProvider from '../../Context/FilterProvider';
import HomeProvider from '../../Context/HomeProvider';
import OrdersProvider from '../../Context/OrdersProvider';
import UserProvider from '../../Context/UserProvider';
import App from './App';

const Index = () => {
	return (
		<UserProvider>
			<CartProvider>
				<HomeProvider>
					<OrdersProvider>
						<FilterProvider>
							{/*  */}
							<App />
							{/*  */}
						</FilterProvider>
					</OrdersProvider>
				</HomeProvider>
			</CartProvider>
		</UserProvider>
	);
};

export default Index;
