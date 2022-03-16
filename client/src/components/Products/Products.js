/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import '../../css/Products/Products.css'
import ProductModal from './ProductModal'

const Products = ({ products }) => {

    let [product, setProduct] = useState('')

    let openModal = (product) => {
        setProduct(product)
    }

    let closeModal = () => setProduct(false)

    return (
        <div className='products-wrapper'>
            {products.map(product =>
                (
                    <div key={product.id} className='product-item'>
                        <a href='#' onClick={() => openModal(product)}>
                            <img src={product.imageUrl} alt={product.title} />
                        </a>
                        <div className='product-desc'>
                            <p>{product.title}</p>
                            <p>{product.price}<span>$</span></p>
                        </div>
                        <button>Add To Cart</button>
                    </div>
                ))}
                
            <ProductModal product={product} closeModal={closeModal} />
        </div>
    )
}

export default Products