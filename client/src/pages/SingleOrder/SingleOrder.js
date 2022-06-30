/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { OrdersContext } from '../../Context/OrdersProvider';
import '../../css/singleOrder/singleOrder.css';
import SingleOrderLocation from './SingleOrderLocation';
import SingleOrderProducts from './SingleOrderProducts';
import SingleOrderTotalBox from './SingleOrderTotalBox';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import SingleOrderStatus from './SingleOrderStatus';
import { UserContext } from '../../Context/UserProvider';

const SingleOrder = () => {
	// context
	const { getOrder, setOrder, order, ignore, loading, setLoading } = useContext(OrdersContext);
	const { admin } = useContext(UserContext);
	// variables
	const order_id = useParams().id;
	//
	useEffect(() => {
		getOrder(order_id);
		console.log('From Single Order...');
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
					{admin && <SingleOrderStatus order={order} />}
				</div>
			) : (
				<>{!loading && <ErrorPage />}</>
			)}

			<Loading open={loading} />
		</>
	);
};

export default SingleOrder;
