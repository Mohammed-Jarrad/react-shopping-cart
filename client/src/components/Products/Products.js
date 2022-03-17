/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import '../../css/Products/Products.css'
import ProductModal from './ProductModal'

const Products = ({ products }) => {

    let [product, setProduct] = useState('')
    let [isOpen, setIsOpen] = useState(false)

    let toggleModal = () => setIsOpen(!isOpen)

    let closeModal = () => {
        setProduct({}) // product = {}
        toggleModal() // isOpen = false
    }

    let addProduct = (product) => {
        setProduct(product) // product = {1 Product}
        toggleModal()   // isOpen = true
    }

    return (
        <div className='products-wrapper'>
            {typeof products === 'object' ? products.map(product =>
            (
                <div key={product.id} className='product-item'>
                    <a href='#' onClick={() => addProduct(product)}>
                        <img src={product.imageUrl} alt={product.title} />
                    </a>
                    <div className='product-desc'>
                        <p>{product.title}</p>
                        <p><span>$</span> {product.price}</p>
                    </div>
                    <button>Add To Cart</button>
                </div>
            )) : <div> {products} </div>}

            <ProductModal
                isOpen={isOpen}
                product={product}
                closeModal={closeModal}
            />
        </div>
    )
}

export default Products