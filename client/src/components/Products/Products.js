import React from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import { NavLink } from 'react-router-dom';
import { VscAdd } from 'react-icons/vsc';
import Loading from '../Loading/Loading';

const Products = ({ openProductModal, products, openCustomiseModal, loading }) => (
	<React.Fragment>
		<Fade cascade>
			{typeof products === 'object' && products.length ? (
				<div className='products-wrapper'>
					{products.map(product => (
						<div className='product-item' key={product._id}>
							<img onClick={() => openProductModal(product)} alt='product figure' src={product.imageUrl} />

							<div className='product-desc'>
								<div>{product.title}</div>
								<p>
									{`${product.price}$`}
									<span
										onClick={() => {
											openCustomiseModal(product);
										}}
									>
										<VscAdd />
									</span>
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<>
					{loading ? null : (
						<>
							<h1 className='no-product-msg'>No Products</h1>
							<NavLink to='/create-product'>create new product</NavLink>
						</>
					)}
				</>
			)}
		</Fade>
	</React.Fragment>
);

export default Products;
