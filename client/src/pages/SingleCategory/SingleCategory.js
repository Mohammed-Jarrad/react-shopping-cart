import React, { useContext } from 'react';
import Products from '../../components/Products/Products';
import { HomeContext } from '../../Context/HomeProvider';
import { SiCmake } from 'react-icons/si';
import '../../css/SingleCategory/SingleCategory.css';

const SingleCategory = () => {
	// context
	const { SingleCategoryProducts } = useContext(HomeContext);

	return (
		<div className="single-category">
			<div className="container">
				<h1 className="title">
					<SiCmake />
					<span>{[...SingleCategoryProducts][0].category} Products</span>
				</h1>
				<Products products={SingleCategoryProducts} />
			</div>
		</div>
	);
};

export default SingleCategory;
