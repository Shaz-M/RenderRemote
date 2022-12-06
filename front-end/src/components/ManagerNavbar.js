import React, { useState, useEffect } from "react";
import Logo from '../assests/Chick-fil-A-Logo.png'
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown'

import "../styles/Navbar.css";

function ManagerNavbar({ setManagerNav }) {
  const [openLinks, setOpenLinks] = useState(false);
  useEffect(() => {
      setManagerNav(true);
  }, []);

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
      <Dropdown.Item className="dropItem" href="#/action-2">Server</Dropdown.Item>
      <Dropdown.Item className="dropItem" as={Link} to="/manager">Manager</Dropdown.Item>
      </NavDropdown>
      </div>
      <div className="rightSide">
        <Link to="/manager"> Home </Link>
        <Link to="/manager/sales"> Sales </Link>
        <Link to="/manager/menu_items"> Menu Items </Link>
        <Link to="/manager/inventory"> Inventory </Link>
        <Link to="/manager/excess"> Excess </Link>
        {
          // <Link to="/manager/sales_together"> Sales Together </Link>
          // <Link to="/manager/restock"> Restock </Link> 
        }
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default ManagerNavbar;
