/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import '../../css/Products/Products.css'
import Fade from 'react-reveal/Fade'
import { MdAddShoppingCart } from 'react-icons/md'
import Loading from '../Loading/Loading'
import Requests from '../../utils/requests'

const Products = ({ showProduct, addToCart, products, loading, categories }) => {

    return (
        <React.Fragment>

            {loading === true ? <Loading /> : false}

            <Fade cascade>
                {
                    typeof products === 'object' && products.length ? (
                        <div className='products-wrapper'>

                            {
                                products.map(product => (

                                    <div key={product._id} className='product-item'>

                                        <a href={'#'} onClick={() => showProduct(product)} >
                                            <img
                                                src={product.imageUrl}
                                                alt={product.title}
                                            />
                                        </a>

                                        <div className='product-desc'>

                                            <p>{product.title}</p>
                                            <p><span>$</span> {product.price}</p>

                                        </div>

                                        <button onClick={() => addToCart(product)} >
                                            Add to Cart<MdAddShoppingCart size='30px' />
                                        </button>

                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <h1> {products} </h1>
                    )
                }
            </Fade>
        </React.Fragment>
    )
}

export default Products