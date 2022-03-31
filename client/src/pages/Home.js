import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cart from '../components/Cart/Cart'
import Filter from '../components/Filter/Filter'
import ProductModal from '../components/Products/ProductModal'
import Products from '../components/Products/Products'

const Home = () => {

    let [products, setProducts] = useState([])
    let [productsClone, setProductsClone] = useState([])
    let [sort, setSort] = useState('')
    let [size, setSize] = useState('')
    let [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    let [singleProduct, setSingleProduct] = useState('')
    let [isOpen, setIsOpen] = useState(false)
    let [loading, setLoading] = useState(true)

    let fetchData = () => {
        axios.get('/api/products')
            .then(res => {
                setProducts(res.data);
                setProductsClone(res.data)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])


    let closeModal = () => {
        setSingleProduct(false)
        setIsOpen(false)
    }

    let showProduct = (singleProduct) => {
        setSingleProduct(singleProduct)
        setIsOpen(true)
    }

    let addToCart = (singleProduct) => {
        let cartClone = [...cart]
        let productExist = false
        cartClone.forEach(p => {
            if (p._id === singleProduct._id) {
                productExist = true;
                p.qty += 1;
            }
        })
        if (!productExist) {
            cartClone.push({ ...singleProduct, qty: 1 })
        }
        setCart(cartClone)
    }

    let handleFilterBySize = (e) => {
        setSize(e.target.value)
        if (e.target.value === 'ALL') {
            fetchData()
        } else {
            let newProducts = productsClone.filter(p => p.sizes.includes(e.target.value))
            newProducts.length ? setProducts(newProducts) : setProducts(`NO ITEM TO SHOW WITH [${e.target.value}]`)
        }
    }

    let handleFilterBySort = (e) => {
        let order = e.target.value
        setSort(order)
        let productsCLone = products.sort((current, next) => {
            if (order === 'lowest') {
                return current.price - next.price
            } else if (order === 'highest') {
                return next.price - current.price
            } else if (order === 'ALL') {
                return current._id < next._id ? -1 : 1
            } else {
                return current._id > next._id ? -1 : 1
            }
        })
        setProducts(productsCLone)
    }

    return (
        <main>
            <div className="container">
                <Products
                    products={products}
                    addToCart={addToCart}
                    showProduct={showProduct}
                    loading={loading}
                />
                <Filter
                    handleFilterBySize={handleFilterBySize}
                    handleFilterBySort={handleFilterBySort}
                    size={size}
                    sort={sort}
                    products={products}
                    loading={loading}
                />
            </div>
            <Cart
                cart={cart}
                setCart={setCart}
                showProduct={showProduct}
                products={products}
            />
            <ProductModal
                isOpen={isOpen}
                singleProduct={singleProduct}
                closeModal={closeModal}
            />
        </main>
    )
}

export default Home