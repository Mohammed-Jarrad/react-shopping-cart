/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import '../../css/Orders/Orders.css';
import Loading from '../../components/Loading/Loading';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import {LinearProgress} from '@mui/material';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import OrderDetails from './OrderDetails';
import {OrdersContext} from '../../Context/OrdersProvider';
import NoOrders from './NoOrders';

const Orders = () => {
	//! context =>
	const {
		ordersForUser,
		getOrdersForUser,
		ignore,
		loading,
		setLoading,
		loadingDelete,
		alertDeleteOrder,
		setAlertDeleteOrder,
		removeOrder,
		showDropDiv,
	} = useContext(OrdersContext);

	useEffect(() => {
		getOrdersForUser();
	}, [ignore]);

	return (
		<React.Fragment>
			<div className='orders container'>
				<Loading open={loading} setOpen={setLoading} />

				{loadingDelete && <LinearProgress style={{position: 'relative', bottom: '2px'}} color='success' />}

				<SuccessMsg open={alertDeleteOrder} setOpen={setAlertDeleteOrder} msg={'Deleted Success !'} />

				{ordersForUser.length ? (
					<React.Fragment>
						<div className='heading'>
							<div className='head-item'>Created At</div>
							<div className='head-item'>Price</div>
							<div className='head-item delete'>Delete</div>
							<div className='head-item more'>More</div>
						</div>

						{ordersForUser.map(order => (
							<div className='order-information' key={order._id}>
								<div className='main-order'>
									<div className='created-at'>{order.createdAt.split('T')[0]}</div>
									<div className='price'>
										$ {order.order_info.reduce((a, item) => a + item.product.price * item.quantity, 0)}
									</div>
									<div className='delete' onClick={() => removeOrder(order._id)}>
										<AiOutlineDelete />
									</div>
									<div data-id={order._id} className={`show-more`} onClick={e => showDropDiv(order._id)}>
										<BsFillArrowRightCircleFill />
									</div>
								</div>

								<div data-id={order._id} className={`order-details`}>
									<OrderDetails order={order} />
								</div>
							</div>
						))}
					</React.Fragment>
				) : (
					<>{loading ? null : <NoOrders />}</>
				)}
			</div>
		</React.Fragment>
	);
};

export default Orders;
