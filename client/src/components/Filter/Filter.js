import React from 'react'
import '../../css/Filter/Filter.css'

const Filter = () => {
    return (
        <div className="filter-wrapper">
            <div className='filter-title'>Filter</div>
            <div className='no-of-products'>Number of Products is 4</div>
            <div className='filter-by-sizing'>
                <span>Filter</span>
                <select>
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
                <select>
                    <option value='latest'>Latest</option>
                    <option value='lower'>Lower</option>
                    <option value='highset'>Highest</option>
                </select>
            </div>
        </div>
    )
}

export default Filter