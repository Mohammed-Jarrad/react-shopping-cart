import Modal from 'react-modal'
import React, { useState } from 'react'

const FormShowMore = ({ showMoreForm, setShowMoreForm, order }) => {

    const { order_info } = order;
    console.log(order_info)

    return (
        <Modal
            isOpen={showMoreForm}
            onRequestClose={() => setShowMoreForm(false)}
        // className="order-show-more-form"
        >
            <span onClick={() => setShowMoreForm(false)}>
                &times;
            </span>
            <div className='order-information'>

                {
                    order_info.length
                        ? order_info.map(product =>
                        (
                            <div key={product._id}>
                                <img
                                    src={product.product["imageUrl"]}
                                    alt={product.product["title"]}
                                    width={200}
                                />
                                <div>
                                    <h1>{product.product["title"]}</h1>
                                    <span>{product.product["price"]}</span>
                                </div>
                                <div>{product.quantity}</div>
                            </div>
                        ))
                        : (
                            false
                        )
                }
            </div>
        </Modal>
    )
}

export default FormShowMore