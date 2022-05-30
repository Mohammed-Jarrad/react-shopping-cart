import React, { useContext } from 'react';
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
import { breakPoints } from './TopRating';
import { BiGift } from 'react-icons/bi';
import Product from '../../components/Products/Product';

const BigDiscount = () => {
	//context
	const { bigDiscountProducts, discountPrice, finalPrice, getProductRatings, getAverageRating } =
		useContext(HomeContext);
	//

	const navigate = useNavigate();

	return (
		<div className="discount-products">
			<h1 className="title">
				<BiGift /> Big Discounts
			</h1>

			<Swiper
				breakpoints={breakPoints}
				className="swiper"
				modules={[Navigation, Pagination]}
				spaceBetween={10}
				slidesPerView={'auto'}
				navigation
				pagination={{ clickable: true }}
			>
				{[...bigDiscountProducts].length ? (
					<div>
						{[...bigDiscountProducts].map((product, i) => {
							return (
								<SwiperSlide key={i} className="slide" style={{ width: '300px' }}>
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

export default BigDiscount;
