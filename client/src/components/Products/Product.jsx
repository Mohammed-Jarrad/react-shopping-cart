import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeContext } from '../../Context/HomeProvider';
import Stars from '../SingleProductReviews/Stars';
import { VscAdd } from 'react-icons/vsc';
import '../../css/Products/Product.css';

const Product = ({ product }) => {
	const { discountPrice, finalPrice, getProductRatings, getAverageRating } = useContext(HomeContext);

	const navigate = useNavigate();

	const ratings = getProductRatings;

	return (
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
	);
};

export default Product;
