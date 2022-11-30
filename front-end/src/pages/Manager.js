import React from "react";
import { useEffect,useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Container from "react-bootstrap/Container"
import "../styles/MenuTable.css"
import { getSales } from "../services/menuService";
import { dasherize } from "prelude-ls";



const options =  {  
    scales: {
        x: {
            ticks: {
                maxTicksLimit: 10
            },
            grid:{
              display:false
            }

        },
        y:{
          grid:{
            display:false
          }
        }
    },
    plugins: {
      legend: {
          display: false,
      }
  }

}

  


function Manager({setManagerNav}) {
  setManagerNav(true);

  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp_date = [];
    let temp_data = [];
    getSales().then(response => {
      for(let item in response.sales){
        temp_date.push(response.sales[item].sales_date.slice(0,10));
        temp_data.push(response.sales[item].sales_total_revenue);
      }

      setDates(temp_date);
      setData(temp_data);
  })
});

const lineData = {
  labels: dates,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255, 99, 132,0.3)",
      borderColor: "red",
      data: data,
      fill:true,
      lineTension: 0.4,
    },
  ],
};




  if(dates.length === 0 || data.length === 0){
    return(<div></div>)
  }
  else{
    lineData.labels = dates;
    lineData.datasets[0].data = data;
  }

  return (
    <div>
      <Container>
          <center class="menu"> 
                <h1 className='menuTitle'> Manager Dashboard </h1> 
            </center>
        <div className="lineChart">
          <Line data={lineData} options={options}/>
        </div>
      </Container>
    </div>
  );
}

export default Manager;