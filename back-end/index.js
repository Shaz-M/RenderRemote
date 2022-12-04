const express = require('express');
const dbs = require('./dbManager.js');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
var cors = require('cors');
const axios = require('axios');


// Create express app
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Add process hook to shutdown pool
process.on('SIGINT', function() {
    pool.end();
    console.log('Application successfully shutdown');
    process.exit(0);
});

const bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    const data = {name: 'Mario'};
    res.render('index', data);
});

app.get('/api/menu_items', async (req,res) => {
    entrees = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Entrée';");
    sides = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Side';");
    drinks = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Drink';");
    condiments = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Condiment';");

    const data = {entrees:entrees,sides:sides,drinks:drinks,condiments:condiments};
    res.json(data);
});

app.get('/api/sales', async (req,res) => {
    sales = await dbs.queryDatabase("SELECT * FROM sales ORDER BY sales_date;");

    const data = {sales:sales};
    res.json(data);
});

app.get('/api/barChartSales', async (req,res) => {
    sales = await dbs.queryDatabase("SELECT m.item_name,count(m.item_name) FROM order_menu o JOIN menu_items m ON o.item_id = m.item_id JOIN orders_cfa p ON o.order_id = p.order_id GROUP BY m.item_name ORDER BY count DESC;");

    const data = {sales:sales};
    res.json(data);
});

app.get('/api/pieChartSales', async (req,res) => {
    sales = await dbs.queryDatabase("SELECT m.food_type,count(m.item_name) FROM order_menu o JOIN menu_items m ON o.item_id = m.item_id JOIN orders_cfa p ON o.order_id = p.order_id GROUP BY m.food_type ORDER BY count;");

    const data = {sales:sales};
    res.json(data);
});

app.get('/api/inventory', async (req,res) => {
    inventory = await dbs.queryDatabase("SELECT * FROM inventories;");

    const data = {inventory:inventory};
    res.json(data);
});

app.post('/api/locations', async (req,res) => {
    lat = req.body.lat;
    lng = req.body.lng;
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+'%2C'+lng+'&radius=300000&keyword=Chick-fil-A&key=AIzaSyA8oguzweCmBK3KUJTIckl3rdRO17iKQjg';
    locations = await axios.get(url);
    const data = {locations:locations.data.results};
    res.send(data);
});



app.post('/api/submit_menuItem',async (req,res) =>{
    item_ID = Math.floor(Math.random() * 800000000);

    let sql = "INSERT INTO menu_items VALUES('"+item_ID+"','"+req.body.item_name+"','"+req.body.quantity+"','"+req.body.price+"','"+req.body.food_type+"');";
    await dbs.queryDatabase(sql);
    res.end();
});

app.post('/api/add_inventory',async (req,res) =>{
    inventory_ID = Math.floor(Math.random() * 800000000);

    let sql = "INSERT INTO inventories VALUES('"+inventory_ID+"','"+req.body.name+"','"+req.body.quantity+"');";
    await dbs.queryDatabase(sql);
    res.end();
});

app.post('/api/update_inventory',async (req,res) =>{
    console.log(req.body);
    id = req.body.id;
    quantity = req.body.quantity;

    let sql = "UPDATE inventories SET inventory_quantity='"+quantity+"'WHERE inventory_id='"+id+"';"
    await dbs.queryDatabase(sql);
    res.end();

});

app.post('/api/update_menu_price',async (req,res) =>{
    console.log(req.body);
    id = req.body.id;
    price = req.body.price;

    let sql = "UPDATE menu_items SET price='"+price+"'WHERE item_id='"+id+"';"
    await dbs.queryDatabase(sql);
    res.end();

});

