import React, {useContext} from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import {VscAdd} from 'react-icons/vsc';
import {HomeContext} from '../../Context/HomeProvider';
import NoProducts from './NoProducts';
import {Link, useNavigate} from 'react-router-dom';

const Products = ({openProductModal, openCustomiseModal}) => {
	// context
	const {products, loading} = useContext(HomeContext);
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
								<Link to={`/product/${product._id}`}>
									<img alt='product figure' src={product.imageUrl} />
								</Link>

								<div className='product-desc'>
									<div>{product.title}</div>
									<p>
										{`${product.price}$`}
										<span onClick={() => navigate(`/product/${product._id}`)}>
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
