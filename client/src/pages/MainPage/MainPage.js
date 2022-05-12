/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import '../../css/MainPage/MainPage.css';
import MainHeader from './MainHeader';
import TopRating from './TopRating';
import BigDiscount from './BigDiscount';
import Categories from './Categories';
import Stars from '../../components/SingleProductReviews/Stars';
import { HomeContext } from '../../Context/HomeProvider';

const MainPage = () => {
	//context
	const { products, topRating, getTopRatingsProducts, get_products_categories_colors_sizes } =
		useContext(HomeContext);
	//
	useEffect(() => {
		getTopRatingsProducts(products);
	}, [products]);

	useEffect(() => {
		console.log(topRating);
	}, [topRating]);

	// states

	return (
		<div className="main-page">
			<MainHeader />
			<TopRating />
			<BigDiscount />
			<Categories />
		</div>
	);
};

export default MainPage;
