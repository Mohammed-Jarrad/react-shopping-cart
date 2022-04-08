import React, { useState } from "react";
import Modal from "react-modal";
import Bounce from "react-reveal/Bounce";

Modal.setAppElement('#root');

const CartModal = ({ alertSuccess, closeAlertSuccess, cart }) => {
    const [user] = useState(localStorage.user ? JSON.parse(localStorage.user) : "");

    return (
        <Bounce top>
            <Modal
                isOpen={alertSuccess}
                onRequestClose={closeAlertSuccess}
                className="cart-modal"
            >

                <span className="close-icon"
                    onClick={closeAlertSuccess}>
                    <span>&times;</span>
                </span>

                <div className="order-content">
                    <p className="alert-success">Order Done Success</p>
                    <div className="order-info">

                        <table>
                            <tbody>

                                <tr>
                                    <td>Name:</td>
                                    <td>{`${user.name.first_name} ${user.name.last_name}`} </td>
                                </tr>

                                <tr>
                                    <td>Email:</td>
                                    <td> {user.email} </td>
                                </tr>

                                <tr>
                                    <td>Total:</td>
                                    <td>$ {cart.reduce((current, p) => current + (p.price + p.qty), 0)} </td>
                                </tr>

                                <tr>
                                    <td>Selected Items:</td>
                                    <td className="products-info">
                                        {
                                            cart.map((product, index) => (
                                                <div key={product._id}>
                                                    <p>
                                                        {product.title}- Quantity: {product.qty}
                                                    </p>
                                                </div>
                                            ))
                                        }
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </Modal>
        </Bounce>
    );
};

export default CartModal;
