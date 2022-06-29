/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import '../../css/SingleProduct/SingleProduct.css';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { HomeContext } from '../../Context/HomeProvider';
import CustomiseProduct from '../../components/CustomiseProduct/CustomiseProduct';
import ProductBoxInfo from './ProductBoxInfo';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import SingleProductStatus from './SingleProductStatus';
import SingleProductReviews from '../../components/SingleProductReviews/SingleProductReviews';
import Products from '../../components/Products/Products';

const SingleProduct = () => {
	//context
	const { getProduct, product, ignore, relatedProducts, setRelatedProducts, products } =
		useContext(HomeContext);
	const { loading, setLoading } = useContext(HomeContext).config;
	// variables
	const product_id = useParams().id;
	console.log(product_id);
	//
	//states
	const [showCustomise, setShowCustomise] = useState(false);
	//
	useLayoutEffect(() => {
		getProduct(product_id);

		console.log('From Single Product....');
	}, [ignore, product_id]);

	useEffect(() => {
		setRelatedProducts(products.filter(p => p.category === product.category && p._id !== product_id));
	}, [product]);

	useEffect(() => {
		console.log('related: ', relatedProducts);
	}, [relatedProducts]);

	return (
		<>
			{product._id === product_id ? (
				<div className="single-product container">
					<h2 className="title">{product?.title}</h2>
					<div className="main-content">
						<div className="image">
							<img src={product?.imageUrl} alt="product figure" />
						</div>
						<ProductBoxInfo setShowCustomise={setShowCustomise} />
					</div>
					{showCustomise ? <CustomiseProduct /> : null}
					<SingleProductStatus />
					{[...relatedProducts].length && (
						<div className="related-items">
							<h2>Related Products: </h2>
							<Products products={relatedProducts} />
						</div>
					)}
					<SingleProductReviews />
				</div>
			) : (
				<>{!loading && <ErrorPage />}</>
			)}

			<Loading open={loading} setLoading={setLoading} />
		</>
	);
};

export default SingleProduct;
