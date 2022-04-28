import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../css/Cart/Cart.css';
import Checkout from './Checkout';
import Bounce from 'react-reveal/Bounce';
import {RiDeleteBin4Fill} from 'react-icons/ri';
import ScrollToBottom from '../Scrolling/ScrollToBottom';
import {CartContext} from '../../Context/CartProvider';
import {HomeContext} from '../../Context/HomeProvider';

const Cart = ({openProductModal}) => {
	//context
	const {products} = useContext(HomeContext);
	const {cart, removeFromCart, minusQty, plusQty} = useContext(CartContext);
	// states
	const [showCheckout, setShowCheckout] = useState(false);
	const cartRef = useRef(null);

	// save the cart items in session storage;
	useEffect(() => {
		sessionStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	return (
		<React.Fragment>
			<ScrollToBottom cartRef={cartRef} />

			{products ? (
				<div className='cart' ref={cartRef}>
					<div className='cart-title'>
						<span>{cart.length}</span> Products in your Cart
					</div>

					{cart.length ? (
						<React.Fragment>
							<Bounce left cascade>
								<div className='heading'>
									<div>ITEM</div>
									<div>PRICE</div>
									<div>QUANTITY</div>
									<div>REMOVE</div>
								</div>
								<div className='cart-items'>
									{cart.map((p, i) => (
										<div className='cart-item' key={i}>
											<div className='image'>
												<img src={p.imageUrl} alt='product figure' onClick={() => openProductModal(p)} />
												<h3>{p.title}</h3>
												<h5>{p.size}</h5>
											</div>

											<div className='price'>
												<div>{p.price}$</div>
											</div>

											<div className='quantity'>
												<div className='quantity-options'>
													<span className={`minus ${p.qty === 1 && 'hide'}`} onClick={() => minusQty(p)}>
														-
													</span>
													{p.qty}
													<span className='plus' onClick={() => plusQty(p)}>
														+
													</span>
												</div>
											</div>

											<div className='remove'>
												<span className='icon'>
													<RiDeleteBin4Fill color={`${p.color}`} onClick={() => removeFromCart(p)} />
												</span>
											</div>
										</div>
									))}
								</div>
							</Bounce>

							<div className='cart-footer'>
								<button className='checkout-order' onClick={() => setShowCheckout(!showCheckout)}>
									CECKOUT ({`${cart.reduce((acc, p) => acc + p.price * p.qty, 0)}$`})
								</button>
							</div>
						</React.Fragment>
					) : null}
				</div>
			) : null}

			<Checkout open={showCheckout} close={() => setShowCheckout(false)} />
		</React.Fragment>
	);
};

export default Cart;
