import React, {useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Products from "../Products/Products";
import data from '../../data.json'

const App = () => {

  let [products] = useState(data)
  
  return (
    <div className="layout">
      <Header />
      <main>
        <div className="wrapper">
          <Products products={products} />
          <div className="filter-wrapper">
            Filter
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App;
