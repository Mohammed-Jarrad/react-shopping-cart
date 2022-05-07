import React, {useContext} from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import {VscAdd} from 'react-icons/vsc';
import {HomeContext} from '../../Context/HomeProvider';
import NoProducts from './NoProducts';
import {Link, useNavigate} from 'react-router-dom';

const Products = () => {
	// context
	const {products, discountPrice, finalPrice} = useContext(HomeContext);
	const {loading} = useContext(HomeContext).config;
	console.log(products);
	//
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<Fade cascade>
				{products.length ? (
					<div className='products-wrapper'>
						{products.map(product => (
							<div className='product-item' key={product._id}>
								{discountPrice(product) !== product.price && (
									<span className='product-discount'>{`${product.discount}% off`}</span>
								)}

								<Link to={`/product/${product._id}`}>
									<img alt='product figure' src={product.imageUrl} />
								</Link>

								<div className='product-desc'>
									<div className='title'>{product.title}</div>
									<p className='price-add'>
										{finalPrice(product)}
										<span className='add' onClick={() => navigate(`/product/${product._id}`)}>
											<VscAdd />
										</span>
									</p>
								</div>
							</div>
						))}
					</div>
				) : (
					<>{loading ? null : <NoProducts />}</>
				)}
			</Fade>
		</React.Fragment>
	);
};

export default Products;
