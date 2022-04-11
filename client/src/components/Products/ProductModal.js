import React from 'react'
import Modal from 'react-modal'
import '../../css/Products/Products.css'
import Zoom from 'react-reveal/Zoom'
import { Image } from 'cloudinary-react'

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
                    <Image cloudName="dipbhxayl" publicId={singleProduct.imageUrl} />
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