import React, { useContext, useEffect, useState } from 'react';
import '../../css/Cart/Cart.css';
import Checkout from './Checkout';
import { RiDeleteBin4Fill } from 'react-icons/ri';
import { CartContext } from '../../Context/CartProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { HomeContext } from '../../Context/HomeProvider';

const Cart = () => {
	//context
	const { cart, removeFromCart, minusQty, plusQty } = useContext(CartContext);
	const { finalPrice } = useContext(HomeContext);
	// states
	const [showCheckout, setShowCheckout] = useState(false);
	//
	const navigate = useNavigate();

	return (
		<React.Fragment>
			<div className="cart">
				<div className="container">
					{cart.length ? (
						<React.Fragment>
							<div className="heading">
								<div>ITEM</div>
								<div>PRICE</div>
								<div>QUANTITY</div>
								<div>REMOVE</div>
							</div>

							<Fade cascade>
								<div className="cart-items">
									{cart.map((item, i) => (
										<div className="cart-item" key={i}>
											<div className="image">
												<img
													src={item.product.imageUrl}
													alt="product figure"
													onClick={() => navigate(`/product/${item.product._id}`)}
												/>
												<h3>{item.product.title}</h3>
												<h5>
													<span className="size">{item.size}</span>
													{item.color ? <span className="color" style={{ background: item.color }} /> : null}
												</h5>
											</div>

											<div className="price">
												{/* <div>${item.price}</div> */}
												{finalPrice(item.product)}
											</div>

											<div className="quantity">
												<div className="quantity-options">
													<span
														className={`minus ${item.qty === 1 && 'hide'}`}
														onClick={() => minusQty(item)}
													>
														-
													</span>
													{item.qty}
													<span className="plus" onClick={() => plusQty(item)}>
														+
													</span>
												</div>
											</div>

											<div className="remove">
												<span className="icon">
													<RiDeleteBin4Fill
														color="var(--second-color)"
														onClick={() => removeFromCart(item)}
													/>
												</span>
											</div>
										</div>
									))}
								</div>
							</Fade>

							<div className="cart-footer">
								<button className="checkout-order" onClick={() => setShowCheckout(!showCheckout)}>
									CECKOUT ({`${cart.reduce((acc, item) => acc + item.product.price * item.qty, 0)}$`})
								</button>
							</div>
						</React.Fragment>
					) : (
						<h2 className="cart-empty">
							<div>Your Cart Is Empty!</div>
							<Link to={'/all-products'}>Start Shopping</Link>
							<img src={'/images/empty-cart.png'} alt="" />
						</h2>
					)}
				</div>
			</div>

			<Checkout open={showCheckout} close={() => setShowCheckout(false)} />
		</React.Fragment>
	);
};

export default Cart;
