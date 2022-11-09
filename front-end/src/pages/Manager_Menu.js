import React from 'react'
import { useEffect,useState } from "react";
import { getMenuItems } from '../services/menuService';
import AddMenuItemForm from '../components/AddMenuItemForm';
import { addMenuItemQuery } from '../services/menuService';

function Manager_Menu({setManagerNav}) {
    const [menuItems, setMenuItems] = useState([]);
    setManagerNav(true);

    useEffect(() => {
      getMenuItems().then(response => {
        setMenuItems(response);
    })
  
    },[])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(event.target);
        let item_name = event.target.item_name.value;
        let quantity = event.target.quantity.value;
        let price = event.target.price.value;
        let food_type = event.target.food_type.value;
        let response = await addMenuItemQuery(item_name,quantity,price,food_type);
    }


  if(menuItems.length!==0){

    return (
        <div>
            {menuItems.condiments.map(menuItem => {
                
                    return <div>{menuItem.item_name} - {menuItem.quantity_left}</div>
                        
                })}

        {menuItems.drinks.map(menuItem => {
                    return <div>{menuItem.item_name} - {menuItem.quantity_left}</div>

                })}

{menuItems.sides.map(menuItem => {
                        return <div>{menuItem.item_name} - {menuItem.quantity_left}</div>

                })}
         {menuItems.entrees.map(menuItem => {
                        return <div>{menuItem.item_name} - {menuItem.quantity_left}</div>

                })}

        <AddMenuItemForm handleSubmit={handleSubmit} />


        </div>
    )

  }

  return (
    <div></div>
  )
}


export default Manager_Menu
