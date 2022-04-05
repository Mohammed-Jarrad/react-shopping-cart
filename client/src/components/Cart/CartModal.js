import React from 'react'
import Modal from 'react-modal'
import Bounce from 'react-reveal/Bounce'

const CartModal = ({ isOpen, closeModal, order, cart }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='cart-modal'
        >
            <Bounce top>
                <span className='close-icon' onClick={closeModal}> <span>&times;</span> </span>
                <div className='order-content'>
                    <p className='alert-success'> Order Done Success </p>
                    <div className='order-info'>
                        <table>
                            <tbody>
                                <tr>
                                    <td> Name: </td>
                                    <td> {order.user_name} </td>
                                </tr>
                                <tr>
                                    <td> Email: </td>
                                    <td> {order.user_email} </td>
                                </tr>
                                <tr>
                                    <td> Total: </td>
                                    <td> ${cart.reduce((current, p) => current + (p.price + p.qty), 0)} </td>
                                </tr>
                                <tr>
                                    <td> Selected Items: </td>
                                    <td className='products-info'>
                                        {cart.map((p, index) => (
                                            <div key={p._id}>
                                                <p> {p.title} - Quantity: {p.qty}</p>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Bounce>
        </Modal>
    )
}

export default CartModal