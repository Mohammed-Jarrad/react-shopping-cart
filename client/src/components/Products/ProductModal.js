import React from 'react'
import Modal from 'react-modal'
import '../../css/Products/Products.css'

const ProductModal = ({ singleProduct, isOpen, closeModal }) => {

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='products-modal'
        >
            <span className='close-icon' onClick={closeModal}> &times; </span>
            <div className='product-info'>
                <img src={singleProduct.imageUrl} alt={singleProduct.title} />
                <div>
                    <div>{singleProduct.title} Details</div>
                    <p> - Title: {singleProduct.title} </p>
                    <p> - Description: {singleProduct.desc} </p>
                    <p> - Price: {singleProduct.price}$ </p>
                    <p> - Sizes: {singleProduct && singleProduct.sizes.map(e => `[${e}] `)}</p>
                </div>
            </div>
        </Modal>
    )
}

export default ProductModal