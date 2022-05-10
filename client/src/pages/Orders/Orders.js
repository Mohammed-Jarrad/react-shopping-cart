/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import "../../css/Orders/Orders.css";
import Loading from "../../components/Loading/Loading";
import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import SuccessMsg from "../../components/SuccessMsg/SuccessMsg";
import OrderDetails from "./OrderDetails";
import { OrdersContext } from "../../Context/OrdersProvider";
import NoOrders from "./NoOrders";
import { useNavigate } from "react-router-dom";
import OrdersFilter from "../../components/OrdersFilter/OrdersFilter";

const Orders = () => {
	// context
	const {
		ordersForUser,
		getOrdersForUser,
		ignore,
		loading,
		setLoading,
		alertDeleteOrder,
		setAlertDeleteOrder,
		removeOrder,
		setOrdersForUser,
	} = useContext(OrdersContext);
	// variables
	const navigate = useNavigate();
	//
	console.log(ordersForUser);
	useEffect(() => {
		getOrdersForUser();
	}, [ignore]);

	return (
		<React.Fragment>
			<div className="orders container">
				<OrdersFilter getOriginalOrders={getOrdersForUser} setOrders={setOrdersForUser} admin={false} />

				{ordersForUser.length ? (
					<React.Fragment>
						<div className="heading">
							<div className="head-item">Order</div>
							<div className="head-item">Total</div>
							<div className="head-item delete">Delete</div>
							<div className="head-item more">More</div>
						</div>

						{ordersForUser.map(order => (
							<div className="order-information" key={order._id}>
								<div className="order">{order.user.name["first_name"]}</div>

								<div className="price">
									$ {order.order_info.reduce((a, item) => a + item.product.price * item.quantity, 0)}
								</div>

								<div className="delete" onClick={() => removeOrder(order._id)}>
									<AiOutlineDelete />
								</div>

								<div className={`show-more`} onClick={e => navigate(`/order/${order._id}`)}>
									<BsArrowRightShort />
								</div>
							</div>
						))}
					</React.Fragment>
				) : (
					<>{loading ? null : <NoOrders />}</>
				)}
			</div>

			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg open={alertDeleteOrder} setOpen={setAlertDeleteOrder} msg={"Deleted Success !"} />
		</React.Fragment>
	);
};

export default Orders;
