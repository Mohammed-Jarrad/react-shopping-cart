import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { PutRequest } from '../../utils/requests';

const OrderDetails = ({ removeProductFromOrder, order }) => {
	// states
	const { order_info } = order;
	const user = localStorage.user ? JSON.parse(localStorage.user) : '';
	const full_name = user && `${user.name.first_name} ${user.name.last_name}`;

	return (
		<div className='order-items'>
			{order_info.map((item, index) => (
				<div className='order-item' key={index}>
					<div className='img-item'>
						<img src={item.product.imageUrl} alt='prduct figure' />
						<h3>{item.product.title}</h3>
					</div>
					<div className='price'>$ {item.product.price * item.quantity}</div>
					<div className='delete' onClick={() => removeProductFromOrder(item.product._id)}>
						<span title='remove product from this order'>Remove</span>
					</div>
					<div className='quantity'>
						<span>{item.quantity}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderDetails;
