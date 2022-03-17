import React from 'react'
import Modal from 'react-modal'

const ProductModal = (props) => {

    let { product, isOpen, closeModal } = props;

    Modal.setAppElement('#root')

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='modal'
        >
            <span className='close-icon' onClick={closeModal}> &times; </span>
            <div className='product-info'>
                <img src={product.imageUrl} alt={product.title} />
                <div>
                    <div>{product.title} Details</div>
                    <p> - Title: {product.title} </p>
                    <p> - Description: {product.desc} </p>
                    <p> - Price: {product.price}$ </p>
                    {/* <p> - Sizes: {product.sizes.map(e => <span>"{e}",  </span>)} </p> */}
                </div>
            </div>
        </Modal>
    )
}

export default ProductModal