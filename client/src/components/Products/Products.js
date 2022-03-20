/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import '../../css/Products/Products.css'
import Zoom from 'react-reveal/Zoom'

const Products = ({ products, addToCart, showProduct }) => {

    return (
        <Zoom cascade>
            {
                typeof products === 'object' ? (
                    <div className='products-wrapper'>
                        {
                            products.map(product => (
                                <div key={product.id} className='product-item'>
                                    <a href='#' onClick={() => showProduct(product)}>
                                        <img src={product.imageUrl} alt={product.title} />
                                    </a>
                                    <div className='product-desc'>
                                        <p>{product.title}</p>
                                        <p><span>$</span> {product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                    >Add To Cart</button>
                                </div>
                            ))
                        }
                    </div>
                ) : <h1> {products} </h1>
            }
        </Zoom>
    )
}

export default Products