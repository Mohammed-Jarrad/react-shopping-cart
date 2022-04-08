import React from 'react'
import '../../css/Filter/Filter.css'
import Bounce from 'react-reveal/Bounce'
import { NavLink } from 'react-router-dom'
import { MdNoEncryption } from 'react-icons/md'

const Filter = (props) => {

    let { handleFilterBySize, handleFilterBySort, size, sort, products, categories, handleFilterByCategory } = props

    return (

        <>
            {
                products.length ? (
                    <Bounce right>
                        <div className="filter-wrapper">
                            <div className='filter-title'>Filter</div>
                            <div className='no-of-products'>
                                {typeof products === 'object' ? products.length : 'NO'} Products
                            </div>
                            <div className='filter-by-sizing'>
                                <span>Size</span>
                                {/* <select
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
                            </select> */}
                                <div>
                                    <div>ALL</div>
                                    {
                                        categories.length
                                            ? categories.map((category, i) =>
                                                <NavLink
                                                    key={i}
                                                    onClick={handleFilterByCategory}
                                                    to="/products"
                                                > {category} </NavLink>)
                                            : false
                                    }
                                </div>
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
                ) : (
                    false
                )
            }
        </>

    )
}

export default Filter