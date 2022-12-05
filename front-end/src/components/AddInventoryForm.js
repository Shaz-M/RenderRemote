import React from "react";

function AddInventoryForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
          <label for="name">Item Name:</label><br/>
            <input type="text" id="name" name="name"/><br/>
            <label for="quantity">Quantity:</label><br/>
            <input type="text" id="quantity" name="quantity"/><br/>
            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default AddInventoryForm;