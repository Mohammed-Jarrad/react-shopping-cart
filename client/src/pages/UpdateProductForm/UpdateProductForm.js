/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../css/UpdateProductForm/UpdateProductForm.css';
import { inputsInfo } from '../CreateProduct/CreateProduct';
import UpdateInput from '../UpdateProduct/UpdateInput';
import { HomeContext } from '../../Context/HomeProvider';
import mainMethods from '../../utils/mainMethods';
import SizesOptions from '../UpdateProduct/SizesOptions';
import ColorsOptions from '../UpdateProduct/ColorsOptions';
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import { OrdersContext } from '../../Context/OrdersProvider';

const UpdateProductForm = () => {
	// variables
	const id = useParams().id;

	//context
	const { getProduct, product, forceUpdate } = useContext(HomeContext);
	const { forceUpdateOrders } = useContext(OrdersContext);

	// state
	const [productImage, setProductImage] = useState('');
	const [inputsValues, setInputsValues] = useState({});
	const [sizes, setSizes] = useState([]);
	const [colors, setColors] = useState([]);
	const [alertUpdatedDone, setAlertUpdatedDone] = useState(false);

	//ref
	const inputFileRef = useRef();
	const colorRef = useRef();

	/// get product =>
	useEffect(() => {
		getProduct(id);
	}, []);

	useEffect(() => {
		if (product._id === id) {
			setProductImage(product.imageUrl);
			setColors(product.colors);
			setSizes(product.sizes);
		}
	}, [id, product]);

	// get path of image
	const getPathOfImg = e => {
		if (e.target.files.length) {
			const file = e.target.files[0];
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onloadend = _ => setProductImage(fileReader.result);
			fileReader.onerror = e => console.log(e);
		} else return;
	};
	// handle change input
	const handleChangeInput = e => {
		setInputsValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// Update Product
	const UpdateProduct = async e => {
		e.preventDefault();
		const UpdatedProduct = {
			imageUrl: productImage,
			title: inputsValues.title ? inputsValues.title : product.title,
			category: inputsValues.category ? inputsValues.category : product.category,
			desc: inputsValues.desc ? inputsValues.desc : product.desc,
			price: inputsValues.price ? inputsValues.price : product.price,
			sizes: sizes,
			colors: colors,
			countInStock: inputsValues.countInStock ? inputsValues.countInStock : product.countInStock,
			discount: inputsValues.discount ? inputsValues.discount : product.discount,
		};

		try {
			const data = await mainMethods.UpdateProduct(product._id, UpdatedProduct);
			if (data.product) {
				getProduct(id);
				forceUpdate();
				forceUpdateOrders();
				setAlertUpdatedDone(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{product._id === id ? (
				<div className="update-form container">
					<div className="image">
						<img src={productImage} alt="" />
						<input
							type="file"
							ref={inputFileRef}
							accept={'image/jpg'}
							onChange={getPathOfImg}
							style={{ display: 'none' }}
						/>
						<button
							onClick={e => {
								e.preventDefault();
								inputFileRef.current.click();
							}}
						>
							Change Photo
						</button>
					</div>
					<form>
						<div className="form-inputs">
							{inputsInfo.map((input, i) => {
								return (
									<UpdateInput
										key={i}
										label={input.label}
										labelFor={input.labelFor}
										type={input.type}
										placeholder={input.placeholder}
										name={input.name}
										handleChangeInput={handleChangeInput}
										value={product[input.name]}
									/>
								);
							})}
						</div>

						<SizesOptions sizes={sizes} setSizes={setSizes} />

						<ColorsOptions colorRef={colorRef} colors={colors} setColors={setColors} />

						<button className="submit" onClick={UpdateProduct}>
							Update
						</button>
					</form>
				</div>
			) : (
				<Loading open={true} />
			)}

			<SuccessMsg open={alertUpdatedDone} setOpen={setAlertUpdatedDone} msg="Updated Done !" />
		</>
	);
};

export default UpdateProductForm;
