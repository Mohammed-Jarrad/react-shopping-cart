/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { HomeContext } from '../../Context/HomeProvider';
import '../../css/UpdateProduct/UpdateProduct.css';
import Loading from '../../components/Loading/Loading';
import NoProducts from '../../components/Products/NoProducts';
import SearchBox from '../../components/SearchBox/SearchBox';
import { useNavigate } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';

const UpdateProduct = () => {
	// context
	const {
		products,
		get_products_categories_colors_sizes,
		discountPrice,
		finalPrice,
		ignore,
		removeProduct,
		alertProductDeleted,
		setAlertProductDeleted,
	} = useContext(HomeContext);
	const { loading } = useContext(HomeContext).config;

	// variables
	const navigate = useNavigate();

	useEffect(() => {
		get_products_categories_colors_sizes();
	}, [ignore]);

	return (
		<React.Fragment>
			<div className="update-product">
				<div className="container">
					<SearchBox />
					{products.length ? (
						<div className="products">
							{products.map((product, index) => (
								<div className="product-items" key={index}>
									<div className="item">
										{discountPrice(product) !== product.price && (
											<span className="product-discount">{`${product.discount}%`}</span>
										)}
										<img src={product.imageUrl} alt="" onClick={() => navigate(`/product/${product._id}`)} />
										<div className="title">{product.title}</div>
										<div className="price">{finalPrice(product)}</div>
									</div>

									<div className="buttons">
										<button
											className="remove"
											onClick={_ => {
												removeProduct(product._id);
												setAlertProductDeleted(true);
											}}
										>
											<AiTwotoneDelete />
										</button>
										<button className="update" onClick={_ => navigate(`/update-product/${product._id}`)}>
											<BiEdit />
										</button>
									</div>
								</div>
							))}
						</div>
					) : (
						<>{!loading && <NoProducts />}</>
					)}
				</div>
			</div>

			<Loading open={loading} />
			<SuccessMsg msg={'Product Deleted !'} open={alertProductDeleted} setOpen={setAlertProductDeleted} />
		</React.Fragment>
	);
};

export default UpdateProduct;
