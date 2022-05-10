import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { OrdersContext } from "../../Context/OrdersProvider";
import { PutRequest } from "../../utils/requests";

const SingleOrderStatus = ({ order }) => {
	//variables
	const allStatus = ["Pending", "Cancelled", "Delivered"];
	//context
	const { forceUpdate } = useContext(OrdersContext);

	// states
	const [showChangeStatus, setShowChangeStatus] = useState(false);

	// changeOrderStatus
	const changeOrderStatus = async e => {
		const status = e.target.textContent;
		console.log(status);
		try {
			const res = await PutRequest(`/order/${order._id}`, JSON.stringify({ status }));
			const data = await res.json();
			console.log(data);
			if (data.order) {
				forceUpdate();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="single-order-status">
			<div className={`status`}>
				<div className="info">
					Order Status:
					<span className={` ${order.status}`}> {order.status}</span>
				</div>

				{order.status !== "Delivered" && (
					<div className="change" onClick={_ => setShowChangeStatus(show => !show)}>
						<div className="icon">
							<FaEdit />
						</div>

						<div className={`drop-menu ${showChangeStatus && "show-menu"}`}>
							{allStatus
								.filter(item => item !== order.status)
								.map((item, index) => (
									<div key={index} className={`item`} onClick={changeOrderStatus}>
										{item}
									</div>
								))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SingleOrderStatus;
