import React from 'react'
import { MenuList } from '../helpers/MenuList'
import MenuItem from '../components/MenuItem';
import { getMenuItems } from '../services/menuService';
import '../styles/Menu.css';
import { useEffect,useState } from "react";


function Menu_Condiments({handleClick}) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(response => {
      setMenuItems(response);
  })

  },[])


  if(menuItems.length!==0){

    return (
      <div className='menu'>
          <h1 className='menuTitle'> Condiments</h1>
          <div className='menuList'>

            <div className='condiments'>
                {menuItems.condiments.map(menuItem => {
                  return <MenuItem 
                  key={menuItem.item_id}
                  image={null}
                  item={menuItem}
                  handleClick={handleClick}
                  />
                })}
            </div>

            
          </div>
        
      </div>
    )

  }

  return (
    <div></div>
  )
  
}

export default Menu_Condiments
