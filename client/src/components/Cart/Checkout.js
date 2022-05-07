import React, {useContext, useState} from 'react';
import '../../css/CeckoutForm/Checkout.css';
import Modal from 'react-modal';
import Loading from '../Loading/Loading';
import SuccessMsg from '../SuccessMsg/SuccessMsg';
import {CartContext} from '../../Context/CartProvider';
import mainMethods from '../../utils/mainMethods';
import {useNavigate} from 'react-router-dom';
import {Alert} from '@mui/material';

Modal.setAppElement('#root');

const Checkout = ({open, close}) => {
	// context
	const {cart, setCart} = useContext(CartContext);
	//myState
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [location, setLocation] = useState({});
	const [locationErrros, setlocationErrors] = useState({});
	const navigate = useNavigate();
	// handle change address
	const handleChangeLocation = e => {
		setLocation(prev => ({...prev, [e.target.name]: e.target.value.trim()}));
		setlocationErrors(prev => ({...prev, [e.target.name]: null}));
	};
	// create Order
	async function createOrder(e) {
		e.preventDefault();
		setLoading(true);
		const order = {
			location: {
				city: location['location.city'],
				country: location['location.country'],
				address: location['location.address'],
			},
			order_info: cart.map(item => ({
				product: item.product._id,
				quantity: item.qty,
				selected_color: item.color ? item.color : '',
				selected_size: item.size ? item.size : '',
			})),
		};
		try {
			const data = await mainMethods.createOrder(order);
			if (data.order) {
				setLoading(false);
				setAlertSuccess(true);
				setCart([]);
				navigate('/orders');
			} else {
				console.log(data.errors);
				setlocationErrors(data.errors);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	return (
		<React.Fragment>
			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg msg={`order created done !`} open={alertSuccess} setOpen={setAlertSuccess} />

			<Modal
				isOpen={open}
				// onRequestClose={() => close()}
				shouldCloseOnOverlayClick={false}
				className='modal checkout-modal'
				overlayClassName='overlay-modal checkout-modal-overlay'
				closeTimeoutMS={250}
			>
				<div className='accept-order'>
					<h2> Enter Your Address Please </h2>
					<form>
						<div className='input-box'>
							<input
								type='text'
								placeholder='Country'
								name='location.country'
								onChange={handleChangeLocation}
							/>
							{locationErrros['location.country'] ? (
								<Alert className='error' severity='error'>
									{locationErrros['location.country']}
								</Alert>
							) : null}
						</div>
						<div className='input-box'>
							<input type='text' placeholder='City' name='location.city' onChange={handleChangeLocation} />
							{locationErrros['location.city'] ? (
								<Alert className='error' severity='error'>
									{locationErrros['location.city']}
								</Alert>
							) : null}
						</div>
						<div className='input-box'>
							<input
								type='text'
								placeholder='Address'
								name='location.address'
								onChange={handleChangeLocation}
							/>
							{locationErrros['location.address'] ? (
								<Alert className='error' severity='error'>
									{locationErrros['location.address']}
								</Alert>
							) : null}
						</div>

						<div className='submit'>
							<button onClick={createOrder}>Submit</button>
							<button
								onClick={e => {
									e.preventDefault();
									close();
								}}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>
		</React.Fragment>
	);
};

export default Checkout;
