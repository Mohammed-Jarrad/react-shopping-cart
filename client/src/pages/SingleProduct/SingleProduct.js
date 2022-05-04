/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import '../../css/SingleProduct/SingleProduct.css';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import {HomeContext} from '../../Context/HomeProvider';
import {UserContext} from '../../Context/UserProvider';
import CustomiseProduct from '../../components/CustomiseProduct/CustomiseProduct';
import ProductBoxInfo from './ProductBoxInfo';

const SingleProduct = () => {
	//context
	const {admin, user} = useContext(UserContext);
	const {removeProduct, getProduct, product} = useContext(HomeContext);
	// variables
	const product_id = useParams().id;
	const navigate = useNavigate();
	//states
	const [showCustomise, setShowCustomise] = useState(false);

	useEffect(() => {
		getProduct(product_id);
	}, []);

	return (
		<React.Fragment>
			{product._id === product_id ? (
				<div className='single-product container'>
					<h2 className='title'>{product.title}</h2>
					<div className='main-content'>
						<div className='product-info'>
							<img src={product.imageUrl} alt='product figure' />
							<ProductBoxInfo product={product} />
						</div>
						{user ? (
							<div className='modal-options'>
								<button className='add' onClick={_ => setShowCustomise(true)}>
									Add To Cart
								</button>
								{admin && (
									<button
										className='delete'
										onClick={() => {
											removeProduct(product_id);
											navigate('/');
										}}
									>
										Delete Product
									</button>
								)}
							</div>
						) : (
							<div className='login-msg'>
								Please <Link to={'/login'}>Login</Link> to Add Your Product to Cart!
							</div>
						)}

						{showCustomise ? <CustomiseProduct /> : null}
					</div>
				</div>
			) : (
				<Loading open={true} />
			)}
		</React.Fragment>
	);
};

export default SingleProduct;
