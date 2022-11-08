import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; // routes is Switch
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import React, { useState, useEffect } from "react";

function App() {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);

  const handleClick = (item) => {
    console.log("here");
    setCart([...cart, item]);
  };

  return <div className="App">
    <Router>
    <Navbar setShow={setShow} size={cart.length}/>
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/menu' exact element={show? (<Menu handleClick={handleClick}/>):(<Cart cart={cart} />)} />
    </Routes>
    </Router>
  </div>
}

export default App;
