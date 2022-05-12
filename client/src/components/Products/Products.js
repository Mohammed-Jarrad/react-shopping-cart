import React, { useContext, useEffect } from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import { VscAdd } from 'react-icons/vsc';
import { HomeContext } from '../../Context/HomeProvider';
import NoProducts from './NoProducts';
import { Link, useNavigate } from 'react-router-dom';
import Stars from '../SingleProductReviews/Stars';

const Products = () => {
	// context
	const { products, discountPrice, finalPrice, getProductRatings, getAverageRating } =
		useContext(HomeContext);
	const { loading } = useContext(HomeContext).config;
	//
	const navigate = useNavigate();
	const ratings = getProductRatings;

	return (
		<React.Fragment>
			<Fade cascade>
				{products.length ? (
					<div className="products-wrapper">
						{products.map(product => (
							<div className="product-item" key={product._id}>
								{discountPrice(product) !== product.price && (
									<span className="product-discount">{`${product.discount}% off`}</span>
								)}

								<Link to={`/product/${product._id}`}>
									<img alt="product figure" src={product.imageUrl} />
								</Link>

								<div className="product-desc">
									<div className="title">{product.title}</div>

									{[...ratings(product)].length ? (
										<div className="rating">
											<Stars value={getAverageRating(product).rate} />
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
						))}
					</div>
				) : (
					<>{!loading && <NoProducts />}</>
				)}
			</Fade>
		</React.Fragment>
	);
};

export default Products;
