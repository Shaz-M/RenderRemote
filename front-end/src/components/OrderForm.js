import React from "react";

function OrderForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
          <label for="fname">First name:</label><br/>
            <input type="text" id="fname" name="fname"/><br/>
            <label for="lname">Last name:</label><br/>
            <input type="text" id="lname" name="lname"/><br/>
            <input type="radio" id="card" name="payment_type" value="Card"/>
            <label for="card">Card</label><br/>
            <input type="radio" id="cash" name="payment_type" value="Cash"/>
            <label for="cash">Cash</label><br/>
            <input type="radio" id="gc" name="payment_type" value="Gift Card"/>
            <label for="gc">Gift Card</label><br/>
            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default OrderForm;