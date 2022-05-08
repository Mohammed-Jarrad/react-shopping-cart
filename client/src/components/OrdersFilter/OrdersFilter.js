/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { filterContext } from "../../Context/FilterProvider";
import { OrdersContext } from "../../Context/OrdersProvider";
import "../../css/OrdersFilter/OrdersFilter.css";
import { PostRequest } from "../../utils/requests";
import Loading from "../Loading/Loading";

export const ordersStatus = ["All", "Pending", "Cancelled", "Delivered"];

const OrdersFilter = ({ getOriginalOrders, setOrders }) => {
	// context
	const { loading, setLoading } = useContext(OrdersContext);
	const { setActive } = useContext(filterContext);

	const filterOrders = async e => {
		setActive(e);
		const status = e.target.textContent;
		console.log(status);
		if (status === "All") {
			getOriginalOrders();
		} else {
			setLoading(true);
			try {
				const data = await (await PostRequest("/orders/user/status", JSON.stringify({ status }))).json();
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

	return (
		<>
			<div className="orders-filter">
				{ordersStatus.map((item, i) => {
					return (
						<div className={`item ${item} ${item === "All" && "active"}`} key={i} onClick={filterOrders}>
							{item}
						</div>
					);
				})}
			</div>

			<Loading open={loading} setOpen={setLoading} />
		</>
	);
};

export default OrdersFilter;
