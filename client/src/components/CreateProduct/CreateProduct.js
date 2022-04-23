import { Alert } from '@mui/material';
import React, { useRef, useState } from 'react';
import '../../css/CreateProduct/CreateProduct.css';
import { PostRequest } from '../../utils/requests';
import Loading from '../Loading/Loading';
import SuccessMsg from '../SuccessMsg/SuccessMsg';
import { AiFillCamera } from 'react-icons/ai';

const CreateProduct = () => {
	// my state
	const [imageProductUrl, setImageProductUrl] = useState('/images/product-default-image.jpg');
	const [inputsValue, setInputsValue] = useState('');
	const selectInputRef = useRef();
	const [productError, setProductError] = useState('');
	const [alertCreateDone, setAlertCreateDone] = useState(false);
	const [loading, setLoading] = useState(false);

	// get path
	function getPathOfImg(e) {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onloadend = () => {
				setImageProductUrl(fileReader.result);
				setProductError(prev => ({ ...prev, [e.target.name]: '' }));
			};
			fileReader.onerror = e => console.log(e);
		} else return;
	}
	// handle change inputs
	const handleChangeInput = async e => {
		setInputsValue(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }));
		setProductError(prev => ({ ...prev, [e.target.name]: '' }));
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
		<>
			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg open={alertCreateDone} setOpen={setAlertCreateDone} msg={'Created Done !'} />

			<div className='create-product'>
				{/* <div className='container'> */}
				<form onSubmit={createProduct} className='container'>
					<div className='col-1'>
						<div className='input-box'>
							<label htmlFor='title'>
								<span>Title:</span>
								<input
									type='text'
									placeholder='Product Title'
									name='title'
									onChange={handleChangeInput}
								/>
							</label>
							{productError.title && (
								<Alert className='error' severity='error'>
									{productError.title}
								</Alert>
							)}
						</div>

						<div className='input-box'>
							<label htmlFor='price'>
								<span>Price:</span>
								<input
									type='number'
									placeholder='Product Price'
									name='price'
									onChange={handleChangeInput}
								/>
							</label>
							{productError.price && (
								<Alert className='error' severity='error'>
									{productError.price}
								</Alert>
							)}
						</div>

						<div className='input-box'>
							<label htmlFor='category'>
								<span>Category:</span>
								<input
									type='text'
									placeholder='Product Category'
									name='category'
									onChange={handleChangeInput}
								/>
							</label>
							{productError.category && (
								<Alert className='error' severity='error'>
									{productError.category}
								</Alert>
							)}
						</div>

						<div className='input-box'>
							<label htmlFor='desc'>
								<span>Description:</span>
								<textarea placeholder='Product Category' name='desc' onChange={handleChangeInput} />
							</label>
							{productError.desc && (
								<Alert className='error' severity='error'>
									{productError.desc}
								</Alert>
							)}
						</div>

						<button className='submit'>Create Product</button>
					</div>

					<div className='col-2'>
						<input
							type='file'
							name='imageUrl'
							onChange={getPathOfImg}
							accept='image/jpg'
							ref={selectInputRef}
						/>
						<div className='img-error'>
							<img alt='Product Figure' src={imageProductUrl} />
							<AiFillCamera className='camera' onClick={() => selectInputRef.current.click()} />
							{productError.imageUrl && (
								<Alert severity='error' className='error'>
									{productError.imageUrl}
								</Alert>
							)}
						</div>
					</div>
				</form>
				{/* </div> */}
			</div>
		</>
	);
};

export default CreateProduct;
