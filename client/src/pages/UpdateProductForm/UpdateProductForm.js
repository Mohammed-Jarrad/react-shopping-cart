/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from "react";
import "../../css/UpdateProductForm/UpdateProductForm.css";
import {inputsInfo} from "../CreateProduct/CreateProduct";
import UpdateInput from "../UpdateProduct/UpdateInput";
import {HomeContext} from "../../Context/HomeProvider";
import mainMethods from "../../utils/mainMethods";
import SizesOptions from "../UpdateProduct/SizesOptions";
import ColorsOptions from "../UpdateProduct/ColorsOptions";
import Loading from "../../components/Loading/Loading";
import {useNavigate, useParams} from "react-router-dom";
import {hex2rgb} from "../CreateProduct/ColorInput";

const UpdateProductForm = () => {
	// variables
	const id = useParams().id;
	const navigate = useNavigate();
	//context
	const {removeProduct, getProduct, product} = useContext(HomeContext);
	// state
	const [productImage, setProductImage] = useState();
	const [inputsValues, setInputsValues] = useState({});
	const [sizes, setSizes] = useState([]);
	const [colors, setColors] = useState([]);
	//ref
	const inputFileRef = useRef();
	const colorRef = useRef();

	/// get product =>
	useEffect(() => {
		getProduct(id);
		setProductImage(product.imageUrl);
	}, [product]);

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

		if (e.target.classList.contains("active")) {
			const sizesClone = [...sizes];
			sizesClone.splice(sizes.indexOf(size), 1);
			setSizes(sizesClone);
		} else {
			const sizesClone = [...sizes];
			sizesClone.push(size);
			setSizes(sizesClone);
		}
		e.target.classList.toggle("active");
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
			countInStock: inputsValues.countInStock ? inputsValues.countInStock : product.countInStock,
			discount: inputsValues.discount ? inputsValues.discount : product.discount,
		};

		try {
			const data = await mainMethods.UpdateProduct(product._id, UpdatedProduct);
			if (data.product) {
				navigate("/update-product");
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
							accept={"image/jpg"}
							onChange={getPathOfImg}
							style={{display: "none"}}
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

						<SizesOptions handleClickSize={handleClickSize} product={product} />

						<ColorsOptions
							colorRef={colorRef}
							handleClickColor={handleClickColor}
							colors={colors}
							removeColor={removeColor}
						/>

						<button className="submit" onClick={UpdateProduct}>
							Update
						</button>
					</form>
				</div>
			) : (
				<Loading open={true} />
			)}
		</>
	);
};

export default UpdateProductForm;
