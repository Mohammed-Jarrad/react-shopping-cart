/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { HomeContext } from '../../Context/HomeProvider';
import { UserContext } from '../../Context/UserProvider';
import Stars from './Stars';
import { MdDelete } from 'react-icons/md';
import { PutRequest } from '../../utils/requests';

const ViewReviews = () => {
	// context
	const { product, forceUpdate } = useContext(HomeContext);
	const { setLoading } = useContext(HomeContext).config;
	const { user, admin } = useContext(UserContext);

	// variales
	const reviews = [...product.reviews];

	// delete review
	const deleteReview = async id => {
		setLoading(true);
		try {
			const res = await PutRequest(`/product/delete/review/${id}`);
			const data = await res.json();
			if (data.product) {
				forceUpdate();
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className="view-reviews">
			{reviews.length ? (
				<>
					{reviews.map((item, i) => (
						<div className="review" key={i}>
							{(item.user._id === user._id || admin) && (
								<div className="delete" onClick={() => deleteReview(item._id)}>
									<MdDelete />
								</div>
							)}

							<div className="user-info">
								<img src={item.user.user_image} alt="" width={50} height={50} />
								<div className="name">{`${item.user['name']['first_name']} ${item.user.name.last_name}`}</div>
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
