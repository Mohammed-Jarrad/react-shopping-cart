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
									<div className="product-item" key={product._id}>
										{discountPrice(product) !== product.price && (
											<span className="product-discount">{`${product.discount}% off`}</span>
										)}

										<Link to={`/product/${product._id}`}>
											<img alt="product figure" src={product.imageUrl} />
										</Link>

										<div className="product-desc">
											<div className="title">{product.title}</div>

											{[...getProductRatings(product)].length ? (
												<div className="rating">
													<Stars value={getAverageRating(product).rate} />
													<span>({[...product.reviews].length})</span>
												</div>
											) : null}

											<p className="price-add">
												{finalPrice(product)}
												<span className="add" onClick={() => navigate(`/product/${product._id}`)}>
													<VscAdd />
												</span>
											</p>
										</div>
									</div>
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
