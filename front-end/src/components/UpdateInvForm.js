import React from "react";
import '../styles/Manager.css';



function UpdateInvForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
            <label for="id" className="inventory_id">Inventory ID:</label><br/>
            <input type="text" id="id" name="id" className="inventory_id_text"/><br/> 
            <br/>
            <label for="quantity" className="quantity">New Quantity:</label><br/>
            <input type="text" id="quantity" name="quantity" className="quantity_text"/><br/> 
            <br/>
            <input type="submit" value="Submit" className="submit_bttn_inv"></input>
        </form>
    );
}

export default UpdateInvForm;