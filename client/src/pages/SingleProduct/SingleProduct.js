/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from "react";
import "../../css/SingleProduct/SingleProduct.css";
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import {HomeContext} from "../../Context/HomeProvider";
import CustomiseProduct from "../../components/CustomiseProduct/CustomiseProduct";
import ProductBoxInfo from "./ProductBoxInfo";

const SingleProduct = () => {
	//context
	const {getProduct, product} = useContext(HomeContext);
	// variables
	const product_id = useParams().id;
	//states
	const [showCustomise, setShowCustomise] = useState(false);
	//
	useEffect(() => {
		getProduct(product_id);
	}, []);

	return (
		<React.Fragment>
			{product._id === product_id ? (
				<div className="single-product container">
					<h2 className="title">{product.title}</h2>
					<div className="main-content">
						<div className="image">
							<img src={product.imageUrl} alt="product figure" />
						</div>
						<ProductBoxInfo product={product} setShowCustomise={setShowCustomise} />
					</div>

					{showCustomise ? <CustomiseProduct /> : null}
				</div>
			) : (
				<Loading open={true} />
			)}
		</React.Fragment>
	);
};

export default SingleProduct;
