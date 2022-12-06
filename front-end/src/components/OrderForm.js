import { borderRadius } from "@mui/system";
import React from "react";
import '../styles/Cart.css';


function OrderForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
            <label for="fname" className="col">First name:</label><br/>
            <input type="text" id="fname" name="fname" className="fname"/><br/>

            <label for="lname" className="col" >Last name:</label><br/>
            <input type="text" id="lname" name="lname" className="lname"/><br/>

            <input type="radio" id="card" name="payment_type" value="card"/>
            <label for="card">Card</label><br/>
            <input type="radio" id="cash" name="payment_type" value="cash"/>
            <label for="cash">Cash</label><br/>
            <input type="radio" id="gc" name="payment_type" value="giftcard"/>
            <label for="gc">Gift Card</label><br/>
            <input type="submit" value="Submit" className= "submit_bttn" style={{color: 'white', borderRadius: '15px', border: 'none'}}></input>
        </form>
    );
}



export default OrderForm;