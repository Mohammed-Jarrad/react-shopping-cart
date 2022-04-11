import Modal from 'react-modal'
import React, { useState } from 'react'
import { Image } from 'cloudinary-react';

const FormShowMore = ({ showMoreForm, setShowMoreForm, order, removeOrder }) => {
    const user = JSON.parse(localStorage.user);
    const order_info = order ? order.order_info : [];
    const full_name = `${user.name.first_name} ${user.name.last_name}`

    return (
        <Modal
            isOpen={showMoreForm}
            onRequestClose={() => setShowMoreForm(false)}
            className="order-show-more-modal"
        >
            <div className='order-information'>
                {
                    order_info.length
                        ? order_info.map(product =>
                        (
                            <React.Fragment key={product._id}>
                                <div className='product-item'>
                                    <Image
                                        cloudName="dipbhxayl"
                                        publicId={product.product["imageUrl"]}
                                    />
                                    <div>
                                        <h3>{product.product["title"]}</h3>
                                        <span>${product.product["price"]}</span>
                                    </div>
                                    <div>Quantity: {product.quantity}</div>
                                </div>
                                <div className='more-details'>
                                    <div>
                                        Description: {product.product.desc}
                                    </div>
                                    <div>
                                        Sizes: {product.product.sizes.map((s, i) => (
                                            <p key={i}> - {s}</p>
                                        ))}
                                    </div>
                                </div>
                            </React.Fragment>
                        ))
                        : false
                }
            </div>
            <div className='user-info'>
                <h4>Name: {full_name}</h4>
                <h4>Location: {user.location.country} - {user.location.city}</h4>
                <h4>Phone: {user.phone}</h4>
                <p>Created At: {typeof order.createdAt == 'string' && order.createdAt.split('T')[0]}</p>
                <div>
                    <button onClick={() => setShowMoreForm(false)}>
                        Close
                    </button>
                    <button onClick={() => {
                        removeOrder(order._id);
                        setShowMoreForm(false);
                    }}>
                        Delete Order
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default FormShowMore