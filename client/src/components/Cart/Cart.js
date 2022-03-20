import React, { useState } from 'react'
import '../../css/Cart/Cart.css'
import Checkout from '../CeckoutForm/Checkout'
import Zoom from 'react-reveal/Zoom'
import Bounce from 'react-reveal/Bounce'

const Cart = ({ cart, removeFromCart, minusQty, plusQty, showProduct }) => {

    let [showForm, setShowForm] = useState(false)
    let [value, setValue] = useState('')

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(value)
    }

    let handleChange = (e) => {
        setValue((PrevValue) => ({ ...PrevValue, [e.target.name]: e.target.value }))
    }

    return (
        <div className='cart'>
            <div className='container'>
                <div className='cart-title'>
                    {cart.length} Items In Cart
                </div>
                <Bounce left cascade>
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
                </Bounce>
                {
                    cart.length ? (
                        <Zoom>
                            <div className='cart-footer'>
                                <div className='total'>
                                    Total : ${
                                        cart.reduce((acc, p) => acc + (p.price * p.qty), 0)
                                    }
                                </div>
                                <button onClick={() => setShowForm(true)}>Select Product</button>
                            </div>
                        </Zoom>
                    ) : false
                }
                <Checkout
                    showForm={showForm}
                    setShowForm={setShowForm}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default Cart