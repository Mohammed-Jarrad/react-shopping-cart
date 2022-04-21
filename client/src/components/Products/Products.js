import React from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import { NavLink } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';

const Products = ({ showProduct, products, addToCart }) => (
	<React.Fragment>
		<Fade cascade>
			{typeof products === 'object' && products.length ? (
				<div className='products-wrapper'>
					{products.map(product => (
						<div className='product-item' key={product._id}>
							<img
								onClick={() => showProduct(product)}
								alt='product figure'
								src={product.imageUrl}
							/>

							<div className='product-desc'>
								<div>{product.title}</div>
								<p>
									{`${product.price}$`}
									<span onClick={() => addToCart(product)}>
										<VscAdd />
									</span>
								</p>
							</div>
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
