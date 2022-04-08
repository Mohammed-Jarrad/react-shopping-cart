import React, { useState } from "react";
import "../../css/CeckoutForm/Checkout.css";
import Input from "./Input";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import { PostRequest } from "../../utils/requests";
import CartModal from "../Cart/CartModal";
import Loading from "../Loading/Loading";

Modal.setAppElement('#root');

const Checkout = ({ showForm, setShowForm, cart, setCart }) => {

    //myState
    const [alertSuccess, setAlertSeccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setShowForm(false);
        const order = {
            order_info: cart.map(item => {
                return { product: item._id, quantity: item.qty };
            })
        };
        try {
            const res = await PostRequest("/order", JSON.stringify(order));
            const data = await res.json();
            console.log("res for order", res);
            console.log("data for order", data);
            if (data.order) {
                setAlertSeccess(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    function closeAlertSuccess() {
        setAlertSeccess(false);
        setCart([]);
    }

    return (
        <React.Fragment>
            {
                showForm ? (
                    <Fade bottom cascade>
                        <Modal
                            isOpen={showForm}
                            onRequestClose={() => setShowForm(false)}
                        >
                            <div className="accept-order">
                                <h2> Are You Sure? </h2>
                                <form onSubmit={handleSubmit}>
                                    <button autoFocus>yes</button>
                                    <button
                                        onClick={(e) => {
                                            setShowForm(false);
                                        }}
                                    >
                                        No
                                    </button>
                                </form>
                            </div>
                        </Modal>
                    </Fade>

                ) : (
                    false
                )
            }
            <CartModal
                alertSuccess={alertSuccess}
                cart={cart}
                closeAlertSuccess={closeAlertSuccess}
            />
        </React.Fragment>
    );
};

export default Checkout;
