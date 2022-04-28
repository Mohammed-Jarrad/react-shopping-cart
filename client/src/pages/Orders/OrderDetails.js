import React, { useContext } from 'react';
import { TiTimes } from 'react-icons/ti';
import { OrdersContext } from '../../Context/OrdersProvider';

const OrderDetails = ({ order }) => {
	//context
	const { removeProductFromOrder } = useContext(OrdersContext);
	// states
	const { order_info } = order;

	return (
		<div className='order-items'>
			{order_info.map((item, index) => (
				<div className='order-item' key={index}>
					<div className='img-item'>
						<img src={item.product.imageUrl} alt='prduct figure' />
						<h3>{item.product.title}</h3>
					</div>
					<div className='price'>$ {item.product.price * item.quantity}</div>
					<div className='delete'>
						<span
							style={{ background: `${item.selected_color}` }}
							onClick={() => {
								removeProductFromOrder(item.product._id, item.selected_color, item.selected_size);
							}}
							title='Remove Product'
						>
							<TiTimes color={`red`} />
						</span>
					</div>
					<div className='size'>
						<span>{item.selected_size ? item.selected_size : 'Not Found'}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderDetails;
