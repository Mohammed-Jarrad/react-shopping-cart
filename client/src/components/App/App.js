import React from "react";
import { words } from "../../words";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const App = () => {
  return (
    <div className="layout">
      <Header />
      <main>
        {words.content}
      </main>
      <Footer />
    </div>
  )
}

export default App;
