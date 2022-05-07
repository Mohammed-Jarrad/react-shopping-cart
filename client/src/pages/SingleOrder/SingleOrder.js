/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {OrdersContext} from "../../Context/OrdersProvider";
import "../../css/singleOrder/singleOrder.css";
import SingleOrderLocation from "./SingleOrderLocation";
import SingleOrderProducts from "./SingleOrderProducts";
import SingleOrderTotalBox from "./SingleOrderTotalBox";

const SingleOrder = () => {
	// context
	const {getOrder, order, ignore} = useContext(OrdersContext);
	// variables
	const order_id = useParams().id;
	//
	useEffect(() => {
		getOrder(order_id);
	}, [ignore]);

	return (
		<>
			{order._id === order_id ? (
				<div className="single-order container">
					<SingleOrderLocation order={order} />
					<div className="main-content">
						<SingleOrderProducts order={order} />
						<SingleOrderTotalBox order={order} />
					</div>
				</div>
			) : (
				<Loading open={true} />
			)}
		</>
	);
};

export default SingleOrder;
