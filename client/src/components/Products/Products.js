/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import '../../css/Products/Products.css'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/actions/products'

const Products = (props) => {

    let { products, addToCart, showProduct } = props

    useEffect(() => {
        props.fetchProducts()
    }, [])

    return (
        <Zoom cascade>
            {
                props.products && props.products.length ? (
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

export default connect((state) => {
    return {
        products: state.products.products,
    }
}, { fetchProducts })(Products)