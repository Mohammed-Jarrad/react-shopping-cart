import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Stars from '../../components/SingleProductReviews/Stars';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import { CartContext } from '../../Context/CartProvider';
import { HomeContext } from '../../Context/HomeProvider';
import { UserContext } from '../../Context/UserProvider';

const ProductBoxInfo = ({ setShowCustomise }) => {
	// context
	const { user } = useContext(UserContext);
	const { addToCart } = useContext(CartContext);
	const { product, discountPrice, finalPrice, getAverageRating, getProductRatings } = useContext(HomeContext);
	// states
	const [alertAdded, setAlertAdded] = useState(false);

	// handle click add to cart
	const handleClickAddToCart = _ => {
		if (product.sizes.length || product.colors.length) {
			setShowCustomise(true);
		} else {
			addToCart(product, '', '');
			setAlertAdded(true);
		}
	};

	return (
		<div className="product-information">
			<p className="desc">
				<span>
					{product.desc.split('\n').map((item, i) => (
						<span style={{ display: 'block' }} key={i}>
							{item}
						</span>
					))}
				</span>
			</p>

			<div className="product-info-box">
				<div className="ratings">
					Rate
					<span>
						{[...getProductRatings(product)].length ? (
							<Stars value={getAverageRating(product).rate} />
						) : (
							'No Rate Yet !'
						)}
					</span>
				</div>

				{discountPrice(product) !== product.price ? (
					<>
						<div className="discount-desc">
							Discount
							<span>{`${product.discount}%`}</span>
						</div>
						<div className="price">Price {finalPrice(product)}</div>
					</>
				) : (
					<div className="price">
						Price
						<span>{finalPrice(product)}</span>
					</div>
				)}

				<div className="category">
					Category
					<span>{product.category}</span>
				</div>

				<>
					{product.sizes.length ? (
						<div className="sizes">
							Sizes
							<div className="items">
								{product.sizes.map((size, i) => (
									<span key={i}>{size}</span>
								))}
							</div>
						</div>
					) : null}
				</>

				<>
					{product.colors.length ? (
						<div className="colors">
							Colors
							<div className="items">
								{product.colors
									? product.colors.map((color, i) => (
											<span style={{ backgroundColor: `${color}` }} key={i}></span>
									  ))
									: null}
							</div>
						</div>
					) : null}
				</>
			</div>

			<>
				{user ? (
					<div className="modal-options">
						<button className="add" onClick={_ => handleClickAddToCart()}>
							Add To Cart
						</button>
					</div>
				) : (
					<div className="login-msg">
						Please <Link to={'/login'}>Login</Link> to Add Your Product to Cart!
					</div>
				)}
			</>

			<SuccessMsg msg={'Done !'} open={alertAdded} setOpen={setAlertAdded} />
		</div>
	);
};

export default ProductBoxInfo;
