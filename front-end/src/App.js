import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; // routes is Switch
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Menu_Entrees from './pages/Menu_Entrees';
import Menu_Side from './pages/Menu_Side';
import Menu_Drink from './pages/Menu_Drink';
import Menu_Condiments from './pages/Menu_Condiments';
import Manager from './pages/Manager';
import ManagerNavbar from './components/ManagerNavbar';
import Manager_Menu from './pages/Manager_Menu';
import Manager_Inventory from './pages/Manager_Inventory';
import React, { useState, useEffect } from "react";

function App() {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [managerNav, setManagerNav] = useState(false);

  const handleClick = (item) => {
    console.log("here");
    setCart([...cart, item]);
  };
  console.log(managerNav);

  return <div className="App">
    <Router>
      {managerNav?(<ManagerNavbar setManagerNav={setManagerNav}/>) :(<Navbar setShow={setShow} size={cart.length}/>)}
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/manager' exact element={<Manager setManagerNav={setManagerNav} />} />
      <Route path='/manager/menu_items' exact element={<Manager_Menu setManagerNav={setManagerNav} />} />
      <Route path='/manager/inventory' exact element={<Manager_Inventory setManagerNav={setManagerNav} />} />
      <Route path='/menu' exact element={show? (<Menu handleClick={handleClick}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/entrees' exact element={show? (<Menu_Entrees handleClick={handleClick}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/side' exact element={show? (<Menu_Side handleClick={handleClick}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/drinks' exact element={show? (<Menu_Drink handleClick={handleClick}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/condiments' exact element={show? (<Menu_Condiments handleClick={handleClick}/>):(<Cart cart={cart} />)} />



    </Routes>
    </Router>
  </div>
}

export default App;
