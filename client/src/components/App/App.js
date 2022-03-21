import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Products from "../Products/Products";
import data from '../../data.json'
import Filter from "../Filter/Filter";
import Cart from "../Cart/Cart";
import ProductModal from "../Products/ProductModal";
import { Provider } from 'react-redux'
import store from "../../store/store";

const App = () => {

  let [products, setProducts] = useState(data)
  let [sort, setSort] = useState('')
  let [size, setSize] = useState('')
  let [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
  let [product, setProduct] = useState('')
  let [isOpen, setIsOpen] = useState(false)

  let toggleModal = () => setIsOpen(!isOpen)

  let closeModal = () => {
    setProduct(false) // product = {}
    toggleModal() // isOpen = false
  }

  let showProduct = (product) => {
    setProduct(product) // product = {1 Product}
    toggleModal()   // isOpen = true
  }

  let addToCart = (product) => {
    let cartClone = [...cart]
    let productExist = false
    cartClone.forEach(p => {
      if (p.id === product.id) {
        productExist = true;
        p.qty += 1;
      }
    })
    if (!productExist) {
      cartClone.push({ ...product, qty: 1 })
    }
    setCart(cartClone)
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  let removeFromCart = (product) => {
    let cartClone = [...cart]
    setCart(cartClone.filter(p => p.id !== product.id))
  }

  let minusQty = (product) => {
    let cartClone = [...cart]
    product.qty -= 1;
    setCart(cartClone)
  }

  let plusQty = (product) => {
    let cartClone = [...cart]
    product.qty += 1;
    setCart(cartClone)
  }

  let handleFilterBySize = (e) => {
    setSize(e.target.value)
    if (e.target.value === "ALL") {
      setProducts(data)
    } else {
      let productsCLone = data.filter(p => p.sizes.includes(e.target.value))
      productsCLone.length ? setProducts(productsCLone) : setProducts(`NO ITEMS WITH [${e.target.value}] SIZE`)
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
        return current.id < next.id ? -1 : 1
      } else {
        return current.id > next.id ? -1 : 1
      }
    })
    setProducts(productsCLone)
  }

  return (
    <Provider store={store}>
      <div className="layout">
        <Header />
        <main>
          <div className="container">
            <Products
              products={products}
              addToCart={addToCart}
              cart={cart}
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
            removeFromCart={removeFromCart}
            minusQty={minusQty}
            plusQty={plusQty}
            showProduct={showProduct}
          />
        </main>
        <Footer />
        <ProductModal
          isOpen={isOpen}
          product={product}
          closeModal={closeModal}
        />
      </div>
    </Provider>
  )
}

export default App;
