import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../../Context/HomeProvider';
import { BiCategory } from 'react-icons/bi';
import { MdCategory } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
	// context
	const { categories, getCategoryProducts } = useContext(HomeContext);
	// nav
	const navigate = useNavigate();

	return (
		<div className="categories">
			<h1 className="title">
				<BiCategory />
				Categories
			</h1>

			<div className="view-categories">
				{[...categories].map((category, i) => (
					<div
						className="category"
						key={i}
						onClick={() => {
							getCategoryProducts(category);
							navigate(`/category/${category}`);
						}}
					>
						<MdCategory />
						{category}
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories;
