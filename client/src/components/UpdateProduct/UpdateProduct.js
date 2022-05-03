/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {HomeContext} from '../../Context/HomeProvider';
import '../../css/UpdateProduct/UpdateProduct.css';
import Loading from '../Loading/Loading';
import NoProducts from '../Products/NoProducts';
import {AiOutlineEdit} from 'react-icons/ai';
import UpdateProductForm from './UpdateProductForm.js';

const UpdateProduct = () => {
	// context
	const {products, get_products_categories_colors_sizes, ignore} = useContext(HomeContext);
	const {loading, setLoading} = useContext(HomeContext).config;

	useEffect(() => {
		get_products_categories_colors_sizes();
	}, [ignore]);

	// show Update Form
	const showUpdateForm = id => {
		let form;
		let update_btn;
		const form_divs = document.getElementsByClassName('update-form');
		const update_buttons = document.querySelectorAll('.product-item .update-button span');
		Object.values(form_divs).forEach(div => div.getAttribute('data-id') === id && (form = div));
		Object.values(update_buttons).forEach(span => span.getAttribute('data-id') === id && (update_btn = span));
		if (form.classList.contains('show')) {
			form.classList.remove('show');
			form.style.height = '0px';
			update_btn.classList.remove('active');
		} else {
			Object.values(form_divs).forEach(div => {
				div.classList.remove('show');
				div.style.height = '0px';
			});
			Object.values(update_buttons).forEach(span => span.classList.remove('active'));
			form.classList.add('show');
			form.style.height = `${form.scrollHeight}px`;
			update_btn.classList.add('active');
		}
	};

	return (
		<React.Fragment>
			<div className='update-product'>
				<div className='container'>
					{products.length ? (
						<div className='products'>
							{products.map((product, index) => (
								<React.Fragment key={index}>
									<div className='product-item'>
										<div className='image'>
											<img src={product['imageUrl']} alt='product figure' />
										</div>

										<div className='category'>
											<h3>{product.title}</h3>
											<div>{product.category}</div>
										</div>

										<div className='price'>$ {product.price}</div>

										<div className='update-button'>
											<span onClick={_ => showUpdateForm(product._id)} data-id={product._id}>
												<AiOutlineEdit />
											</span>
										</div>
									</div>

									<div className='update-form' data-id={product._id}>
										<UpdateProductForm product={product} />
									</div>
								</React.Fragment>
							))}
						</div>
					) : (
						<>{!loading && <NoProducts />}</>
					)}
				</div>
			</div>

			<Loading open={loading} setOpen={setLoading} />
		</React.Fragment>
	);
};

export default UpdateProduct;
