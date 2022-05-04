import React, {useContext, useEffect, useState} from 'react';
import '../../css/Cart/Cart.css';
import Checkout from './Checkout';
import {RiDeleteBin4Fill} from 'react-icons/ri';
import {CartContext} from '../../Context/CartProvider';
import {Link, useNavigate} from 'react-router-dom';
import {Fade} from 'react-reveal';

const Cart = ({openProductModal}) => {
	//context
	const {cart, removeFromCart, minusQty, plusQty} = useContext(CartContext);
	// states
	const [showCheckout, setShowCheckout] = useState(false);
	//
	const navigate = useNavigate();

	// save the cart items in session storage;
	useEffect(() => {
		sessionStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	return (
		<React.Fragment>
			<div className='cart container'>
				{cart.length ? (
					<React.Fragment>
						<div className='heading'>
							<div>ITEM</div>
							<div>PRICE</div>
							<div>QUANTITY</div>
							<div>REMOVE</div>
						</div>

						<Fade cascade>
							<div className='cart-items'>
								{cart.map((p, i) => (
									<div className='cart-item' key={i}>
										<div className='image'>
											<img
												src={p.imageUrl}
												alt='product figure'
												onClick={() => navigate(`/product/${p._id}`)}
											/>
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
						</Fade>

						<div className='cart-footer'>
							<button className='checkout-order' onClick={() => setShowCheckout(!showCheckout)}>
								CECKOUT ({`${cart.reduce((acc, p) => acc + p.price * p.qty, 0)}$`})
							</button>
						</div>
					</React.Fragment>
				) : (
					<h2 className='cart-empty'>
						<div>Your Cart Is Empty!</div>
						<Link to={'/'}>Start Shopping</Link>
						<img src={'/images/empty-cart.png'} alt='' />
					</h2>
				)}
			</div>

			<Checkout open={showCheckout} close={() => setShowCheckout(false)} />
		</React.Fragment>
	);
};

export default Cart;
