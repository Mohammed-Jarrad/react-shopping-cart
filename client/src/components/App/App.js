import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Orders from "../../pages/Orders";
import Home from "../../pages/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const App = () => {

  return (
    // <Login />
    // <SignUp/>
    <BrowserRouter>
      <div className="layout">
        <Header />

        <Routes>
          <Route exact={'true'} path="/" element={<Home />} />
          <Route exact={'true'} path="/orders" element={<Orders />} />
          <Route exact={'true'} path="/login" element={<Login />} />
          <Route exact={'true'} path="/signup" element={<SignUp />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
