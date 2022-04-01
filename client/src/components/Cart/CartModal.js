import React from 'react'
import Modal from 'react-modal'

const CartModal = ({isOpen, closeModal, order, cart}) => {
    return (
        <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    className='cart-modal'
                >
                    <span className='close-icon' onClick={closeModal}> <span>&times;</span> </span>
                    <div className='order-content'>
                        <p className='alert-success'> Order Done Success </p>
                        <div className='order-info'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td> Name: </td>
                                        <td> {order.name} </td>
                                    </tr>
                                    <tr>
                                        <td> Email: </td>
                                        <td> {order.email} </td>
                                    </tr>
                                    <tr>
                                        <td> Total: </td>
                                        <td> ${cart.reduce((current, p) => current + (p.price + p.qty), 0)} </td>
                                    </tr>
                                    <tr>
                                        <td> Selected Items: </td>
                                        <td>
                                            {cart.map((p, index) => (
                                                <div key={p._id}>
                                                    <p> [{index + 1}] {p.title} - Quantity: {p.qty}</p>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal>
    )
}

export default CartModal