import React, {useContext, useState} from 'react';
import '../../css/CeckoutForm/Checkout.css';
import Modal from 'react-modal';
import Loading from '../Loading/Loading';
import SuccessMsg from '../SuccessMsg/SuccessMsg';
import {CartContext} from '../../Context/CartProvider';
import mainMethods from '../../utils/mainMethods';

Modal.setAppElement('#root');

const Checkout = ({open, close}) => {
	// context
	const {cart, setCart} = useContext(CartContext);
	//myState
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	// create Order
	async function createOrder(e) {
		e.preventDefault();
		close();
		setLoading(true);
		const order = {
			order_info: cart.map(item => ({
				product: item._id,
				quantity: item.qty,
				selected_color: item.color,
				selected_size: item.size,
			})),
		};
		try {
			const data = await mainMethods.createOrder(order);
			if (data.order) {
				setLoading(false);
				setAlertSuccess(true);
				setCart([]);
			} else {
				console.log(data.errors);
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
				onRequestClose={() => close()}
				className='modal checkout-modal'
				overlayClassName='overlay-modal checkout-modal-overlay'
				closeTimeoutMS={250}
			>
				<div className='accept-order'>
					<h2> Are You Sure? </h2>
					<form onSubmit={createOrder}>
						<button autoFocus>yes</button>
						<button
							onClick={e => {
								e.preventDefault();
								close();
							}}
						>
							No
						</button>
					</form>
				</div>
			</Modal>
		</React.Fragment>
	);
};

export default Checkout;
