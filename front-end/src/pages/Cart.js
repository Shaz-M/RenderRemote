import React, { useState, useEffect } from "react";
import { submitOrder } from "../services/menuService";
import OrderForm from "../components/OrderForm";
import GoogleTranslate from "../components/GoogleTranslate"
import { Alert } from '@mui/material'

const Cart = ({ cart,setCart }) => {

    const [submitted,setSubmitted] = useState(false);

    var total = cart.reduce((sum,a) => sum+parseFloat(a.price),0);
    total = total.toFixed(2);
    total = parseFloat(total);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(event.target);
        let fname = event.target.fname.value;
        let lname = event.target.lname.value;
        let payment_method = event.target.payment_type.value;
        let order_items = cart;
        let response = await submitOrder(fname,lname,payment_method,order_items,total);
        event.target.reset();
        setCart([]);
        setSubmitted(true);
    }


    return(
    <div>
        {submitted &&
            <Alert varient='outlined' severity='success'>Order Submitted</Alert>
        }
        <div className='menu'>
            <center> 
                <h1 className='menuTitle'> Your Cart </h1> 
            </center>
        </div>

        {cart.map((item,index) => (
                <div key={index}>
                    {item.item_name} - {item.price}
                </div>
        ))}
        <div>
            ---------------------------<br/>
            Total Price: ${total}
        </div>
        <OrderForm handleSubmit={handleSubmit}/>
    </div>
    
    );
};

export default Cart;