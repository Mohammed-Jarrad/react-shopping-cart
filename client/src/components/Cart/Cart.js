import React from 'react'
import '../../css/Cart/Cart.css'

const Cart = ({ cart, removeFromCart, minusQty, plusQty, showProduct }) => {

    return (
        <div className='cart'>
            <div className='container'>
                <div className='cart-title'>
                    {cart.length} Items In Cart
                </div>
                <div className='cart-items'>
                    {cart.map(p => {
                        return (
                            <div className='cart-item' key={p.id}>
                                <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    onClick={() => showProduct(p)}
                                />
                                <div className='cart-info'>
                                    <div>
                                        <p>Title: {p.title}</p>
                                        <p> Quantity: {p.qty}</p>
                                        <p>Price: {p.price}$</p>
                                    </div>
                                    <div>
                                        <button onClick={() => removeFromCart(p)}>Remove</button>
                                        <button onClick={() => plusQty(p)}>+</button>
                                        <button onClick={() => minusQty(p)}>-</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Cart