import React, { useContext } from 'react';
import '../../css/Products/Products.css';
import Fade from 'react-reveal/Fade';
import { HomeContext } from '../../Context/HomeProvider';
import NoProducts from './NoProducts';
import Product from './Product';

const Products = ({ products }) => {
	// context
	const { loading } = useContext(HomeContext).config;

	return (
		<React.Fragment>
			<Fade cascade>
				{[...products].length ? (
					<div className="products-wrapper">
						{[...products].map((product, i) => (
							<Product key={i} product={product} />
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
