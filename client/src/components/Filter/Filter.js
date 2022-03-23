import React from 'react'
import '../../css/Filter/Filter.css'
import Bounce from 'react-reveal/Bounce'

const Filter = (props) => {

    let { handleFilterBySize, handleFilterBySort, size, sort, products } = props

    return (
        <Bounce right>
            <div className="filter-wrapper">
                <div className='filter-title'>Filter</div>
                <div className='no-of-products'>
                    {typeof products === 'object' ? products.length : 'NO'} Products
                </div>
                <div className='filter-by-sizing'>
                    <span>Size</span>
                    <select
                        onChange={handleFilterBySize}
                        value={size}
                    >
                        <option value='ALL'>ALL</option>
                        <option value='XS'>XS</option>
                        <option value='S'>S</option>
                        <option value='M'>M</option>
                        <option value='L'>L</option>
                        <option value='XL'>XL</option>
                        <option value='XXL'>XXL</option>
                    </select>
                </div>
                <div className='filter-by-order'>
                    <span>Order</span>
                    <select
                        onChange={handleFilterBySort}
                        value={sort}
                    >
                        <option value='ALL'>ALL</option>
                        <option value='latest'>Latest</option>
                        <option value='lowest'>Lowest</option>
                        <option value='highest'>Highest</option>
                    </select>
                </div>
            </div>
        </Bounce>
    )
}

export default Filter