import React, {createContext, useReducer, useState} from "react";
import mainMethods from "../utils/mainMethods";

export const OrdersContext = createContext();

const OrdersProvider = ({children}) => {
	// states
	const [orders, setOrders] = useState([]);
	const [ordersForUser, setOrdersForUser] = useState([]);
	const [order, setOrder] = useState({});
	const [alertDeleteOrder, setAlertDeleteOrder] = useState(false);
	const [loading, setLoading] = useState(false);
	const [ignore, forceUpdate] = useReducer(x => x + 1, 0);

	// get single order
	const getOrder = async id => {
		try {
			const data = await mainMethods.getOrder(id);
			data.order && setOrder(data.order);
		} catch (error) {
			console.log(error);
		}
	};
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
			if (data.order === null || data.order.order_info.length === 0) {
				window.location.assign("/orders");
			}
			if (data.order) {
				await mainMethods.deleteAllOrdersWithoutProducts();
				forceUpdate();
				setLoading(false);
			} else {
				console.log(data);
				setLoading(false);
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
