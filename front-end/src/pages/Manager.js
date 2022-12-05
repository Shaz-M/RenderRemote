import React from "react";
import { useEffect,useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Container from "react-bootstrap/Container"
import "../styles/MenuTable.css"
import { getSales } from "../services/menuService";
import { getBarSales } from "../services/menuService";
import { getPieSales } from "../services/menuService";
import { dasherize } from "prelude-ls";
import { Bar } from "react-chartjs-2";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pie } from "react-chartjs-2";
import { withTheme } from "@material-ui/core";






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
      },
      title:{
        display:true,
        text:'Revenue Over Time'
      }
  }

}


const barOptions = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
          display: false,
      },
      title:{
        display:true,
        text:'Sales of Specific Menu Items'
      }
  }
}

const pieOptions = {
  plugins: {

    title:{
      display:true,
      text:'Sales Based on Category'
    }
}
}

  


function Manager({setManagerNav,managerAuth,setManagerAuth}) {

  const [dates, setDates] = useState([]);
  const [data, setData] = useState([]);

  const [barLabels, setBarLabels] = useState([]);
  const [barDataNum, setBarDataNum] = useState([]);

  const [pieLabels, setPieLabels] = useState([]);
  const [pieDataNum, setPieDataNum] = useState([]);

  function handleCallbackResponse(response){
    setManagerAuth(true);
    console.log("User Authenicated");
    //document.getElementById("signInDiv").hidden = true;
    //console.log("Encoded JWT ID token: ",response.credential);
    const boxes = document.querySelectorAll('.S9gUrf-YoZ4jf');
      console.log(boxes);
    boxes.forEach(box => {
      box.remove();
    });
  }

  useEffect(() => {
    setManagerNav(true);

    /* global google */
    google.accounts.id.initialize({
      client_id:"282294513169-1ftcl7oqtbdb40cbk5a7sug7uua1jdn9.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );

  },[managerAuth])

  function signOut(){
    setManagerAuth(false);
    console.log("User signed out");
  }



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

    let _barLabels = [];
    let _barData = [];

    getBarSales().then(response =>{
      for(let item in response.sales){
        if (typeof response.sales[item].item_name !== 'undefined'){
          _barLabels.push(response.sales[item].item_name);
          _barData.push(response.sales[item].count);
        }
      }

      setBarLabels(_barLabels);
      setBarDataNum(_barData);
    })

    let _pieLabels = [];
    let _pieData = [];

    getPieSales().then(response =>{
      for(let item in response.sales){
        if (typeof response.sales[item].food_type !== 'undefined'){
          _pieLabels.push(response.sales[item].food_type);
          _pieData.push(response.sales[item].count);
        }
        
      }

      setPieLabels(_pieLabels);
      setPieDataNum(_pieData);
    })
},[]);

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



const barData = {
  labels: barLabels,
  datasets: [{
      barPercentage: 0.5,
      barThickness: 6,
      maxBarThickness: 8,
      minBarLength: 2,
      data: barDataNum
  }]
};


const pieData = {
  datasets: [{
      data: pieDataNum,
      backgroundColor: ['#003f5c','#444e86','#955196','#dd5182','#ff6e54','#ffa600']
  }],

  // These labels appear in the legend and in the tooltips when hovering different arcs
  labels: pieLabels
}

if(managerAuth === false){
  return (<div id="signInDiv"></div>)
}


  if(dates.length === 0 || data.length === 0 || barDataNum.length == 0 || barLabels.length == 0){
    return(<div></div>)
  }
  else{
    lineData.labels = dates;
    lineData.datasets[0].data = data;
    barData.labels = barLabels;
    barData.datasets[0].data = barDataNum;
    pieData.labels = pieLabels;
    pieData.datasets[0].data = pieDataNum;
  }

  console.log(managerAuth);
  return (
    <div>
      <button type="button" onClick={signOut}>Sign Out</button>
      <Container>
          <center class="menu"> 
                <h1 className='menuTitle'> Manager Dashboard </h1> 
            </center>
        <div className="lineChart">
          <Line data={lineData} options={options}/>
        </div>

        <Row>
          <Col>
            <div className="smallerCharts">
              <Bar data={barData} options={barOptions} />
            </div>
          </Col>
          <Col>
          <div className="smallerCharts">
          <Pie data={pieData} options={pieOptions}/>
          </div>
            
          </Col>

        </Row>

      </Container>
  
    </div>
  );
}

export default Manager;