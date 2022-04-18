import React, { useEffect, useState } from 'react';
import '../../css/Cart/Cart.css';
import Checkout from '../CeckoutForm/Checkout';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import { RiDeleteBin4Fill } from 'react-icons/ri';

const Cart = ({ cart, setCart, showProduct, products }) => {
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	// MY STATE ==>
	const [showForm, setShowForm] = useState(false);

	const removeFromCart = product => {
		const cartClone = [...cart];
		setCart(cartClone.filter(p => p._id !== product._id));
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
		<>
			{products.length ? (
				<div className='cart'>
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
									{cart.map(p => (
										<div className='cart-item' key={p._id}>
											<div className='image'>
												<img src={p.imageUrl} alt='product figure' onClick={() => showProduct(p)} />
												<h3>{p.title}</h3>
											</div>

											<div className='price'>
												<div>{p.price}$</div>
											</div>

											<div className='quantity'>
												<div className='quantity-options'>
													<span
														className={`minus ${p.qty === 1 && 'hide'}`}
														onClick={() => minusQty(p)}
													>
														-
													</span>
													{p.qty}
													<span className='plus' onClick={() => plusQty(p)}>
														+
													</span>
												</div>
											</div>

											<div className='remove'>
												<RiDeleteBin4Fill onClick={() => removeFromCart(p)} />
											</div>
										</div>
									))}
								</div>
							</Bounce>

							<Zoom>
								<div className='cart-footer'>
									<div className='total'>
										TOTAL: {cart.reduce((acc, p) => acc + p.price * p.qty, 0)} $
									</div>
									<button className='checkout-order' onClick={() => setShowForm(!showForm)}>
										CECKOUT
									</button>
								</div>
							</Zoom>
						</>
					) : null}
				</div>
			) : (
				false
			)}
			<Checkout showForm={showForm} setShowForm={setShowForm} cart={cart} setCart={setCart} />
		</>
	);
};

export default Cart;
