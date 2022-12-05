import React, { useState } from "react";
import Logo from '../assests/Chick-fil-A-Logo.png'
import Cart from '../assests/cart.png'
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/Navbar.css";
// import Dropdown from './Dropdown'

function Navbar({ setShow, size }) {
  const [click, setClick]  = useState(false);
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/menu"> Menu </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/menu" onClick={() => setShow(true)}> Menu </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/locations"> Locations </Link>
        <div className="cart" onClick={() => setShow(false)}><img src={Cart} /> Cart - {size}</div>
        <ReorderIcon color= 'white'><Link> Section </Link></ReorderIcon>
        <button onClick={toggleNavbar}>
        
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
