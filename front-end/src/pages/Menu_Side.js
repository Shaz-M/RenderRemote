import React from 'react'
import { MenuList } from '../helpers/MenuList'
import MenuItem from '../components/MenuItem';
import { getMenuItems } from '../services/menuService';
import '../styles/Menu.css';
import { useEffect,useState } from "react";


function Menu_Side({handleClick, remove, countItem}) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(response => {
      setMenuItems(response);
  })

  },[])

  function images_side(item_id){
    //console.log("yes");
    for(let obj in MenuList){
      //console.log(typeof MenuList[obj].id + " "  + typeof item_id.toString());
      if(MenuList[obj].id == item_id.toString()){
        //console.log("goes inside");
        return MenuList[obj].image;
      }
    }
  }


  if(menuItems.length!==0){

    return (
      <div className='menu'>
          <h1 className='menuTitle'> Sides</h1>
          <div className='menuList'>

            <div className='side'>
                {menuItems.sides.map(menuItem => {
                  return <MenuItem 
                  key={menuItem.item_id}
                  image={images_side(menuItem.item_id)}
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

export default Menu_Side
