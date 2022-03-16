import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Products from "../Products/Products";
import data from '../../data.json'
import Filter from "../Filter/Filter";

const App = () => {

  let [products] = useState(data)

  return (
    <div className="layout">
      <Header />
      <main className="wrapper">
        <Products products={products} />
        <Filter />
      </main>
      <Footer />
    </div>
  )
}

export default App;
