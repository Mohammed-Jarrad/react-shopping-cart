import React, {useContext} from 'react';
import {TiTimes} from 'react-icons/ti';
import {OrdersContext} from '../../Context/OrdersProvider';
import {ImCross} from 'react-icons/im';

const OrderDetails = ({order}) => {
	//context
	const {removeProductFromOrder} = useContext(OrdersContext);
	// states
	const {order_info} = order;

	return (
		<React.Fragment>
			<div className='order-items'>
				{order_info.map((item, index) => (
					<div className='order-item' key={index}>
						<div className='img-item'>
							<img src={item.product.imageUrl} alt='product figure' />
						</div>

						<div className='price'>
							<h3>{item.product.title}</h3>
							<span>
								${item.product.price} <ImCross /> {item.quantity}
							</span>
						</div>

						<div className='delete'>
							<TiTimes
								onClick={() => {
									removeProductFromOrder(item.product._id, item.selected_color, item.selected_size);
								}}
							/>
						</div>

						<div className='size-color'>
							<span style={{background: `${item.selected_color}`}}></span>
							<span>{item.selected_size ? item.selected_size : 'No Size'}</span>
						</div>
					</div>
				))}
				<div className='user-info'>
					<p className='info'>
						<span>Email: </span>
						{`${order.user.email}`}
					</p>
					<p className='info'>
						<span>Location: </span>
						{`${order.user.location.country} - ${order.user.location.city}`}
					</p>
					<p className='info'>
						<span>Phone: </span>
						{`${order.user.phone}`}
					</p>
					<p className='info'>
						<span>CreatedAt: </span>
						{order.createdAt.split('.')[0].replace('T', ', at ')}
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default OrderDetails;
