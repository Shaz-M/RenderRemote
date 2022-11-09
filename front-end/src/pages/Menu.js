import React from 'react'
import { MenuList } from '../helpers/MenuList'
import MenuItem from '../components/MenuItem';
import { getMenuItems } from '../services/menuService';
import '../styles/Menu.css';
import { useEffect,useState } from "react";
import Menu_Entrees from './Menu_Entrees';
import { Link } from "react-router-dom";


function myfunction() {
  console.log("CLICKED");
}
function Menu({handleClick}) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(response => {
      setMenuItems(response);
  })

  },[])


  if(menuItems.length!==0){

    return (
      <div className='menu'>
          <h1 className='menuTitle'> Our Menu</h1>
          <div className='menuList'>
            <div className='entree'>
              <Link to="/menu/entrees">
                <div className='entrees_b'>
                <button> Entrees </button>
                </div>
              </Link>
            </div>
            <div className='side'>
              <Link to="/menu/side">
                <button> Side </button>
              </Link>
            </div>
            <div className='drink'>
              <Link to="/menu/drinks">
                <button> Drinks </button>
              </Link>
            </div>
            <div className='condiments'>
              <Link to="/menu/condiments">
                <button> Condiments </button>
              </Link>
            </div>

            
          </div>
        
      </div>
    )

  }

  return (
    <div></div>
  )
  
}

export default Menu
