import React from 'react'
import { useEffect,useState } from "react";
import { getInventoryItems } from '../services/menuService';
import AddMenuItemForm from '../components/AddMenuItemForm';
import { updateInventory } from '../services/menuService';
import UpdateInvForm from '../components/UpdateInvForm';

function Manager_Inventory({setManagerNav}) {
    const [inventory, setInventory] = useState([]);
    setManagerNav(true);

    useEffect(() => {
      getInventoryItems().then(response => {
        setInventory(response);
    })
  
    },[])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(event.target);
        let id = event.target.id.value;
        let quantity = event.target.quantity.value;
        let response = await updateInventory(id,quantity);
    }


  if(inventory.length!==0){

    return (
        <div>
          <div className='menu'>
              <center> 
                  <h1 className='menuTitle'> Inventory Items </h1> 
              </center>
          </div>

            {inventory.inventory.map(item => {
                
                    return (
                        <div>                    
                            <div>ID:{item.inventory_id} | {item.inventory_name} - Quantity Left:{item.inventory_quantity}</div>
                        </div>
                            )
                        
                })}

            <UpdateInvForm handleSubmit={handleSubmit} />

        </div>
    )

  }

  return (
    <div></div>
  )
}


export default Manager_Inventory