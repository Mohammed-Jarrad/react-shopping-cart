import React, {useContext} from "react";
import {HomeContext} from "../../Context/HomeProvider";

const SingleOrderTotalBox = ({order}) => {
	//context
	const {discountPrice} = useContext(HomeContext);
	// variable
	const discountTotal = order.order_info.reduce((acc, item) => {
		return acc + discountPrice(item.product) * item.quantity;
	}, 0);
	const originTotal = order.order_info.reduce((acc, item) => {
		return acc + item.product.price * item.quantity;
	}, 0);
	const tax = 10;

	return (
		<div className="single-order-total-box">
			<div className="price-info">
				<div>
					<span className="title">Created At</span>
					<span>{order.createdAt.split("T")[0]}</span>
				</div>

				<div>
					<span className="title">Original Price</span>
					<span>${originTotal}</span>
				</div>

				{discountTotal !== originTotal && (
					<div>
						<span className="title">After Discount</span>
						<span>${discountTotal}</span>
					</div>
				)}

				<div>
					<span className="title">Tax</span>
					<span>${tax}</span>
				</div>

				<div className="total">
					<span className="title">Total</span>
					<span>${tax + discountTotal}</span>
				</div>
			</div>
		</div>
	);
};

export default SingleOrderTotalBox;
