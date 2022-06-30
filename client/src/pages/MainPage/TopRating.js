import React, { useContext, useState } from 'react';
import Stars from '../../components/SingleProductReviews/Stars';
import { VscAdd } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { HomeContext } from '../../Context/HomeProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { MdOutlineStarRate } from 'react-icons/md';
import Product from '../../components/Products/Product';

// break points
export const breakPoints = {
	1: { slidesPerView: 1 },
	650: { slidesPerView: 2 },
	870: { slidesPerView: 3 },
	1070: { slidesPerView: 4 },
};

const TopRating = () => {
	//context
	const { topRating, discountPrice, finalPrice, getProductRatings, getAverageRating } =
		useContext(HomeContext);
	// nav
	const navigate = useNavigate();

	return (
		<div className="top-rating">
			<h1 className="title">
				<MdOutlineStarRate /> Top Rating
			</h1>

			<Swiper
				breakpoints={breakPoints}
				className="swiper"
				modules={[Navigation, Pagination]}
				spaceBetween={10}
				navigation
				pagination={{ clickable: true }}
			>
				{[...topRating].length ? (
					<div>
						{[...topRating]
							.sort((a, b) => (getAverageRating(a).value < getAverageRating(b).value ? 1 : -1))
							.map((product, i) => {
								return (
									<SwiperSlide key={i} className="slide">
										<Product product={product} />
									</SwiperSlide>
								);
							})}
					</div>
				) : null}
			</Swiper>
		</div>
	);
};

export default TopRating;
