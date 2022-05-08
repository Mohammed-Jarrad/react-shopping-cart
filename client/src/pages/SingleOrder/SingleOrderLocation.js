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
				<div className="user-info">
					<span>{`${order.user.name.first_name} ${order.user.name.last_name}`} </span>
					<span>{order.user.email}</span>
				</div>
			</div>

			<div className="order-shipping">
				<div className="icon">
					<MdLocalShipping />
				</div>
				<div className="shipping">
					<span>Shipping: {order.location.country}</span>
					<span>Pay Method: upon receipt</span>
				</div>
			</div>

			<div className="deliver-to">
				<div className="icon">
					<HiLocationMarker />
				</div>
				<div className="address">
					<span>City: {order.location.city}</span>
					<span>Address: {order.location.address}</span>
				</div>
			</div>
		</div>
	);
};

export default SingleOrderLocation;
