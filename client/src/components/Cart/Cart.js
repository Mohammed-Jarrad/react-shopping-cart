import React, { useEffect, useState } from "react";
import "../../css/Cart/Cart.css";
import Checkout from "../CeckoutForm/Checkout";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import CartModal from "./CartModal";
// import { MdAddShoppingCart } from 'react-icons/md'
import { BsCartPlus, BsCartDash, BsCartX, BsCart4 } from "react-icons/bs";
import axios from "axios";

const Cart = ({ cart, setCart, showProduct, products }) => {
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // MY STATE ==>
    let [showForm, setShowForm] = useState(false);
    let [order, setOrder] = useState(false);
    let [value, setValue] = useState("");
    let [isOpen, setIsOpen] = useState(false);

    let handleSubmit = (e) => {
        e.preventDefault();
        let myOrder = {
            user_name: value.name,
            user_email: value.email,
            order_info: cart.map((item) => {
                return { title: item.title, quantity: item.qty };
            }),
        };
        setOrder(myOrder);
        axios.post("/order", myOrder);
        setIsOpen(true);
    };

    let handleChange = (e) => {
        setValue((PrevValue) => {
            return { ...PrevValue, [e.target.name]: e.target.value };
        });
    };

    let closeModal = () => {
        setOrder(false);
        setIsOpen(false);
        setShowForm(false);
        setCart([]);
    };

    let removeFromCart = (product) => {
        let cartClone = [...cart];
        setCart(cartClone.filter((p) => p._id !== product._id));
    };

    let minusQty = (product) => {
        let cartClone = [...cart];
        cartClone[cartClone.indexOf(product)].qty -= 1;
        setCart(cartClone);
    };

    let plusQty = (product) => {
        let cartClone = [...cart];
        cartClone[cartClone.indexOf(product)].qty += 1;
        setCart(cartClone);
    };

    return (
        <>
            {products.length ? (
                <div className="cart">
                    <div className="container">
                        <div className="cart-title">
                            {cart.length} Products In <BsCart4 size="1.5em" />
                        </div>
                        <Bounce left cascade>
                            <div className="cart-items">
                                {cart.map((p) => {
                                    return (
                                        <div className="cart-item" key={p._id}>
                                            <img
                                                src={p.imageUrl}
                                                alt={p.title}
                                                onClick={() => showProduct(p)}
                                            />
                                            <div className="cart-info">
                                                <div>
                                                    <p>Title: {p.title}</p>
                                                    <p>
                                                        {" "}
                                                        Quantity: <span>{p.qty}</span>
                                                    </p>
                                                    <p>Price: {p.price}$</p>
                                                </div>
                                                <div>
                                                    <button onClick={() => removeFromCart(p)}>
                                                        <BsCartX />
                                                    </button>
                                                    <button onClick={() => plusQty(p)}>
                                                        <BsCartPlus />
                                                    </button>
                                                    <button
                                                        onClick={(e) =>
                                                            p.qty === 1 ? removeFromCart(p) : minusQty(p)
                                                        }
                                                    >
                                                        <BsCartDash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Bounce>
                        {cart.length ? (
                            <Zoom>
                                <div className="cart-footer">
                                    <div className="total">
                                        Total : ${cart.reduce((acc, p) => acc + p.price * p.qty, 0)}
                                    </div>
                                    <button
                                        className="select-products"
                                        onClick={() => setShowForm(true)}
                                    >
                                        Select Product
                                    </button>
                                </div>
                            </Zoom>
                        ) : (
                            false
                        )}
                    </div>
                    <Checkout
                        showForm={showForm}
                        setShowForm={setShowForm}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                    <CartModal
                        isOpen={isOpen}
                        cart={cart}
                        closeModal={closeModal}
                        order={order}
                    />
                </div>
            ) : (
                false
            )}
        </>
    );
};

export default Cart;
