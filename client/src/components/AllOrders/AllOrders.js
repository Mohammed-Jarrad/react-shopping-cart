import React, {useContext, useEffect} from 'react';
import {OrdersContext} from '../../Context/OrdersProvider';

const AllOrders = () => {
	//context
	const {getAllOrders, orders} = useContext(OrdersContext);

	useEffect(() => {
		getAllOrders();
		return;
	}, []);

	return (
		<React.Fragment>
			<h1>All Orders For Users</h1>
			{orders.length && <div className='order'></div>}
		</React.Fragment>
	);
};

export default AllOrders;
