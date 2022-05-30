/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { filterContext } from '../../Context/FilterProvider';
import { OrdersContext } from '../../Context/OrdersProvider';
import '../../css/OrdersFilter/OrdersFilter.css';
import { PostRequest } from '../../utils/requests';
import Loading from '../Loading/Loading';

export const ordersStatus = ['All', 'Pending', 'Cancelled', 'Delivered'];

const OrdersFilter = ({ getOriginalOrders, setOrders, admin }) => {
	// context
	const { loading, setLoading, setFilterState, filterState } = useContext(OrdersContext);
	const { setActive } = useContext(filterContext);
	//variables
	const url = admin ? '/orders/status' : '/orders/user/status';

	const filterOrders = async e => {
		setActive(e);
		const status = e.target.textContent;
		setFilterState(status);

		if (status === 'All') {
			getOriginalOrders();
		} else {
			setLoading(true);
			try {
				const data = await (await PostRequest(url, JSON.stringify({ status }))).json();
				if (data.orders) {
					setOrders(data.orders);
					setLoading(false);
				} else {
					setOrders([]);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	};

	const setActiveClass = item => {
		if (filterState === '' && item === 'All') {
			return 'active';
		} else if (item === filterState) {
			return 'active';
		}
	};

	return (
		<>
			<div className="orders-filter">
				{ordersStatus.map((item, i) => {
					return (
						<div className={` p-96 item ${item} ${setActiveClass(item)}`} key={i} onClick={filterOrders}>
							{item}
						</div>
					);
				})}
			</div>

			<Loading open={loading} />
		</>
	);
};

export default OrdersFilter;
