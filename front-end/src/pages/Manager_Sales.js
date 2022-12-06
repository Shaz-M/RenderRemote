import React from 'react'
import { useEffect,useState } from "react";
import { getSalesReport } from '../services/menuService';
import ReportQueryForm from '../components/ReportQueryForm';
import '../styles/Manager.css';

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
      // <div className='menu'>
      //       <center> 
      //           <h1 className='Title'> Sales Report </h1> 
      //           <p>Given a timeframe, check the quanity sold for all products sold to customers. Input a start and end date (mm/dd/yyyy).</p>
      //       </center>
      // </div>
        <div>
          <div className='menu'>
          <center> 
              <h1 className='Title'> Sales Report </h1> 
              <p>Given a timeframe, check the quanity sold for all products sold to customers. Input a start and end date (mm/dd/yyyy).</p>
         </center>
          </div>
          <div className='sales_report_name_count'>
          <table>
                <tr>
                  <th>Name</th>
                  <th>Left</th>
                </tr>
              </table> 
              </div>

            {sales.sales_report.map((item,index) => {
                
                    return (
                        <div className='manger_sales_table' key={index}>  
                          <table>
                          <tr>
                            <td className='id'>{item.item_name}</td>
                            <td className='name'>{item.count}</td>
                          </tr>
                          </table>                
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
                <h1 className='Title'> Sales Report </h1> 
                <p>Given a timeframe, check the quanity sold for all products sold to customers. Input a start and end date (mm/dd/yyyy).</p>
            </center>
      </div>
      <div className='reportqueryform'>
        <ReportQueryForm className= "report_form" handleSubmit={handleSubmit} />
      </div>
    </div>
  )
}


export default Manager_Sales