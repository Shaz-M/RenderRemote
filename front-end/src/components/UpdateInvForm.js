import React from "react";

function UpdateInvForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
          <label for="id">Inventory ID:</label><br/>
            <input type="text" id="id" name="id"/><br/> 

            <label for="quantity">New Quantity:</label><br/>
            <input type="text" id="quantity" name="quantity"/><br/> 
            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default UpdateInvForm;