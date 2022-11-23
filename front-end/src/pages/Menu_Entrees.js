import React from 'react'
import MenuItem from '../components/MenuItem';
import { getMenuItems } from '../services/menuService';
import '../styles/Menu.css';
import { useEffect,useState } from "react";


function Menu_Entrees({handleClick, remove, countItem}) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(response => {
      setMenuItems(response);
  })

  },[])


  if(menuItems.length!==0){

    return (
      <div className='menu'>
          <h1 className='menuTitle'> Entrees</h1>
          <div className='menuList'>
            <div className='entree'>
              {menuItems.entrees.map(menuItem => {
                return <MenuItem 
                key={menuItem.item_id}
                image={menuItem.image}
                item={menuItem}
                handleClick={handleClick}
                remove={remove}
                countItem={countItem}
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

export default Menu_Entrees
