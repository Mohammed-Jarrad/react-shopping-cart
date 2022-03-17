import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Products from "../Products/Products";
import data from '../../data.json'
import Filter from "../Filter/Filter";

const App = () => {

  let [products, setProducts] = useState(data)
  let [sort, setSort] = useState('')
  let [size, setSize] = useState('')

  let handleFilterBySize = (e) => {
    setSize(e.target.value)
    if (e.target.value === "ALL") {
      setProducts(data)
    } else {
      let productsCLone = data.filter(p => p.sizes.includes(e.target.value))
      productsCLone.length ? setProducts(productsCLone) : setProducts('NO ITEMS TO SHOW')
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
    <div className="layout">
      <Header />
      <main className="container">
        <Products products={products} />
        <Filter
          handleFilterBySize={handleFilterBySize}
          handleFilterBySort={handleFilterBySort}
          size={size}
          sort={sort}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App;
