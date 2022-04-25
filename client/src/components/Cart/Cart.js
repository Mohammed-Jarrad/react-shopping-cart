import React, { useEffect, useState } from 'react';
import '../../css/Cart/Cart.css';
import Checkout from './Checkout';
import Bounce from 'react-reveal/Bounce';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { ImCart } from 'react-icons/im';
import { NavLink } from 'react-router-dom';

const Cart = ({ cart, setCart, openProductModal, products }) => {
	// states
	const [showCheckout, setShowCheckout] = useState(false);

	// save the cart items in local storage;
	useEffect(() => {
		sessionStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	const removeFromCart = product => {
		const cartClone = [...cart];
		setCart(
			// cartClone.filter(item => item._id !== product._id && item.color !== product.color && item.size !== product.size),
			cartClone.filter(item => item !== product),
		);
	};

	const minusQty = product => {
		const cartClone = [...cart];
		cartClone[cartClone.indexOf(product)].qty -= 1;
		setCart(cartClone);
	};

	const plusQty = product => {
		const cartClone = [...cart];
		cartClone[cartClone.indexOf(product)].qty += 1;
		setCart(cartClone);
	};

	return (
		<React.Fragment>
			<a href='#cart' className='go-to-cart'>
				<ImCart />
			</a>

			{products.length ? (
				<div className='cart' id='cart'>
					<div className='cart-title'>
						<span>{cart.length}</span> Products in your Cart
					</div>

					{cart.length ? (
						<>
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
						</>
					) : null}
				</div>
			) : null}

			<Checkout showCheckout={showCheckout} setShowCheckout={setShowCheckout} cart={cart} setCart={setCart} />
		</React.Fragment>
	);
};

export default Cart;
