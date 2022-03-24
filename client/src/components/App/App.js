import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Products from "../Products/Products";
// import data from '../../data.json'
import Filter from "../Filter/Filter";
import Cart from "../Cart/Cart";
import ProductModal from "../Products/ProductModal";
import axios from "axios";

const App = () => {

  let [products, setProducts] = useState([])
  let [productsClone, setProductsClone] = useState([])
  let [sort, setSort] = useState('')
  let [size, setSize] = useState('')
  let [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
  let [singleProduct, setSingleProduct] = useState('')
  let [isOpen, setIsOpen] = useState(false)

  let fetchData = () => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
  }

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data)
        setProductsClone(res.data)
      })
  }, [])


  let toggleModal = () => setIsOpen(!isOpen)

  let closeModal = () => {
    setSingleProduct(false) // singleProduct = {}
    toggleModal() // isOpen = false
  }

  let showProduct = (singleProduct) => {
    setSingleProduct(singleProduct) // singleProduct = {1 Product}
    toggleModal()   // isOpen = true
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
    <div className="layout">
      <Header />
      <main>
        <div className="container">
          <Products
            products={products}
            addToCart={addToCart}
            showProduct={showProduct}
          />
          <Filter
            handleFilterBySize={handleFilterBySize}
            handleFilterBySort={handleFilterBySort}
            size={size}
            sort={sort}
            products={products}
          />
        </div>
        <Cart
          cart={cart}
          setCart={setCart}
          showProduct={showProduct}
        />
      </main>
      <Footer />
      <ProductModal
        isOpen={isOpen}
        singleProduct={singleProduct}
        closeModal={closeModal}
      />
    </div>
  )
}

export default App;
