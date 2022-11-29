import React from 'react'
import { useEffect,useState } from "react";
import { getInventoryItems } from '../services/menuService';
import AddMenuItemForm from '../components/AddMenuItemForm';
import { updateInventory } from '../services/menuService';
import UpdateInvForm from '../components/UpdateInvForm';
import '../styles/Manager.css';


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
        let id = event.target.id.value;
        let quantity = event.target.quantity.value;
        let response = await updateInventory(id,quantity);
    }


  if(inventory.length!==0){

    return (
        <div className='inventory_div'>
          <div className='inventory_menu'>
              <center> 
                  <h1 className='Title'> Inventory Items </h1> 
              </center>
              <table align='center'>
                <tr>
                  <th>ID </th>
                  <th>Name        </th>
                  <th>Left</th>
                </tr>
              </table>  
          </div>

            {inventory.inventory.map(item => {
                
                    return (
                      <div className='map_inventory'>
                      <table>
                      <tr>
                        <td className='id'>{item.inventory_id}</td>
                        <td className='name'>{item.inventory_name}</td>
                        <td className='quantity'>{item.inventory_quantity}</td>
                      </tr>
                      </table>
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