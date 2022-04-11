import React, { useEffect, useState } from "react";
import "../../css/Cart/Cart.css";
import Checkout from "../CeckoutForm/Checkout";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import CartModal from "./CartModal";
import { BsCartPlus, BsCartDash, BsCartX, BsCart4 } from "react-icons/bs";
import axios from "axios";
import Requests from "../../utils/requests";
import { Image } from "cloudinary-react";

const Cart = ({ cart, setCart, showProduct, products }) => {
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // MY STATE ==>
    const [showForm, setShowForm] = useState(false);

    const removeFromCart = (product) => {
        const cartClone = [...cart];
        setCart(cartClone.filter((p) => p._id !== product._id));
    };

    const minusQty = (product) => {
        const cartClone = [...cart];
        cartClone[cartClone.indexOf(product)].qty -= 1;
        setCart(cartClone);
    };

    const plusQty = (product) => {
        const cartClone = [...cart];
        cartClone[cartClone.indexOf(product)].qty += 1;
        setCart(cartClone);
    };

    return (
        <>
            {
                products.length ? (
                    <div className="cart">
                        <div className="container">

                            <div className="cart-title">
                                {cart.length} Products In <BsCart4 size="1.5em" />
                            </div>

                            <Bounce left cascade>
                                <div className="cart-items">
                                    {
                                        cart.map((p) => {
                                            return (
                                                <div className="cart-item" key={p._id}>

                                                    <Image
                                                        cloudName="dipbhxayl"
                                                        publicId={p.imageUrl}
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
                                        })
                                    }
                                </div>
                            </Bounce>

                            {
                                cart.length ? (

                                    <Zoom>
                                        <div className="cart-footer">

                                            <div className="total">
                                                Total : ${
                                                    cart.reduce((acc, p) => acc + p.price * p.qty, 0)
                                                }
                                            </div>

                                            <button
                                                className="select-products"
                                                onClick={() => setShowForm(!showForm)}
                                            >
                                                Submit Order
                                            </button>

                                        </div>
                                    </Zoom>

                                ) : (
                                    false
                                )
                            }
                        </div>

                        <Checkout
                            showForm={showForm}
                            setShowForm={setShowForm}
                            cart={cart}
                            setCart={setCart}
                        />

                    </div>
                ) : (
                    false
                )
            }
        </>
    );
};

export default Cart;
