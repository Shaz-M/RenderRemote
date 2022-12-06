import React from "react";

function AddInventoryForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
          <label for="name">Item Name:</label><br/>
            <input type="text" id="name" name="name" className="item_name"/><br/>
            <br/>
            <label for="quantity">Quantity:</label><br/>
            <input type="text" id="quantity" name="quantity" className="quan_name"/><br/>
            <br/>
            <input type="submit" value="Submit" className="submit_bttn_inv"></input>
        </form>
    );
}

export default AddInventoryForm;