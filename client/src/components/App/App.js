import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Orders from "../../pages/Orders";
import Home from "../../pages/Home";

const App = () => {

  return (
    <BrowserRouter>
      <div className="layout">
        <Header />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
