import React from 'react'
import { useEffect,useState } from "react";
import { getSalesReport } from '../services/menuService';
import ReportQueryForm from '../components/ReportQueryForm';

function Manager_Sales({setManagerNav}) {
    const [sales, setSales] = useState([]);
    setManagerNav(true);


    const handleSubmit = async (event) =>{
        event.preventDefault();
        let start = event.target.start.value;
        let end = event.target.end.value;
        let response = await getSalesReport(start,end);
        console.log(response);
        setSales(response);
    }


  if(sales.length!==0){

    return (
        <div>
            {sales.sales_report.map((item,index) => {
                
                    return (
                        <div key={index}>                    
                            <div>{item.item_name} | {item.count} </div>
                        </div>
                            )
                        
                })}

            <ReportQueryForm handleSubmit={handleSubmit} />

        </div>
    )

  }

  return (
    <div>
      <ReportQueryForm handleSubmit={handleSubmit} />
    </div>
  )
}


export default Manager_Sales