import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserProvider';
import '../../css/SingleProductReviews/SingleProductReviews.css';
import CreateReview from './CreateReview';
import ViewReviews from './ViewReviews';

const SingleProductReviews = () => {
	const { token } = useContext(UserContext);
	return (
		<div className="reviews">
			{token ? (
				<>
					<ViewReviews />
					<CreateReview />
				</>
			) : (
				<div className="login-msg">
					Please <Link to="/login">Login</Link> to Add Your Comment And Rating!
				</div>
			)}
		</div>
	);
};

export default SingleProductReviews;
