/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../Context/HomeProvider';
import { UserContext } from '../../Context/UserProvider';
import { DeleteRequest, GetRequest } from '../../utils/requests';
import Stars from './Stars';
import { MdDelete } from 'react-icons/md';
import { CircularProgress } from '@mui/material';

const ViewReviews = () => {
	// context
	const { product, ignore } = useContext(HomeContext);
	const { user, admin } = useContext(UserContext);
	// states
	const [reviewsForProduct, setReviewsForProduct] = useState([]);
	const [reviewDeleted, setReviewDeleted] = useState('');

	// get reviews for product
	const getReviewsForProduct = async id => {
		try {
			const res = await GetRequest(`/reviews/${id}`);
			const data = await res.json();
			console.log(data);
			if (data.reviews) {
				setReviewsForProduct(data.reviews);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// delete review
	const deleteReview = async id => {
		setReviewDeleted(_ => id);
		try {
			const res = await DeleteRequest(`/review/${id}`);
			if (res.status === 202) {
				setReviewDeleted('');
				getReviewsForProduct(product._id);
			} else {
				setReviewDeleted('');
			}
		} catch (error) {
			console.log(error);
			setReviewDeleted('');
		}
	};

	//
	useEffect(() => {
		getReviewsForProduct(product._id);
	}, [ignore]);

	return (
		<div className="view-reviews">
			{reviewsForProduct.length ? (
				<>
					{reviewsForProduct.map((item, i) => (
						<div className="review" key={i}>
							{(item.user._id === user._id || admin) && (
								<div className="delete" onClick={() => deleteReview(item._id)}>
									<MdDelete />
								</div>
							)}

							<div className="user-info">
								<img src={item.user.user_image} alt="" width={50} height={50} />
								<div className="name">{`${item.user.name.first_name} ${item.user.name.last_name}`}</div>
								{item._id === reviewDeleted ? <CircularProgress color="error" /> : null}
							</div>

							<div className="date">{item.date.split('T')[0]}</div>

							<div className="rating">
								<Stars value={item.rating} />
							</div>

							<div className="comment">
								{item.comment.split('\n').map((msg, i) => (
									<p key={i}>{msg}</p>
								))}
							</div>
						</div>
					))}
				</>
			) : (
				<h2 className="no-reviews-msg">No Reviews Yet !</h2>
			)}
		</div>
	);
};

export default ViewReviews;
