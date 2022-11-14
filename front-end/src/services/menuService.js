export async function getMenuItems(){

    try{
        const response = await fetch('http://localhost:5000/api/menu_items');
        return await response.json();
    }
    catch(error){
        return [];
    }
}

export async function getInventoryItems(){

    try{
        const response = await fetch('http://localhost:5000/api/inventory');
        return await response.json();
    }
    catch(error){
        return [];
    }
}

export async function submitOrder(firstname,lastname,payment_method,order_items,total){

    const response = await fetch('http://localhost:5000/api/submit_order',{
        method:'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({firstname:firstname,lastname:lastname,payment_method:payment_method,total:total,order_items:order_items})
    });

    return await response;
}

export async function addMenuItemQuery(item_name,quantity,price,food_type){
    const response = await fetch('http://localhost:5000/api/submit_menuItem',{
        method:'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item_name:item_name,quantity:quantity,price:price,food_type})
    });

    return await response;

}


export async function updateInventory(id,quantity){
    const response = await fetch('http://localhost:5000/api/update_inventory',{
        method:'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:id,quantity:quantity})
    });

    return await response;

}

export async function getSalesReport(start,end){
    const response = await fetch('http://localhost:5000/api/sales_report',{
        method:'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({start:start,end:end})
    });

    return await response.json();

}

export async function getExcessReport(date){
    const response = await fetch('http://localhost:5000/api/excess_report',{
        method:'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({date:date})
    });

    return await response.json();

}

export async function getRestockReport(){

    try{
        const response = await fetch('http://localhost:5000/api/restock_report');
        return await response.json();
    }
    catch(error){
        return [];
    }
}

export async function getSalesTog(start,end){
    const response = await fetch('http://localhost:5000/api/sales_together',{
        method:'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({start:start,end:end})
    });

    return await response.json();

}