/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {OrdersContext} from '../../Context/OrdersProvider';
import NoOrders from '../../pages/Orders/NoOrders';
import Loading from '../Loading/Loading';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsArrowRightShort} from 'react-icons/bs';
import OrderDetails from '../../pages/Orders/OrderDetails';
import SuccessMsg from '../SuccessMsg/SuccessMsg';

const AllOrders = () => {
	//context
	const {
		getAllOrders,
		orders,
		loading,
		setLoading,
		showDropDiv,
		alertDeleteOrder,
		setAlertDeleteOrder,
		ignore,
	} = useContext(OrdersContext);
	const {removeOrder} = useContext(OrdersContext);
	console.log(orders);

	useEffect(() => {
		getAllOrders();
	}, [ignore]);

	return (
		<React.Fragment>
			<div className='orders container'>
				{orders.length ? (
					<React.Fragment>
						<div className='heading'>
							<div className='head-item'>Customer</div>
							<div className='head-item'>Total</div>
							<div className='head-item more'>More</div>
							<div className='head-item delete'>Delete</div>
						</div>

						{orders.map(order => (
							<div className='order-information' key={order._id}>
								<div className='main-order'>
									<div className='image'>
										<img src={order['user']['user_image']} alt='' />
										<div className='user-name'>{`${order['user']['name']['first_name']} ${order['user']['name']['last_name']}`}</div>
									</div>
									<div className='price'>
										$ {order.order_info.reduce((a, item) => a + item.product.price * item.quantity, 0)}
									</div>
									<div className='delete' onClick={() => removeOrder(order._id)}>
										<AiOutlineDelete />
									</div>
									<div data-id={order._id} className={`show-more`} onClick={e => showDropDiv(order._id)}>
										<BsArrowRightShort />
									</div>
								</div>

								<div data-id={order._id} className={`order-details`}>
									<OrderDetails order={order} />
								</div>
							</div>
						))}
					</React.Fragment>
				) : (
					<>{!loading && <NoOrders />}</>
				)}
			</div>

			{/* for Loading ! */}
			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg open={alertDeleteOrder} setOpen={setAlertDeleteOrder} msg={'Deleted Success !'} />
			{/*  */}
		</React.Fragment>
	);
};

export default AllOrders;
