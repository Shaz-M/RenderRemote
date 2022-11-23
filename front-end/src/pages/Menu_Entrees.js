import React from 'react'
import MenuItem from '../components/MenuItem';
import { getMenuItems } from '../services/menuService';
import '../styles/Menu.css';
import { useEffect,useState } from "react";
import {MenuList} from "../helpers/MenuList"


function Menu_Entrees({handleClick, remove, countItem}) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(response => {
      setMenuItems(response);
  })

  },[])

  function images_entrees(item_id){
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
          <h1 className='menuTitle'> Entrees</h1>
          <div className='menuList'>
            <div className='entree'>
              {menuItems.entrees.map(menuItem => {
                return <MenuItem 
                key={menuItem.item_id}
                image={images_entrees(menuItem.item_id)}
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
