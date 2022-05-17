/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import '../../css/SingleProduct/SingleProduct.css';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { HomeContext } from '../../Context/HomeProvider';
import CustomiseProduct from '../../components/CustomiseProduct/CustomiseProduct';
import ProductBoxInfo from './ProductBoxInfo';
import ErrorPage from '../../components/ErrorPage/ErrorPage';
import SingleProductStatus from './SingleProductStatus';
import SingleProductReviews from '../../components/SingleProductReviews/SingleProductReviews';

const SingleProduct = () => {
	//context
	const { getProduct, product, ignore } = useContext(HomeContext);
	const { loading, setLoading } = useContext(HomeContext).config;
	// variables
	const product_id = useParams().id;
	//states
	const [showCustomise, setShowCustomise] = useState(false);
	//
	useLayoutEffect(() => {
		getProduct(product_id);
		console.log('Getting from Single Product....');
	}, [ignore]);

	return (
		<React.Fragment>
			{product._id === product_id ? (
				<div className="single-product container">
					<h2 className="title">{product.title}</h2>
					<div className="main-content">
						<div className="image">
							<img src={product.imageUrl} alt="product figure" />
						</div>
						<ProductBoxInfo setShowCustomise={setShowCustomise} />
					</div>

					<SingleProductStatus />

					{showCustomise ? <CustomiseProduct /> : null}

					<SingleProductReviews />
				</div>
			) : (
				<>{!loading && <ErrorPage />}</>
			)}

			<Loading open={loading} setOpen={setLoading} />
		</React.Fragment>
	);
};

export default SingleProduct;
