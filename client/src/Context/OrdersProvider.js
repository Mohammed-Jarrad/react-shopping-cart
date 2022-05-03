import React, {createContext, useReducer, useState} from 'react';
import mainMethods from '../utils/mainMethods';

export const OrdersContext = createContext();

const OrdersProvider = ({children}) => {
	// states
	const [orders, setOrders] = useState([]);
	const [ordersForUser, setOrdersForUser] = useState([]);
	const [alertDeleteOrder, setAlertDeleteOrder] = useState(false);
	const [loading, setLoading] = useState(false);
	const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

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
				forceUpdate();
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
			if (data.order) {
				// delete All empty orders
				await mainMethods.deleteAllOrdersWithoutProducts();
				forceUpdate();
				setLoading(false);
			} else {
				console.log(data.errors);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
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
		<OrdersContext.Provider
			value={{
				ordersForUser,
				setOrdersForUser,
				alertDeleteOrder,
				setAlertDeleteOrder,
				loading,
				setLoading,
				ignore,
				getOrdersForUser,
				removeOrder,
				removeProductFromOrder,
				showDropDiv,
				getAllOrders,
				orders,
				setOrders,
			}}
		>
			{children}
		</OrdersContext.Provider>
	);
};

export default OrdersProvider;
