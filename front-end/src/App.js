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
import Manager_Sales from './pages/Manager_Sales';
import React, { useState, useEffect } from "react";
import Manager_Excess from './pages/Manager_Excess';
import Manager_Restock from './pages/Manager_Restock';
import Manager_SalesTog from './pages/Manager_SalesTog';
import Locations from './pages/Locations';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom";




function App() {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [managerNav, setManagerNav] = useState(false);
  const [managerAuth, setManagerAuth] = useState(false);

  

  const countItem = (item2) => {
    //console.log("here2");

    const array = cart.filter(item => item.item_name === item2.item_name);
    const count = array.length;
    return count;
  };

  const handleClick = (item) => {
    console.log("here");
    setCart([...cart, item]);
  };

  const remove = (item) => {
    console.log("there");

    
    var array = [...cart]; // make a separate copy of the array
    var index = array.map(function(e){return e.item_name;}).indexOf(item.item_name);
    if (index !== -1) {
      array.splice(index, 1);
      setCart(array);
    };
  }

  return <div className="App">
    <Router>
      {managerNav?(<ManagerNavbar setManagerNav={setManagerNav}/>) :(<Navbar setShow={setShow} size={cart.length}/>)}
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/manager' exact element={<Manager managerAuth={managerAuth} setManagerAuth={setManagerAuth} setManagerNav={setManagerNav} />} />
      <Route path='/manager/menu_items' exact element={managerAuth? (<Manager_Menu setManagerNav={setManagerNav}/>):(<Navigate to="/Manager"/>)} />
      <Route path='/manager/inventory' exact element={managerAuth? (<Manager_Inventory setManagerNav={setManagerNav} />):(<Navigate to="/Manager"/>)} />
      <Route path='/manager/sales' exact element={managerAuth? (<Manager_Sales setManagerNav={setManagerNav} />):(<Navigate to="/Manager"/>)} />
      <Route path='/manager/excess' exact element={managerAuth? (<Manager_Excess setManagerNav={setManagerNav} />) :(<Navigate to="/Manager"/>)}/>
      <Route path='/manager/restock' exact element={managerAuth? (<Manager_Restock setManagerNav={setManagerNav} />):(<Navigate to="/Manager"/>)} />
      <Route path='/manager/sales_together' exact element={managerAuth? (<Manager_SalesTog setManagerNav={setManagerNav} />):(<Navigate to="/Manager"/>)} />
      <Route path='/menu' exact element={show? (<Menu handleClick={handleClick}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/entrees' exact element={show? (<Menu_Entrees handleClick={handleClick} remove={remove} countItem={countItem} cart={cart}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/side' exact element={show? (<Menu_Side handleClick={handleClick} remove={remove} countItem={countItem} cart={cart}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/drinks' exact element={show? (<Menu_Drink handleClick={handleClick} remove={remove} countItem={countItem} cart={cart}/>):(<Cart cart={cart} />)} />
      <Route path='/menu/condiments' exact element={show? (<Menu_Condiments handleClick={handleClick} remove={remove} countItem={countItem} cart={cart}/>):(<Cart cart={cart} />)} />
      <Route path='/locations' exact element={<Locations />} />



    </Routes>
    </Router>
  </div>
}

export default App;
