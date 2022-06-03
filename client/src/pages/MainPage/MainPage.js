/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import '../../css/MainPage/MainPage.css';
import MainHeader from './MainHeader';
import TopRating from './TopRating';
import BigDiscount from './BigDiscount';
import Categories from './Categories';
import Loading from '../../components/Loading/Loading';
import { HomeContext } from '../../Context/HomeProvider';

const MainPage = () => {
	// context
	const { loading } = useContext(HomeContext).config;

	return (
		<>
			<div className="main-page">
				<MainHeader />
				<Categories />
				<TopRating />
				<BigDiscount />
			</div>

			<Loading open={loading} />
		</>
	);
};

export default MainPage;
