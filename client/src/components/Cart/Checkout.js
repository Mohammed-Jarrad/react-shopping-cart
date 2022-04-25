import React, { useState } from 'react';
import '../../css/CeckoutForm/Checkout.css';
import Modal from 'react-modal';
import { PostRequest } from '../../utils/requests';
import Loading from '../Loading/Loading';
import SuccessMsg from '../SuccessMsg/SuccessMsg';

Modal.setAppElement('#root');

const Checkout = ({ showCheckout, setShowCheckout, cart, setCart }) => {
	//myState
	const [alertSuccess, setAlertSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	// create Order
	async function handleSubmit(e) {
		e.preventDefault();
		setShowCheckout(false);
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
			const res = await PostRequest(`/order`, JSON.stringify(order));
			const data = await res.json();
			if (data.order) {
				setLoading(false);
				console.log('new order created: ', data.order);
				setAlertSuccess(true);
				setCart([]);
			} else {
				console.log(data.errors);
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
				isOpen={showCheckout}
				onRequestClose={() => setShowCheckout(false)}
				className='modal checkout-modal'
				overlayClassName='overlay-modal checkout-modal-overlay'
				closeTimeoutMS={250}
			>
				<div className='accept-order'>
					<h2> Are You Sure? </h2>
					<form onSubmit={handleSubmit}>
						<button autoFocus>yes</button>
						<button
							onClick={e => {
								e.preventDefault();
								setShowCheckout(false);
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
