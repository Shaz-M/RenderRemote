import React from 'react'
import { useEffect,useState } from "react";
import { addInventory, getInventoryItems } from '../services/menuService';
import AddMenuItemForm from '../components/AddMenuItemForm';
import { updateInventory } from '../services/menuService';
import UpdateInvForm from '../components/UpdateInvForm';
import '../styles/Manager.css';
import AddInventoryForm from '../components/AddInventoryForm';


function Manager_Inventory({setManagerNav}) {
    const [inventory, setInventory] = useState([]);
    const [updated,setUpdated] = useState(false);
    setManagerNav(true);

    useEffect(() => {
      getInventoryItems().then(response => {
        setInventory(response);
    })
      setUpdated(false);

  
    },[updated])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        let id = event.target.id.value;
        let quantity = event.target.quantity.value;
        let response = await updateInventory(id,quantity);
        event.target.reset();
        setUpdated(true);

    }

    const handleSubmitAdd = async (event) =>{
      event.preventDefault();
      let name = event.target.name.value;
      let quantity = event.target.quantity.value;
      let response = await addInventory(name,quantity);
      event.target.reset();
      setUpdated(true);
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
                  <th>Name</th>
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
            <div className='Inv'>
              <div className='updateInv'>
                <p> Update Inventory Item </p>
                <UpdateInvForm handleSubmit={handleSubmit} />
              </div>
              <div className='AddInv'>
                <p> Add Inventory Item </p>
                <AddInventoryForm handleSubmit={handleSubmitAdd}/>
              </div>
            </div>

        </div>
    )

  }

  return (
    <div></div>
  )
}


export default Manager_Inventory