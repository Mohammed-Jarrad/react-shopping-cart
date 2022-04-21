import { Alert } from '@mui/material';
import React, { useRef, useState } from 'react';
import '../../css/CreateProduct/CreateProduct.css';
import { PostRequest } from '../../utils/requests';
import Loading from '../Loading/Loading';
import SuccessMsg from '../SuccessMsg/SuccessMsg';

const CreateProduct = () => {
	// my state
	const [imageProductUrl, setImageProductUrl] = useState('');
	const [inputsValue, setInputsValue] = useState('');
	const selectInputRef = useRef();
	const [productError, setProductError] = useState('');
	const [alertCreateDone, setAlertCreateDone] = useState(false);
	const [loading, setLoading] = useState(false);

	// get path
	function getPathOfImg(e) {
		if (e.target.files.length) {
			console.log(e.target.files);
			let file = e.target.files[0];
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				setImageProductUrl(fileReader.result);
				console.log(fileReader.result);
			};
			fileReader.onerror = e => console.log(e);
		} else return;
	}
	// handle change inputs
	const handleChangeInput = e => {
		setInputsValue(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }));
		setProductError(false);
	};

	// create product
	const createProduct = async e => {
		e.preventDefault();
		setLoading(true);
		const product = {
			title: inputsValue['title'],
			imageUrl: imageProductUrl,
			price: inputsValue['price'],
			category: inputsValue['category'],
			desc: inputsValue['desc'],
		};
		try {
			const res = await PostRequest('/product', JSON.stringify(product));
			const data = await res.json();
			console.log('response product', res);
			console.log('data product', data);
			if (data.product) {
				setLoading(false);
				setAlertCreateDone(true);
				setProductError(false);
			} else {
				setLoading(false);
				setProductError(data.errors);
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	return (
		<div className='create-product'>
			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg open={alertCreateDone} setOpen={setAlertCreateDone} msg={'Created Done !'} />

			<form onSubmit={createProduct}>
				<div className='form-content'>
					<div className='col-1'>
						<div className='input-box'>
							<div className='input-content'>
								<label htmlFor='title'>Title</label>
								<div className='input'>
									<input
										type='text'
										placeholder='Product Title'
										name='title'
										onChange={handleChangeInput}
									/>
									{productError.title && <Alert severity='error'>{productError.title}</Alert>}
								</div>
							</div>
						</div>

						<div className='input-box'>
							<div className='input-content'>
								<label htmlFor='price'>Price</label>
								<div className='input'>
									<input
										type='number'
										placeholder='Product Price'
										name='price'
										onChange={handleChangeInput}
									/>
									{productError.price && <Alert severity='error'>{productError.price}</Alert>}
								</div>
							</div>
						</div>

						<div className='input-box'>
							<div className='input-content'>
								<label htmlFor='category'>Category</label>
								<div className='input'>
									<input
										type='text'
										placeholder='Product Category'
										name='category'
										onChange={handleChangeInput}
									/>
									{productError.category && <Alert severity='error'>{productError.category}</Alert>}
								</div>
							</div>
						</div>

						<div className='input-box'>
							<div className='input-content'>
								<label htmlFor='desc'>Description</label>
								<div className='input'>
									<textarea
										placeholder='Product Category'
										name='desc'
										onChange={handleChangeInput}
									/>
									{productError.desc && <Alert severity='error'>{productError.desc}</Alert>}
								</div>
							</div>
						</div>

						<button className='submit'>Submit</button>
					</div>

					<div className='col-2'>
						<input type='file' onChange={getPathOfImg} accept='image/jpg' ref={selectInputRef} />

						<button
							onClick={e => {
								e.preventDefault();
								selectInputRef.current.click();
							}}
							style={{ display: imageProductUrl ? 'none' : 'block' }}
						>
							Add Photo
						</button>

						<div className='img-error'>
							<img
								onClick={() => imageProductUrl && selectInputRef.current.click()}
								alt='Product Figure'
								src={imageProductUrl ? imageProductUrl : '/images/product-default-image.jpg'}
							/>
							{productError.imageUrl && <Alert severity='error'>{productError.imageUrl}</Alert>}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateProduct;
