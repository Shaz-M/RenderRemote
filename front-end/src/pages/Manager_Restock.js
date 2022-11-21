import React from 'react'
import { useEffect,useState } from "react";
import { getRestockReport } from '../services/menuService';

function Manager_Restock({setManagerNav}) {
    const [restock, setRestock] = useState([]);
    setManagerNav(true);

    useEffect(() => {
      getRestockReport().then(response => {
        setRestock(response);
    })
  
    },[])


  if(restock.length!==0){

    return (
        <div>
          <div className='menu'>
              <center> 
                  <h1 className='menuTitle'> Restock Report </h1> 
                  Items that need to be Restocked and their Quantity
              </center>
          </div>
            {restock.restock_report.map((item,index) => {
                
                    return (
                        <div key={index}>                    
                            <div>{item.inventory_name} - Quantity Left:{item.inventory_quantity}</div>
                        </div>
                            )
                        
                })}

        </div>
    )

  }

  return (
    <div></div>
  )
}


export default Manager_Restock