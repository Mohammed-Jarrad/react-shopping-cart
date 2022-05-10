import React, { useEffect, useState } from 'react';
import { AiFillStar as FillStar, AiOutlineStar as EmptyStar } from 'react-icons/ai';

const Stars = ({ value }) => {
	//states
	const [fill, setFill] = useState(0);
	const [empty, setEmpty] = useState(0);
	//view stars
	const viewStars = value => {
		if (value === 'poor') {
			setFill(1);
			setEmpty(4);
		} else if (value === 'fair') {
			setFill(2);
			setEmpty(3);
		} else if (value === 'good') {
			setFill(3);
			setEmpty(2);
		} else if (value === 'very good') {
			setFill(4);
			setEmpty(1);
		} else if (value === 'excellent') {
			setFill(5);
			setEmpty(0);
		} else {
			setFill(0);
			setEmpty(0);
		}
	};

	useEffect(() => {
		viewStars(value);
	}, [value]);

	return (
		<ul className="stars">
			{[...Array(fill)].map((item, i) => (
				<li key={i}>
					<FillStar className="fill-star" />
				</li>
			))}
			{[...Array(empty)].map((item, i) => (
				<li key={i}>
					<EmptyStar className="empty-star" />
				</li>
			))}
		</ul>
	);
};

export default Stars;
