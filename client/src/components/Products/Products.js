import React from 'react'
import '../../css/Products/Products.css'

const Products = ({ products }) => {

    let getProducts = () => {
        let newArr = products.map(product =>
        (
            <div key={product.id} className='product-item'>
                <img src={product.imageUrl} alt={product.title} />
                <div className='product-desc'>
                    <p>{product.title}</p>
                    <span>{product.price}$</span>
                </div>
                <button>Add To Cart</button>
            </div>
        ))
        return newArr
    }

    return (
        <div className='products-wrapper'>
            {getProducts()}
        </div>
    )
}

export default Products