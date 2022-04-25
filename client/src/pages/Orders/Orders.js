import React, { Fragment, useEffect, useReducer, useState } from 'react';
import '../../css/Orders/Orders.css';
import Loading from '../../components/Loading/Loading';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { DeleteRequest, GetRequest, PutRequest } from '../../utils/requests';
import { LinearProgress } from '@mui/material';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import OrderDetails from './OrderDetails';

const Orders = () => {
	// my states
	const user = JSON.parse(localStorage.user);
	const [ordersForUser, setOrdersForUser] = useState([]);
	const [alertDeleteMsg, setAlertDeleteMsg] = useState(false);
	const userName = `${user.name.first_name} ${user.name.last_name}`;
	const [loading, setLoading] = useState(true);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

	//  get all orders for current user
	async function getOrdersForUser() {
		try {
			const res = await GetRequest('/orders/user');
			const data = await res.json();
			console.log('res ordersForUser:', res);
			console.log('data ordersForUser: ', data);
			if (data.orders) {
				setOrdersForUser(data.orders);
				setLoading(false);
			} else {
				console.log(data.errors);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	useEffect(() => {
		getOrdersForUser();
	}, [ignore]);

	// remove order
	async function removeOrder(product_id) {
		setLoadingDelete(true);
		try {
			const res = await DeleteRequest(`/order/${product_id}`);
			if (res.status === 202) {
				setLoadingDelete(false);
				setAlertDeleteMsg(true);
				forceUpdate();
			}
		} catch (err) {
			console.log(err);
		}
	}

	//remove product from order
	async function removeProductFromOrder(product_id, color, size) {
		setLoadingDelete(true);
		try {
			const customise = { color, size };
			const res = await PutRequest(`/order/remove-product/${product_id}`, JSON.stringify(customise));
			const data = await res.json();
			if (data.order) {
				// delete All empty orders
				console.log('data', data);
				await DeleteRequest(`/orders/remove-empty-orders`);
				forceUpdate();
				setLoadingDelete(false);
			} else {
				console.log(data.errors);
				setLoadingDelete(false);
			}
		} catch (error) {
			console.log(error);
			setLoadingDelete(false);
		}
	}

	// (add class -show- to the clicked div and height to transition the height from 0 to auto)
	const showDropDiv = id => {
		const ordersDetails = document.getElementsByClassName('order-details');
		const mainOrders = document.getElementsByClassName('main-order');
		let show_more_button;
		let target;
		Object.values(mainOrders).forEach(
			// select the show more btn
			mainOrder =>
				mainOrder.children[3].getAttribute('data-id') === id && (show_more_button = mainOrder.children[3]),
		);
		Object.values(ordersDetails).forEach(
			// select my box details what i need it
			div => div.getAttribute('data-id') === id && (target = div),
		);
		if (target.classList.contains('show')) {
			// check if the current box details is open or not
			target.classList.remove('show');
			target.style.height = '0px';
			show_more_button.classList.remove('edit-arrow');
		} else {
			// remove show class from all elements
			Object.values(ordersDetails).forEach(div => {
				if (div.classList.contains('show')) {
					div.classList.remove('show');
					div.style.height = '0px';
				}
			}); // remove edit-arrow class from all show more buttons
			Object.values(mainOrders).forEach(mainOrder => mainOrder.children[3].classList.remove('edit-arrow')); // set the show class to current box details and set the edit-arrow to the current show more button
			target.classList.add('show');
			target.style.height = target.scrollHeight + 'px';
			show_more_button.classList.add('edit-arrow');
		}
	};

	return (
		<div className='orders container'>
			<Loading open={loading} setOpen={setLoading} />

			{loadingDelete && <LinearProgress style={{ position: 'relative', bottom: '2px' }} color='success' />}

			<SuccessMsg open={alertDeleteMsg} setOpen={setAlertDeleteMsg} msg={'Deleted Success !'} />

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
								<OrderDetails
									removeProductFromOrder={removeProductFromOrder}
									order={order}
									removeOrder={removeOrder}
								/>
							</div>
						</div>
					))}
				</React.Fragment>
			) : (
				<>
					{loading ? null : (
						<div>
							<h1 className='no-orders-msg'>No orders to {userName}.</h1>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Orders;
