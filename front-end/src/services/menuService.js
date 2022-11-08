export async function getMenuItems(){

    try{
        const response = await fetch('http://localhost:5000/api/menu_items');
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