import React from 'react'
import { useEffect,useState } from "react";
import { getSalesTog } from '../services/menuService';
import ReportQueryForm from '../components/ReportQueryForm';

function Manager_SalesTog({setManagerNav}) {
    const [together, setTogether] = useState([]);
    setManagerNav(true);


    const handleSubmit = async (event) =>{
        event.preventDefault();
        let start = event.target.start.value;
        let end = event.target.end.value;
        let response = await getSalesTog(start,end);
        console.log(response);
        setTogether(response);
    }


  if(together.length!==0){

    return (
        <div>
          
            {together.sales_together.map((item,index) => {
                
                    return (
                        <div key={index}>                    
                            <div>{item.item1} | {item.item2} | Number of Sales: {item.count} </div>
                        </div>
                            )
                        
                })}

            <ReportQueryForm handleSubmit={handleSubmit} />

        </div>
    )

  }

  return (
    <div>
      <div className='menu'>
            <center> 
                <h1 className='menuTitle'> Sales Together </h1> 
                Items Sold in Pairs and their Frequency Sold Together
            </center>
      </div>
      <ReportQueryForm handleSubmit={handleSubmit} />
    </div>
  )
}


export default Manager_SalesTog