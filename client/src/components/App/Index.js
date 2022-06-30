import React from 'react';
import CartProvider from '../../Context/CartProvider';
import FilterProvider from '../../Context/FilterProvider';
import HomeProvider from '../../Context/HomeProvider';
import OrdersProvider from '../../Context/OrdersProvider';
import UserProvider from '../../Context/UserProvider';
import App from './App';

function Index() {
	return (
		<CartProvider>
			<UserProvider>
				<OrdersProvider>
					<HomeProvider>
						<FilterProvider>
							<App />
						</FilterProvider>
					</HomeProvider>
				</OrdersProvider>
			</UserProvider>
		</CartProvider>
	);
}

export default Index;
