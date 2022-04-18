import React, {useEffect, useState} from 'react';
import '../../css/Orders/Orders.css';
import Bounce from 'react-reveal/Bounce';
import Loading from '../../components/Loading/Loading';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsFillArrowRightCircleFill} from 'react-icons/bs';
import {DeleteRequest, GetRequest} from '../../utils/requests';
import FormShowMore from './FormShowMore';
import {LinearProgress} from '@mui/material';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';

const Orders = () => {
	// * my states
	const user = JSON.parse(localStorage.user);
	const [ordersForUser, setOrdersForUser] = useState('');
	const [alertDeleteMsg, setAlertDeleteMsg] = useState(false);
	const userName = `${user.name.first_name} ${user.name.last_name}`;
	const [showMoreForm, setShowMoreForm] = useState(false);
	const [order, setOrder] = useState('');
	const [loading, setLoading] = useState(true);
	const [loadingDelete, setLoadingDelete] = useState(false);
	// * get all orders for current user
	useEffect(() => {
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
		getOrdersForUser();
	}, []);
	// * remove order
	async function removeOrder(id) {
		setLoadingDelete(true);
		try {
			const res = await DeleteRequest(`/order/${id}`);
			if (res.status === 202) {
				setLoadingDelete(false);
				const response = await GetRequest('/orders/user');
				const data = await response.json();
				setOrdersForUser(data.orders);
				setAlertDeleteMsg(true);
			}
		} catch (err) {
			console.log(err);
		}
	}
	// * get single order
	async function getOrder(id) {
		try {
			const res = await GetRequest(`/order/${id}`);
			const data = await res.json();
			if (data.order) {
				setOrder(data.order);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='orders container'>
			<Loading open={loading} setOpen={setLoading} />

			{loadingDelete && (
				<LinearProgress style={{position: 'relative', bottom: '2px'}} color='success' />
			)}

			<SuccessMsg
				open={alertDeleteMsg}
				setOpen={setAlertDeleteMsg}
				msg={'Deleted Success !'}
			/>

			{ordersForUser.length ? (
				<React.Fragment>
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>Details</th>
								<th>Price</th>
								<th>Delete</th>
								<th>Show More</th>
							</tr>
						</thead>
						<Bounce bottom cascade>
							<tbody>
								{ordersForUser.map((order, index) => (
									<React.Fragment key={order._id}>
										<tr>
											<td className='number-order'>{index + 1}</td>
											<td className='details'>
												<span>
													{order.order_info &&
														order.order_info.map((product) => (
															<div key={product._id}>
																<p>{product.product.title}</p>
																<p>[{product.quantity}]</p>
															</div>
														))}
												</span>
											</td>
											<td className='price'>
												$
												{order.order_info.reduce(
													(acc, product) =>
														acc + product.product.price * product.quantity,
													0,
												)}
											</td>
											<td className='delete-order'>
												<button onClick={() => removeOrder(order._id)}>
													<AiOutlineDelete />
												</button>
											</td>
											<td className='show-more-order'>
												<button
													onClick={() => {
														setShowMoreForm(true);
														getOrder(order._id);
													}}>
													<BsFillArrowRightCircleFill />
												</button>
											</td>
										</tr>
									</React.Fragment>
								))}
							</tbody>
						</Bounce>
					</table>

					<FormShowMore
						showMoreForm={showMoreForm}
						setShowMoreForm={setShowMoreForm}
						order={order}
						removeOrder={removeOrder}
					/>
				</React.Fragment>
			) : (
				<div>
					<h1 className='no-orders-msg'>No orders to {userName}.</h1>
				</div>
			)}
		</div>
	);
};

export default Orders;
