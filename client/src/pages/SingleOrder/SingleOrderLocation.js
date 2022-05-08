import React from "react";
import {BsFillPersonFill} from "react-icons/bs";
import {MdLocalShipping} from "react-icons/md";
import {HiLocationMarker} from "react-icons/hi";

const SingleOrderLocation = ({order}) => {
	return (
		<div className="location-info">
			<div className="customer">
				<div className="icon">
					<BsFillPersonFill />
				</div>
				<h4>Customer</h4>
				<div className="customer-info">
					<span>{`${order.user.name.first_name} ${order.user.name.last_name}`} </span>
					<span>{order.user.email}</span>
					<span>{order.user.phone}</span>
				</div>
			</div>

			<div className="shipping">
				<div className="icon">
					<MdLocalShipping />
				</div>
				<h4>Shipping</h4>
				<div className="shipping-info">
					<span>
						<strong>Shipping:</strong> {order.location.country}
					</span>
					<span>
						<strong>Pay Method: upon receipt</strong>
					</span>
				</div>
			</div>

			<div className="address">
				<div className="icon">
					<HiLocationMarker />
				</div>
				<h4>Deliver To</h4>
				<div className="address-info">
					<span>
						<strong>City:</strong> {order.location.city}
					</span>
					<span>
						<strong>Address:</strong> {order.location.address}
					</span>
				</div>
			</div>
		</div>
	);
};

export default SingleOrderLocation;
