import React, { useContext, useRef, useState } from 'react';
import { Alert } from '@mui/material';
import { HomeContext } from '../../Context/HomeProvider';
import Stars from './Stars';
import { AiOutlineRight } from 'react-icons/ai';
import { PostRequest } from '../../utils/requests';

const ratingsCapitalize = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

const CreateReview = () => {
	// context
	const { product, forceUpdate } = useContext(HomeContext);
	// ref
	const commentRef = useRef();
	// states
	const [rating, setRating] = useState('');
	const [comment, setComment] = useState('');
	const [showRating, setShowRating] = useState(false);
	const [errorReview, setErrorReview] = useState({});

	// handle change rating
	const handleChangeRating = val => {
		setRating(val);
		setShowRating(!showRating);
		setErrorReview(prev => ({ ...prev, rating: null }));
	};

	// change Comment
	const handleChangeComment = e => {
		setComment(e.target.value);
		setErrorReview(prev => ({ ...prev, comment: null }));
	};

	//createReview
	const createReview = async e => {
		e.preventDefault();
		const review = {
			product: product._id,
			comment: comment,
			rating: rating,
		};

		try {
			const res = await PostRequest('/review', JSON.stringify(review));
			const data = await res.json();
			if (data.review) {
				forceUpdate();
				setRating('');
				commentRef.current.value = '';
			} else {
				setErrorReview(data.errors);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="create-review">
			<form onSubmit={createReview}>
				<div className="rating">
					<div className="title">Rating</div>

					<Stars value={rating} />

					<div className="drop-menu">
						<p className="select" onClick={_ => setShowRating(!showRating)}>
							{rating.length ? rating : 'Select...'}
							<span>
								<AiOutlineRight className={showRating && 'rotate'} />
							</span>
						</p>

						<div className={`menu-content ${showRating && 'show'}`}>
							{ratingsCapitalize.map((item, i) => (
								<p key={i} className={'option'} onClick={_ => handleChangeRating(item.toLowerCase())}>
									<AiOutlineRight /> {item}
								</p>
							))}
						</div>
					</div>
				</div>

				<div className="comment">
					<div className="title">Comment</div>
					<textarea
						ref={commentRef}
						defaultValue={''}
						placeholder="Comment..."
						onChange={handleChangeComment}
					/>
				</div>
				{errorReview.comment || errorReview.rating ? (
					<Alert severity="error">
						<p>{errorReview.comment && errorReview.comment}</p>
						<p>{errorReview.rating && errorReview.rating}</p>
					</Alert>
				) : null}

				<button className="submit">SUBMIT</button>
			</form>
		</div>
	);
};

export default CreateReview;
