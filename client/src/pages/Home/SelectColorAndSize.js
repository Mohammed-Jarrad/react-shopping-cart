import {Alert} from '@mui/material';
import React, {useContext, useState} from 'react';
import Modal from 'react-modal';
import {CartContext} from '../../Context/CartProvider';
import {HomeContext} from '../../Context/HomeProvider';

const SelectColorAndSize = ({open, close}) => {
	Modal.setAppElement('#root');

	//context
	const {addToCart} = useContext(CartContext);
	const {singleProduct, chosenSize, chosenColor, setChosenColor, setChosenSize} = useContext(HomeContext);

	const productSizes = singleProduct.sizes ? [...singleProduct.sizes] : [];
	const productColors = singleProduct.colors ? [...singleProduct.colors] : [];
	const [alertMsg, setAlertMsg] = useState(false);

	// handleClickSize
	const handleClickSize = e => {
		const target = e.currentTarget;
		const allSizes = document.getElementsByClassName('size-item');
		Object.values(allSizes).forEach(div => div.classList.remove('active'));
		target.classList.add('active');
		setChosenSize(target.textContent);
		setAlertMsg(false);
	};
	// handleClickColor
	const handleClickColor = e => {
		const target = e.currentTarget;
		const allColors = document.getElementsByClassName('color-item');
		Object.values(allColors).forEach(div => div.classList.remove('active'));
		target.classList.add('active');
		setChosenColor(target.style.background);
		setAlertMsg(false);
	};
	// handle Submit
	const handleSubmit = () => {
		if (!chosenColor || (!chosenSize && productSizes.length)) {
			setAlertMsg(true);
		} else {
			addToCart(singleProduct, chosenSize, chosenColor);
			close();
		}
	};

	return (
		<Modal
			isOpen={open}
			closeTimeoutMS={250}
			onRequestClose={close}
			className='modal select-size-color-modal'
			overlayClassName='overlay-modal'
		>
			<div className='main-box'>
				<h1 className='heading'>Customise Order</h1>

				{productSizes.length ? (
					<div className='sizes'>
						<h3>Select One Size ...</h3>
						<div className='sizes-content'>
							<>
								{productSizes.map((size, i) => (
									<div className='size-item' key={i} onClick={handleClickSize}>
										{size.toUpperCase()}
									</div>
								))}
							</>
						</div>
					</div>
				) : null}

				<div className='colors'>
					<h3>Select One Color ...</h3>
					<div className='colors-content'>
						{productColors ? (
							<>
								{productColors.map((color, i) => (
									<div
										key={i}
										className='color-item'
										onClick={handleClickColor}
										style={{background: `${color}`}}
									></div>
								))}
							</>
						) : (
							<div>No Colors Found</div>
						)}
					</div>
				</div>

				<div className='chosen-size-color'>
					{chosenSize ? (
						<div>
							Size: <span className='chosen-size'>{chosenSize.toUpperCase()}</span>
						</div>
					) : null}
					{chosenColor ? (
						<div>
							Color: <span className='chosen-color' style={{background: `${chosenColor}`}}></span>
						</div>
					) : null}
				</div>

				{alertMsg ? <Alert severity='error'>{'Please Customise your Order'}</Alert> : null}

				<div className='options'>
					<button className='submit' onClick={handleSubmit}>
						Submit
					</button>
					<button className='cancel' onClick={close}>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default SelectColorAndSize;
