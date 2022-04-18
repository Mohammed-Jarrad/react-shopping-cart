/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import { MdAddShoppingCart } from 'react-icons/md';
import Loading from '../Loading/Loading';
import SuccessMsg from '../SuccessMsg/SuccessMsg';
import { NavLink } from 'react-router-dom';

const Products = ({
	showProduct,
	addToCart,
	products,
	loading,
	setLoading,
	loadingDelete,
	setLoadingDelete,
	alertProductDeleted,
	setAlertProductDeleted,
}) => (
	<React.Fragment>
		<Fade cascade>
			{typeof products === 'object' && products.length ? (
				<div className='products-wrapper'>
					{products.map(product => (
						<div key={product._id} className='product-item'>
							<img onClick={() => showProduct(product)} alt='product figure' src={product.imageUrl} />

							<div className='product-desc'>
								<p>{product.title}</p>
								<p>$ {product.price}</p>
							</div>

							<button onClick={() => addToCart(product)}>
								Add to Cart
								<MdAddShoppingCart size='30px' />
							</button>
						</div>
					))}
				</div>
			) : (
				<>
					<h1 className='no-product-msg'>No Products</h1>
					<NavLink to='/create-product'>create new product</NavLink>
				</>
			)}
		</Fade>
	</React.Fragment>
);

export default Products;
