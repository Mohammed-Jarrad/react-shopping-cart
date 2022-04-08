import React from 'react'
import Modal from 'react-modal'
import '../../css/Products/Products.css'
import Zoom from 'react-reveal/Zoom'

const ProductModal = ({ singleProduct, isOpen, closeModal }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='products-modal'
        >
            <Zoom bottom>
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
            </Zoom>
        </Modal >
    )
}

export default ProductModal