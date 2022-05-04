import React, {useContext} from 'react';
import Cart from '../../components/Cart/Cart';
import {HomeContext} from '../../Context/HomeProvider';

const MyCart = () => {
	const {products} = useContext(HomeContext);
	return (
		<div className='cart container' style={{gridArea: 'main', margin: 'auto'}}>
			<Cart />
		</div>
	);
};

export default MyCart;
