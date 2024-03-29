/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { UserContext } from './UserProvider';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
	// states
	const [cart, setCart] = useState(sessionStorage.cart ? JSON.parse(sessionStorage.cart) : []);

	// save the cart items in session storage;
	useEffect(() => {
		sessionStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	// add to cart
	const addToCart = (product, size, color) => {
		const cartClone = [...cart];
		let productExist = false;
		cartClone.forEach(item => {
			if (item.product._id === product._id && item.color === color && item.size === size) {
				productExist = true;
				item.qty += 1;
			}
		});
		if (!productExist) {
			cartClone.push({ product, color, size, qty: 1 });
		}
		setCart(cartClone);
	};

	// remove from cart
	const removeFromCart = product => {
		const cartClone = [...cart].filter(item => item !== product);
		setCart(cartClone);
	};

	// minus quantity
	const minusQty = product => {
		const cartClone = [...cart];
		cartClone[cartClone.indexOf(product)].qty -= 1;
		setCart(cartClone);
	};
	// plus quantity
	const plusQty = product => {
		const cartClone = [...cart];
		cartClone[cartClone.indexOf(product)].qty += 1;
		setCart(cartClone);
	};

	//
	return (
		<CartContext.Provider
			value={{
				cart,
				setCart,
				addToCart,
				removeFromCart,
				minusQty,
				plusQty,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
