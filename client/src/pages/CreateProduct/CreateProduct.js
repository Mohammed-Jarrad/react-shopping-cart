import { Alert } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import '../../css/CreateProduct/CreateProduct.css';
import { PostRequest } from '../../utils/requests';
import Loading from '../../components/Loading/Loading';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import { AiFillCamera } from 'react-icons/ai';
import CreateInput from './CreateInput';
import ColorInput from './ColorInput';
import SizesInput from './SizesInput';
import { HomeContext } from '../../Context/HomeProvider';

export const sizeOptions = [
	{ label: 'XS', value: 'xs' },
	{ label: 'S', value: 's' },
	{ label: 'M', value: 'm' },
	{ label: 'L', value: 'l' },
	{ label: 'Xl', value: 'xl' },
	{ label: 'XXL', value: 'xxl' },
	{ label: '35', value: '35' },
	{ label: '36', value: '36' },
	{ label: '37', value: '37' },
	{ label: '38', value: '38' },
	{ label: '39', value: '39' },
	{ label: '40', value: '40' },
	{ label: '41', value: '41' },
	{ label: '42', value: '42' },
	{ label: '43', value: '43' },
	{ label: '44', value: '44' },
	{ label: '45', value: '45' },
	{ label: '46', value: '46' },
];

export const inputsInfo = [
	{ label: 'Title: ', labelFor: 'title', type: 'text', placeholder: 'Product Title', name: 'title' },
	{ label: 'Price: ', labelFor: 'price', type: 'number', placeholder: 'Product Price', name: 'price' },
	{
		label: 'Discount: ',
		labelFor: 'discount',
		type: 'number',
		placeholder: 'Product Discount % ',
		name: 'discount',
	},
	{
		label: 'Category: ',
		labelFor: 'category',
		type: 'text',
		placeholder: 'Product Category',
		name: 'category',
	},
	{
		label: 'Description: ',
		labelFor: 'desc',
		type: 'text',
		placeholder: 'Product Description',
		name: 'desc',
	},
];

const CreateProduct = () => {
	// context
	const { forceUpdate } = useContext(HomeContext);
	// my state
	const [imageProductUrl, setImageProductUrl] = useState('/images/product-default-image.jpg');
	const [inputsValue, setInputsValue] = useState('');
	const [productError, setProductError] = useState('');
	const [alertCreateDone, setAlertCreateDone] = useState(false);
	const [loading, setLoading] = useState(false);
	const [sizes, setSizes] = useState([]);
	const [colors, setColors] = useState([]);
	// variables
	const selectInputRef = useRef();
	const colorRef = useRef();

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
			sizes: sizes,
			colors: colors,
			discount: inputsValue['discount'],
		};
		console.log(product);
		try {
			const res = await PostRequest('/product', JSON.stringify(product));
			const data = await res.json();
			if (data.product) {
				setLoading(false);
				setAlertCreateDone(true);
				setProductError(false);
				forceUpdate();
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
		<React.Fragment>
			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg open={alertCreateDone} setOpen={setAlertCreateDone} msg={'Created Done !'} />

			<div className="create-product container">
				<div className="col-1">
					{inputsInfo.map((input, i) => (
						<CreateInput
							key={i}
							label={input.label}
							labelFor={input.labelFor}
							type={input.type}
							placeholder={input.placeholder}
							name={input.name}
							productError={productError}
							handleChangeInput={handleChangeInput}
						/>
					))}

					<SizesInput setSizes={setSizes} sizes={sizes} />

					<ColorInput
						colorRef={colorRef}
						colors={colors}
						setColors={setColors}
						productError={productError}
						setProductError={setProductError}
					/>

					<button className="submit" onClick={createProduct}>
						Create Product
					</button>
				</div>

				<div className="col-2">
					<input
						type="file"
						name="imageUrl"
						onChange={getPathOfImg}
						accept="image/jpg"
						ref={selectInputRef}
					/>
					<div className="img-error">
						<img alt="Product Figure" src={imageProductUrl} />
						<AiFillCamera className="camera" onClick={() => selectInputRef.current.click()} />
						{productError.imageUrl && (
							<Alert severity="error" className="error">
								{productError.imageUrl}
							</Alert>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default CreateProduct;
