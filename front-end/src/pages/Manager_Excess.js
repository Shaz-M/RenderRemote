import React from 'react'
import { useEffect,useState } from "react";
import { getExcessReport } from '../services/menuService';
import '../styles/Manager.css';


function Manager_Excess({setManagerNav}) {
    const [excess, setExcess] = useState([]);
    setManagerNav(true);


    const handleSubmit = async (event) =>{
        event.preventDefault();
        let date = event.target.date.value;
        let response = await getExcessReport(date);
        console.log(response);
        setExcess(response);
    }


  if(excess.length!==0){

    return (
        <div>
            <div className='menu'>
                <center> 
                    <h1 className='menuTitle'> Excess Report </h1> 
                    Items in Excess
                </center>
            </div>

            <div className='inventory_menu'>
                <table align='center'>
                    <tr>
                    <th>Total Sold </th>
                    <th>Name  </th>
                    <th>Current Quantity</th>
                    </tr>
                </table>
            </div>

            {excess.excess_report.map((item,index) => {
                
                    return (
                        <div key={index}>    
                        {                
                        //<div>{item.item_name} | {item.total_sold} | {item.current_quantity} </div>
                        }
                            <div className='map_inventory'>
                                <table align='center'>
                                    <tr>
                                        <td className='sold'>{item.total_sold}</td>
                                        <td className='name'>{item.item_name}</td>
                                        <td className='quantity'>{item.current_quantity}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                            )
                        
                })}

            <div>
                <form onSubmit={handleSubmit}>
                    <label for="date">Start Date:</label><br/>
                    <input type="text" id="date" name="date" placeholder="YYYY-MM-DD"/><br/>
                    <input type="submit" value="Submit"></input>
                    </form>
            </div>
            
        </div>
    )

  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='menu'>
                <center> 
                    <h1 className='menuTitle'> Excess Report </h1> 
                    Items in Excess
                </center>
            </div>

            <label for="date">Start Date:</label><br/>
            <input type="text" id="date" name="date" placeholder="YYYY-MM-DD"/><br/>
            <input type="submit" value="Submit"></input>
        </form>
    </div>
  )
}


export default Manager_Excess