import React from 'react';
import CartProvider from '../../Context/CartProvider';
import FilterProvider from '../../Context/FilterProvider';
import HomeProvider from '../../Context/HomeProvider';
import OrdersProvider from '../../Context/OrdersProvider';
import UserProvider from '../../Context/UserProvider';
import App from './App';

const Index = () => {
	return (
		<CartProvider>
			<HomeProvider>
				<OrdersProvider>
					<FilterProvider>
						<UserProvider>
							{/*  */}
							<App />
							{/*  */}
						</UserProvider>
					</FilterProvider>
				</OrdersProvider>
			</HomeProvider>
		</CartProvider>
	);
};

export default Index;
