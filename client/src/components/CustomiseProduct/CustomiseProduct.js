/* eslint-disable react-hooks/exhaustive-deps */
import {Alert} from "@mui/material";
import React, {useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CartContext} from "../../Context/CartProvider";
import {HomeContext} from "../../Context/HomeProvider";
import "../../css/CustomiseProduct/CustomiseProduct.css";
import SuccessMsg from "../SuccessMsg/SuccessMsg";

const CustomiseProduct = () => {
	//context
	const {addToCart} = useContext(CartContext);
	const {product, chosenSize, chosenColor, setChosenColor, setChosenSize} = useContext(HomeContext);
	//states
	const [showDoneAdded, setShowDoneAdded] = useState(false);
	//variables
	const productSizes = product.sizes ? [...product.sizes] : [];
	const productColors = product.colors ? [...product.colors] : [];
	const navigate = useNavigate();
	//states
	const [alertMsg, setAlertMsg] = useState(false);

	// handleClickSize
	const handleClickSize = e => {
		const target = e.currentTarget;
		const allSizes = document.getElementsByClassName("size-item");
		Object.values(allSizes).forEach(div => div.classList.remove("active"));
		target.classList.add("active");
		setChosenSize(target.textContent);
		setAlertMsg(false);
	};
	// handleClickColor
	const handleClickColor = e => {
		const target = e.currentTarget;
		const allColors = document.getElementsByClassName("color-item");
		Object.values(allColors).forEach(div => div.classList.remove("active"));
		target.classList.add("active");
		setChosenColor(target.style.background);
		setAlertMsg(false);
	};
	// handle Submit
	const handleSubmit = () => {
		if ((!chosenColor && productColors.length) || (!chosenSize && productSizes.length)) {
			setAlertMsg(true);
		} else {
			addToCart(product, chosenSize, chosenColor);
			setShowDoneAdded(true);
		}
	};
	//
	useEffect(() => {
		setChosenColor("");
		setChosenSize("");
		const allSizes = document.getElementsByClassName("size-item");
		Object.values(allSizes).forEach(div => div.classList.remove("active"));
		const allColors = document.getElementsByClassName("color-item");
		Object.values(allColors).forEach(div => div.classList.remove("active"));
	}, [addToCart]);

	return (
		<div>
			<div className="customise-product">
				<h1 className="heading">Customise Product</h1>

				<>
					{productSizes.length ? (
						<div className="sizes">
							<h3>Please Select Your Size</h3>
							<div className="sizes-content">
								<>
									{productSizes.map((size, i) => (
										<div className="size-item" key={i} onClick={handleClickSize}>
											{size.toUpperCase()}
										</div>
									))}
								</>
							</div>
						</div>
					) : null}
				</>

				<>
					{productColors.length ? (
						<div className="colors">
							<h3>Please Select Your Color</h3>
							<div className="colors-content">
								{productColors.map((color, i) => (
									<div
										key={i}
										className="color-item"
										onClick={handleClickColor}
										style={{background: `${color}`}}
									></div>
								))}
							</div>
						</div>
					) : null}
				</>

				<div className="chosen-size-color">
					{chosenSize ? (
						<div>
							Size: <span className="chosen-size">{chosenSize.toUpperCase()}</span>
						</div>
					) : null}
					{chosenColor ? (
						<div>
							Color: <span className="chosen-color" style={{background: `${chosenColor}`}}></span>
						</div>
					) : null}
				</div>

				{alertMsg ? <Alert severity="error">{"Please Customise your Product"}</Alert> : null}

				<button className="submit" onClick={handleSubmit}>
					Submit
				</button>
			</div>
			<SuccessMsg msg={"Done!"} open={showDoneAdded} setOpen={setShowDoneAdded} />;
		</div>
	);
};

export default CustomiseProduct;
