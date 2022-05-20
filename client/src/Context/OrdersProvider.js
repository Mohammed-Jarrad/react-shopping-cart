/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useLayoutEffect, useReducer, useState } from 'react';
import mainMethods from '../utils/mainMethods';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserProvider';

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
	//context
	const { token } = useContext(UserContext);
	// states
	const [orders, setOrders] = useState([]);
	const [ordersForUser, setOrdersForUser] = useState([]);
	const [order, setOrder] = useState({});
	const [alertDeleteOrder, setAlertDeleteOrder] = useState(false);
	const [loading, setLoading] = useState(false);
	const [ignore, forceUpdateOrders] = useReducer(x => x + 1, 0);
	// nav
	const navigate = useNavigate();

	// get single order
	const getOrder = async id => {
		setLoading(true);
		try {
			const data = await mainMethods.getOrder(id);
			if (data.order) {
				setOrder(data.order);
				setLoading(false);
			} else {
				console.log(data.errors);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	useLayoutEffect(() => {
		if (token) {
			getOrdersForUser();
			console.log('From Orders Provider...');
		}
	}, [ignore, token]);

	//get orders for user
	const getOrdersForUser = async _ => {
		setLoading(true);
		try {
			const data = await mainMethods.getOrdersForUser();
			if (data.orders) {
				setOrdersForUser(data.orders);
				setLoading(false);
			} else {
				console.log(data);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	// get all orders
	const getAllOrders = async _ => {
		setLoading(true);
		try {
			const data = await mainMethods.getOrders();
			if (data.orders) {
				setOrders(data.orders);
				setLoading(false);
			} else {
				console.log(data.errors);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	// remove order
	async function removeOrder(product_id) {
		try {
			const res = await mainMethods.deleteOrder(product_id);
			if (res.status === 202) {
				setAlertDeleteOrder(true);
				forceUpdateOrders();
			}
		} catch (err) {
			console.log(err);
		}
	}

	//remove product from order
	async function removeProductFromOrder(product_id, color, size) {
		setLoading(true);
		try {
			const data = await mainMethods.deleteProductFromOrder(product_id, color, size);
			console.log('data: ', data);
			if ([...data.order.order_info].length) {
				forceUpdateOrders();
				setLoading(false);
			} else if (data.errors) {
				console.log(data);
				setLoading(false);
			} else if ([...data.order.order_info].length === 0) {
				forceUpdateOrders();
				navigate(`/orders`);
				console.log('done');
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	return (
		<OrdersContext.Provider
			value={{
				ordersForUser,
				setOrdersForUser,
				alertDeleteOrder,
				setAlertDeleteOrder,
				loading,
				setLoading,
				ignore,
				forceUpdateOrders,
				getOrdersForUser,
				removeOrder,
				removeProductFromOrder,
				getAllOrders,
				orders,
				setOrders,
				order,
				setOrder,
				getOrder,
			}}
		>
			{children}
		</OrdersContext.Provider>
	);
};

export default OrdersProvider;
