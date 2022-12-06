import React, { useState } from "react";
import Logo from '../assests/Chick-fil-A-Logo.png'
import Cart from '../assests/cart.png'
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/Navbar.css";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown'
// import Dropdown from './Dropdown'

function Navbar({ setShow, size, setServer, server}) {
  const [click, setClick]  = useState(false);
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <NavDropdown
              id="nav-dropdown-dark-example"
              title="Change View"
              menuVariant="dark"
            >      <Dropdown.Item className="dropItem" href="/">Customer</Dropdown.Item>
      <Dropdown.Item as={Link} onClick={() => setServer(true)} className="dropItem" to="/menu">Server</Dropdown.Item>
      <Dropdown.Item className="dropItem" as={Link} to="/manager">Manager</Dropdown.Item>
      </NavDropdown>
      </div>
      {!server? 
      (<div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/menu" onClick={() => setShow(true)}> Menu </Link>
        <Link to="/about"> About </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/locations"> Locations </Link>
        <div className="cart" onClick={() => setShow(false)}><img src={Cart} /> Cart - {size}</div>
        <button onClick={toggleNavbar}>
        
          <ReorderIcon />
        </button>
      </div>):
      (
        <div className="rightSide">
        <Link to="/menu" onClick={() => setShow(true)}> Menu </Link>
        <div className="cart" onClick={() => setShow(false)}><img src={Cart} /> Cart - {size}</div>
        <button onClick={toggleNavbar}>
        
          <ReorderIcon />
        </button>
      </div>
      )}
    </div>
  );
}

export default Navbar;
