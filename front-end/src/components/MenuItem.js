import React from "react";
import '../styles/Button.css';

function MenuItem({ image,item,handleClick, remove, countItem}) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {item.item_name} </h1>
      <p> ${item.price} </p>
      <div className="carts">
      <button className='addcart' onClick={() => handleClick(item)}> Add to Cart </button>
      <a>{ "  " }</a>
      <button className='removecart' onClick={() => remove(item)}> Remove from Cart </button>
      <br/>
      <a>Quantity: {countItem(item)}</a>
      </div>
    </div>
  );
}

export default MenuItem;