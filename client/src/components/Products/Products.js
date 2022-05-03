import React, {useContext} from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import {VscAdd} from 'react-icons/vsc';
import {HomeContext} from '../../Context/HomeProvider';
import NoProducts from './NoProducts';

const Products = ({openProductModal, openCustomiseModal}) => {
	// context
	const {products, loading} = useContext(HomeContext);
	console.log(products);

	return (
		<React.Fragment>
			<Fade cascade>
				{products.length ? (
					<div className='products-wrapper'>
						{products.map(product => (
							<div className='product-item' key={product._id}>
								<img onClick={() => openProductModal(product)} alt='product figure' src={product.imageUrl} />

								<div className='product-desc'>
									<div>{product.title}</div>
									<p>
										{`${product.price}$`}
										<span onClick={() => openCustomiseModal(product)}>
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
