import React from "react";

function AddMenuItemForm({handleSubmit}){
    return (
        <form onSubmit={handleSubmit}>
          <label for="item_name">Item Name:</label><br/>
            <input type="text" id="item_name" name="item_name"/><br/>
            <label for="quantity">Quantity:</label><br/>
            <input type="text" id="quantity" name="quantity"/><br/>
            <label for="price">price:</label><br/>
            <input type="text" id="price" name="price"/><br/>


            <input type="radio" id="entree" name="food_type" value="Entrée"/>
            <label for="entree">Entrée</label><br/>
            <input type="radio" id="drink" name="food_type" value="Drink"/>
            <label for="drink">Drink</label><br/>
            <input type="radio" id="side" name="food_type" value="Side"/>
            <label for="side">Side</label><br/>
            <input type="radio" id="condiment" name="food_type" value="Condiment"/>
            <label for="condiment">Condiment</label><br/>
            <input type="submit" value="Submit"></input>
        </form>
    );
}

export default AddMenuItemForm;