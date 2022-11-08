import React, { useState, useEffect } from "react";
import { submitOrder } from "../services/menuService";
import OrderForm from "../components/OrderForm";

const Cart = ({ cart }) => {

    var total = cart.reduce((sum,a) => sum+parseFloat(a.price),0);

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(event.target);
        let fname = event.target.fname.value;
        let lname = event.target.lname.value;
        let payment_method = event.target.payment_type.value;
        let order_items = cart;
        let response = await submitOrder(fname,lname,payment_method,order_items,total);
    }


    return(
    <div>
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