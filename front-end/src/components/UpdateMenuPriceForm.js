import React from "react";



function UpdateMenuPriceForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
          <label for="id" className="item_id">Item ID:</label><br/>
            <input type="text" id="id" name="id" className="item_id_text"/><br/> 

            <label for="price" className="price">New Price:</label><br/>
            <input type="text" id="price" name="price" className="price_text"/><br/> 
            <input type="submit" value="Submit" className="submit_bttn_inv"></input>
        </form>
    );
}

export default UpdateMenuPriceForm;