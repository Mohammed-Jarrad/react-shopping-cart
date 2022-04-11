/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import '../../css/Products/Products.css'
import Fade from 'react-reveal/Fade'
import { MdAddShoppingCart } from 'react-icons/md'
import Loading from '../Loading/Loading'
import { DeleteRequest, GetRequest } from '../../utils/requests'
import { NavLink } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import { CircularProgress, getImageListItemBarUtilityClass } from '@mui/material'
import SuccessMsg from '../SuccessMsg/SuccessMsg'

const Products = ({ showProduct, addToCart, products, loading, setLoading, setProducts, setCart, setOrders }) => {

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [alertProductDeleted, setAlertProductDeleted] = useState(false);

    async function removeProduct(id) {
        setLoadingDelete(true);
        try {
            const res = await DeleteRequest(`/product/${id}`);
            console.log(res)
            if (res.status === 202) {
                await setCart([]);
                setLoadingDelete(false);
                setAlertProductDeleted(true);
                //Delete All Orders With The Same Product
                try {
                    const resDeleteOrders = await DeleteRequest(`/order/product/${id}`);
                    if (resDeleteOrders.status === 202) {
                        console.log("res Deleted Orders", resDeleteOrders)
                        console.log("Orders With Same Product Was Deleted");
                    }
                } catch (error) {
                    console.log(error)
                }
                // return the products Data to products;
                try {
                    const resProd = await GetRequest('/products');
                    const data = await resProd.json();
                    setProducts(data.products);
                } catch (err) {
                    console.log(err)
                }

            }
        } catch (error) {
            setLoadingDelete(false);
            console.log(error);
        }
    }


    return (
        <React.Fragment>

            <Loading open={loading} setOpen={setLoading} />
            <Loading open={loadingDelete} setOpen={setLoadingDelete} />
            <SuccessMsg msg={"Product Deleted !"} open={alertProductDeleted} setOpen={setAlertProductDeleted} />


            <Fade cascade>
                {
                    typeof products === 'object' && products.length ? (
                        <div className='products-wrapper'>
                            {
                                products.map(product => (
                                    <div key={product._id} className='product-item'>

                                        <a href={'#'} onClick={() => showProduct(product)} >
                                            {/* <Image
                                                cloudName="dipbhxayl"
                                                publicId={product.imageUrl}
                                            /> */}
                                            <img alt='product figure' src={product.imageUrl} />
                                        </a>

                                        <div className='product-desc'>

                                            <p>{product.title}</p>
                                            <p><span>$</span> {product.price}</p>

                                        </div>

                                        <button onClick={() => addToCart(product)} >
                                            Add to Cart<MdAddShoppingCart size='30px' />
                                        </button>

                                        <button onClick={() => removeProduct(product._id)} >
                                            Delete Product
                                        </button>

                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <h1>No Products</h1>
                    )
                }
            </Fade>



        </React.Fragment>
    )
}

export default Products