import React from "react";

function MenuItem({ image,item,handleClick}) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {item.item_name} </h1>
      <p> ${item.price} </p>
      <button onClick={() => handleClick(item)}>Add to Cart</button>
    </div>
  );
}

export default MenuItem;