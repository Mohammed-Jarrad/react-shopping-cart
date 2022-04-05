import React, { createContext } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Orders from "../../pages/Orders";
import Home from "../../pages/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Main from "../Main/Main";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

export const CurrentUserContext = createContext();

const App = () => {

  // get token and get all data for current user;
  let [cookie] = useCookies();
  function getCurrentUser() {
    if (cookie.jwt) {
      let decode_token = jwtDecode(cookie.jwt);
      localStorage.setItem('currentUser', JSON.stringify(decode_token));
      return decode_token.user;
    } else {
      localStorage.removeItem('currentUser');
      return '';
    }
  }

  return (
    <CurrentUserContext.Provider value={getCurrentUser()}>
      <BrowserRouter>
        <div className="layout">
          <Header />

          <Routes>
            <Route exact={'true'} path="/" element={<Main />} />
            <Route exact={'true'} path="/products" element={<Home />} />
            <Route exact={'true'} path="/orders" element={<Orders />} />
            <Route exact={'true'} path="/login" element={<Login />} />
            <Route exact={'true'} path="/signup" element={<SignUp />} />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider >
  )
}

export default App;
