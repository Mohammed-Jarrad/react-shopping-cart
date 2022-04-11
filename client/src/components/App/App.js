import React, { createContext } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Routes, Route, useNavigate } from 'react-router-dom'
import Orders from "../../pages/Orders/Orders";
import Home from "../../pages/Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Main from "../Main/Main";
import CreateProduct from "../CreateProduct/CreateProduct";
import { GetRequest } from "../../utils/requests";
import Profile from "../../pages/Profile/Profile";


export const handleLoggedContext = createContext();

const App = () => {
  const navigate = useNavigate();


  async function handleLogged(url) {
    try {
      const res = await GetRequest(url)
      console.log("handleLogged", res)
      if (res.status === 401) {
        navigate('/login');
      } else {
        navigate(url);
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <handleLoggedContext.Provider value={handleLogged}>
      <div className="layout">
        <Header />

        <Routes>
          <Route exact={'true'} path="/" element={<Main />} />
          <Route exact={'true'} path="/products" element={<Home />} />
          <Route exact={'true'} path="/orders" element={<Orders />} />
          <Route exact={'true'} path="/login" element={<Login />} />
          <Route exact={'true'} path="/signup" element={<SignUp />} />
          <Route exact={'true'} path="/profile" element={<Profile />} />
          <Route exact={'true'} path="/create-product" element={<CreateProduct />} />
          <Route path="*" element={<div> Error! PAGE NOT FOUND </div>} />
        </Routes>

        <Footer />
      </div>
    </handleLoggedContext.Provider>
  )
}

export default App;
