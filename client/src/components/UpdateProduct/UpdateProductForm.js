import React, {useContext, useRef, useState} from 'react';
import {inputsInfo} from '../../pages/CreateProduct/CreateProduct';
import UpdateInput from './UpdateInput';
import {HomeContext} from '../../Context/HomeProvider';
import mainMethods from '../../utils/mainMethods';
import SizesOptions from './SizesOptions';
import ColorsOptions from './ColorsOptions';

const UpdateProductForm = ({product}) => {
	//context
	const {get_products_categories_colors_sizes} = useContext(HomeContext);
	// state
	const [productImage, setProductImage] = useState(product.imageUrl);
	const [inputsValues, setInputsValues] = useState({});
	const [sizes, setSizes] = useState([]);
	const [colors, setColors] = useState([]);
	//ref
	const inputFileRef = useRef();
	const colorRef = useRef();

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
		setInputsValues(prev => ({...prev, [e.target.name]: e.target.value}));
	};
	// handle click size
	const handleClickSize = e => {
		const size = e.target.textContent.toLowerCase();

		if (e.target.classList.contains('active')) {
			const sizesClone = [...sizes];
			sizesClone.splice(sizes.indexOf(size), 1);
			setSizes(sizesClone);
		} else {
			const sizesClone = [...sizes];
			sizesClone.push(size);
			setSizes(sizesClone);
		}
		e.target.classList.toggle('active');
	};
	// changes hex colors to rgb
	const hex2rgb = color => {
		const r = parseInt(color.substr(1, 2), 16);
		const g = parseInt(color.substr(3, 2), 16);
		const b = parseInt(color.substr(5, 2), 16);
		return `rgb(${r}, ${g}, ${b})`;
	};
	// handle Click Color
	const handleClickColor = e => {
		e.preventDefault();
		const color = hex2rgb(colorRef.current.value);
		const colorsClone = [...colors];
		if (colorsClone.includes(color)) {
			return;
		} else {
			colorsClone.push(color);
			setColors(colorsClone);
		}
	};
	// remove color
	const removeColor = e => {
		const color = e.currentTarget.style.background;
		const colorsClone = [...colors];
		colorsClone.splice(colorsClone.indexOf(color), 1);
		setColors(colorsClone);
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
			sizes: sizes.length ? sizes : [...product.sizes],
			colors: colors.length ? colors : [...product.colors],
		};
		console.log(UpdatedProduct);
		try {
			const data = await mainMethods.UpdateProduct(product._id, UpdatedProduct);
			console.log(data);
			if (data.product) {
				get_products_categories_colors_sizes();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<div className='image'>
				<img src={productImage} alt='' />
				<input
					type='file'
					ref={inputFileRef}
					accept={'image/jpg'}
					onChange={getPathOfImg}
					style={{display: 'none'}}
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
				<div className='form-inputs'>
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

				<SizesOptions handleClickSize={handleClickSize} product={product} />

				<ColorsOptions
					colorRef={colorRef}
					handleClickColor={handleClickColor}
					colors={colors}
					removeColor={removeColor}
				/>

				<button className='submit' onClick={UpdateProduct}>
					Update
				</button>
			</form>
		</React.Fragment>
	);
};

export default UpdateProductForm;

// title, category, colors, sizes,