app.post('/api/submit_order', async (req,res) =>{
    
    console.log("SERVER RECIEVED");
    console.log(req.body);
    fname = req.body.firstname;
    lname = req.body.lastname;
    total = req.body.total;
    payment_type = req.body.payment_method;
    customer_UID = Math.floor(Math.random() * 800000000);
    order_UID = Math.floor(Math.random() * 800000000);
    date = new Date().toISOString().slice(0, 10);
    order_items = req.body.order_items;
    let sales_UID = 0;
    
    // if date not in sales then create table member
    // else use existing
    let curr_count = 0;
    let total_rev  = 0.0;

    let sql = "SELECT * FROM sales WHERE sales_date='"+date+"';";

    let valid = await dbs.queryDatabase(sql);

    if(valid.length===0){
        //create new entry
        sales_UID = Math.floor(Math.random() * 800000000);
        sql = "INSERT INTO sales VALUES('"+sales_UID+"','"+0.0+"','"+date+"','0','1');";
        await dbs.queryDatabase(sql);

    }
    else{
        sales_UID = valid[0].sales_id;
        curr_count = valid[0].sales_count;
        total_rev = valid[0].sales_total_revenue;
    }

    curr_count += order_items.length;
    total_rev = parseFloat(total_rev)+parseFloat(total);
    total_rev = total_rev.toFixed(2);

    //add sales to sales table
    sql = "UPDATE sales SET sales_total_revenue='"+total_rev+"',sales_count='"+curr_count+"' WHERE sales_date='"+date+"';";
    await dbs.queryDatabase(sql);


    // add customer info into customers table
    sql = "INSERT INTO customer VALUES('"+customer_UID+"','"+fname+"','"+lname+"','"+payment_type+"');";

    await dbs.queryDatabase(sql);

    // add order to database
    sql = "INSERT INTO orders_cfa VALUES('"+order_UID+"','"+date+"','"+customer_UID+"','"+total+"','"+sales_UID+"');";

    await dbs.queryDatabase(sql);

    // add order_menu mapping to database

    for (const item of order_items) {
        sql = "INSERT INTO order_menu VALUES('"+order_UID+"','"+item.item_id+"');";
        await dbs.queryDatabase(sql);
    }

    // update inventory after order in database

    var inventory_hash = new Map();

    for(const item of order_items){

        sql = "SELECT inventory_id FROM items_inventories WHERE item_id='"+item.item_id+"';";
        let response = await dbs.queryDatabase(sql);

    
        // for each inventory item check if its in hash map if it is decrement otherwise query and add
        for(const val of response){
            if(inventory_hash.has(val.inventory_id)){
                console.log(val.inventory_id);
                inventory_hash.set(val.inventory_id,inventory_hash.get(val.inventory_id)-1);
            }
            else{
                sql = "SELECT inventory_quantity FROM inventories WHERE inventory_id='"+val.inventory_id+"';";
                let res = await dbs.queryDatabase(sql);
                console.log(val.inventory_id+" "+res[0].inventory_quantity);
                inventory_hash.set(val.inventory_id,parseInt(res[0].inventory_quantity)-1);
            }
        }


    }

    //iterate through inventory map and update values in database

    for (var [key, value] of inventory_hash){
        sql = "UPDATE inventories SET inventory_quantity='"+value+"'WHERE inventory_id='"+key+"';";
        await dbs.queryDatabase(sql);
    }



    // TODO add order to sales




    res.end();

    
});

app.get('/api/restock_report', async (req,res) => {
    restock = await dbs.queryDatabase("SELECT * FROM inventories where inventory_quantity < 50;");

    const data = {restock_report:restock};
    res.json(data);
});


app.post('/api/sales_together', async (req,res) => {
    start = req.body.start;
    end = req.body.end;
    sql = "SELECT DISTINCT GREATEST(a.item_id, b.item_id), LEAST(a.item_id, b.item_id), count(*) as times_bought_together FROM order_menu AS a INNER JOIN order_menu AS b ON a.order_id = b.order_id JOIN orders_cfa p ON a.order_id = p.order_id AND b.order_id=p.order_id WHERE p.order_date between '"+start+"' AND '"+end+"' AND a.item_id != b.item_id GROUP BY a.item_id,b.item_id ORDER BY count(*) DESC Limit 15;";
    value = await dbs.queryDatabase(sql);
    sales = [];

    for(const element of value){
        let sql2 = "SELECT item_name from menu_items where item_id='"+element.greatest+"'";
        let temp = await dbs.queryDatabase(sql2);
        name1 = temp[0].item_name;
        sql2 = "SELECT item_name from menu_items where item_id='"+element.least+"'";
        temp = await dbs.queryDatabase(sql2);
        name2 = temp[0].item_name;

        obj = {item1:name1, item2:name2, count:element.times_bought_together};
        sales.push(obj);


    }

    const data = {sales_together:sales};
    res.send(data);
});


app.post('/api/excess_report', async (req,res) => {
    date = req.body.date;
    sql = "SELECT o.inventory_id,count(o.inventory_id) FROM items_inventories o JOIN menu_items m ON o.item_id = m.item_id JOIN order_menu t ON t.item_id = m.item_id JOIN orders_cfa p ON t.order_id = p.order_id WHERE p.order_date > '"+date+"' GROUP BY o.inventory_id;";
    
    excess = [];
    value = await dbs.queryDatabase(sql);
    for(const element of value){
        let total_sold = parseInt(element.count);
         sql2 = "SELECT * from inventories where inventory_id="+element.inventory_id;   
         item = await dbs.queryDatabase(sql2);
         curr_quantity = parseInt(item[0].inventory_quantity);
         item_name = item[0].inventory_name;

         let percent = total_sold/(total_sold+curr_quantity);

         if(percent<0.1){
            obj = {item_name:item_name, total_sold:total_sold, current_quantity:curr_quantity};
            excess.push(obj);

         }

         console.log(percent);
         
    }
    const data = {excess_report:excess};
    res.send(JSON.stringify(data));
});

app.post('/api/sales_report', async (req,res) => {
    start = req.body.start;
    end = req.body.end;
    sql = "SELECT m.item_name,count(m.item_name) FROM order_menu o JOIN menu_items m ON o.item_id = m.item_id JOIN orders_cfa p ON o.order_id = p.order_id WHERE p.order_date BETWEEN '"+start+"' AND '"+end+"' GROUP BY m.item_name;";
    value = await dbs.queryDatabase(sql);

    const data = {sales_report:value};
    res.send(JSON.stringify(data));
});








app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
