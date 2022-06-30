import React from 'react';
import Cart from '../../components/Cart/Cart';

const MyCart = () => {
	return (
		<div className="cart container" style={{ gridArea: 'main', margin: 'auto' }}>
			<Cart />
		</div>
	);
};

export default MyCart;
