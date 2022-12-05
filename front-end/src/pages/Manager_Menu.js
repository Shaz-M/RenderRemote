import React from 'react'
import { useEffect,useState } from "react";
import { getMenuItems, updateMenuPrice } from '../services/menuService';
import AddMenuItemForm from '../components/AddMenuItemForm';
import { addMenuItemQuery } from '../services/menuService';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MenuTable from '../components/MenuTable';
import "../styles/MenuTable.css"
import UpdateMenuPriceForm from '../components/UpdateMenuPriceForm';

function Manager_Menu({setManagerNav}) {
    const [menuItems, setMenuItems] = useState([]);
    const [updated,setUpdated] = useState(false);
    setManagerNav(true);

    useEffect(() => {
      getMenuItems().then(response => {
        setMenuItems(response);
    })
      setUpdated(false);
    },[updated])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(event.target);
        let item_name = event.target.item_name.value;
        let quantity = event.target.quantity.value;
        let price = event.target.price.value;
        let food_type = event.target.food_type.value;
        let response = await addMenuItemQuery(item_name,quantity,price,food_type);
        event.target.reset();
        setUpdated(true);
    }

    const handleSubmitUpdate = async (event) =>{
      event.preventDefault();
      let id = event.target.id.value;
      let price = event.target.price.value;
      let response = await updateMenuPrice(id,price);
      event.target.reset();
      setUpdated(true);

  }


  if(menuItems.length!==0){

    return (
      <div>
        <Container>
          <div className='menu'>
              <center> 
                  <h1 className='menuTitle'> Menu Items </h1> 
              </center>
          </div>

          <Row className="row">
            <Col className="box" sm={6}> 
              <div className='tableTitle'>ENTREES</div>
              <MenuTable items={menuItems.entrees}/>
            </Col>
            <Col className="box" sm={6}> 
              <div className='tableTitle'>DRINKS</div>
              <MenuTable items={menuItems.drinks}/>

            </Col>
          </Row>

          <Row>
            <Col className="box" sm={6}> 
              <div className='tableTitle'>SIDES</div>
              <MenuTable items={menuItems.sides}/>

            </Col>
            <Col className="box" sm={6}> 
              <div className='tableTitle'>CONDIMENTS</div>
              <MenuTable items={menuItems.condiments}/>
            </Col>
          </Row>

          <AddMenuItemForm handleSubmit={handleSubmit}/>
          <UpdateMenuPriceForm handleSubmit={handleSubmitUpdate}/>
      </Container>
      </div>
    );

  }

  return (
    <div></div>
  )
}


export default Manager_Menu
