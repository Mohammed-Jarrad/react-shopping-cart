import React from 'react'
import Modal from 'react-modal'

const ProductModal = (props) => {

    let { product, closeModal } = props;

    return (
        <Modal
            isOpen={product}
            onRequestClose={() => closeModal()}
        >
            <div className='product-info'>
                <span className='close-icon' onClick={closeModal}> &times; </span>
                <img src={product.imageUrl} alt={product.title} />
                <p> {product.title} </p>
                <p> {product.desc} </p>
                <p> {product.price}$ </p>
            </div>
        </Modal>
    )
}

export default ProductModal