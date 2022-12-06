const express = require('express');
const dbs = require('./dbManager.js');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
var cors = require('cors');
const axios = require('axios');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Create express app
const app = express();
const port = 5000;

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:'Chick-Fil-A POS',
            description:"Chick-Fil-A POS Documentation",
            contact: {
                name:"Team 53"
            },
            servers:["http://localhost:5000"]
        }
    },
    apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs));

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

/**
 * @swagger
 * /api/menu_items:
 *  get:
 *      description: Use to request all menu items from database
 *      responses:
 *          '200':
 *              description: A sucessful response
 */
app.get('/api/menu_items', async (req,res) => {
    entrees = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Entrée';");
    sides = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Side';");
    drinks = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Drink';");
    condiments = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Condiment';");

    const data = {entrees:entrees,sides:sides,drinks:drinks,condiments:condiments};
    res.json(data);
});

/**
 * @swagger
 * /api/sales:
 *  get:
 *      description: Use to request sales history from database
 *      responses:
 *          '200':
 *              description: A sucessful response
 */
app.get('/api/sales', async (req,res) => {
    sales = await dbs.queryDatabase("SELECT * FROM sales ORDER BY sales_date;");

    const data = {sales:sales};
    res.json(data);
});

/**
 * @swagger
 * /api/barChartSales:
 *  get:
 *      description: Use to request sales for each specific menu item
 *      responses:
 *          '200':
 *              description: A sucessful response
 */
app.get('/api/barChartSales', async (req,res) => {
    sales = await dbs.queryDatabase("SELECT m.item_name,count(m.item_name) FROM order_menu o JOIN menu_items m ON o.item_id = m.item_id JOIN orders_cfa p ON o.order_id = p.order_id GROUP BY m.item_name ORDER BY count DESC;");

    const data = {sales:sales};
    res.json(data);
});


/**
 * @swagger
 * /api/pieChartSales:
 *  get:
 *      description: Use to request sales by category from database
 *      responses:
 *          '200':
 *              description: A sucessful response
 */
app.get('/api/pieChartSales', async (req,res) => {
    sales = await dbs.queryDatabase("SELECT m.food_type,count(m.item_name) FROM order_menu o JOIN menu_items m ON o.item_id = m.item_id JOIN orders_cfa p ON o.order_id = p.order_id GROUP BY m.food_type ORDER BY count;");

    const data = {sales:sales};
    res.json(data);
});


/**
 * @swagger
 * /api/inventory:
 *  get:
 *      description: Use to request all inventory items from database
 *      responses:
 *          '200':
 *              description: A sucessful response
 */
app.get('/api/inventory', async (req,res) => {
    inventory = await dbs.queryDatabase("SELECT * FROM inventories;");

    const data = {inventory:inventory};
    res.json(data);
});


/**
 *  @swagger
 * /api/locations:
 *   post:
 *     description: given latitude and longitude api queries all Chick-Fil-A locations around a given radius
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: location
 *         description: The location to query
 *         schema:
 *           type: object
 *           required:
 *             - lat
 *             - lng
 *           properties:
 *             lat:
 *               type: string
 *             lng:
 *               type: string
 *     responses:
 *          '200':
 *              description: returns all locations from query
 */
app.post('/api/locations', async (req,res) => {
    lat = req.body.lat;
    lng = req.body.lng;
    let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+'%2C'+lng+'&radius=300000&keyword=Chick-fil-A&key=AIzaSyA8oguzweCmBK3KUJTIckl3rdRO17iKQjg';
    locations = await axios.get(url);
    const data = {locations:locations.data.results};
    res.send(data);
});


/**
 *  @swagger
 * /api/submit_menuItem:
 *   post:
 *     description: Adds a menu item to database
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Menu Item
 *         description: The menu item object
 *         schema:
 *           type: object
 *           required:
 *             - item_name
 *             - quantity
 *             - price
 *             - food_type
 *           properties:
 *             item_name:
 *               type: string
 *             quantity:
 *               type: string
 *             price:
 *               type: string
 *             food_type:
 *               type: string
 */
app.post('/api/submit_menuItem',async (req,res) =>{
    item_ID = Math.floor(Math.random() * 800000000);

    let sql = "INSERT INTO menu_items VALUES('"+item_ID+"','"+req.body.item_name+"','"+req.body.quantity+"','"+req.body.price+"','"+req.body.food_type+"');";
    await dbs.queryDatabase(sql);
    res.end();
});

/**
 *  @swagger
 * /api/add_inventory:
 *   post:
 *     description: Adds an inventory item to database
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Inventory Item
 *         description: The inventory item object
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - quantity
 *           properties:
 *             name:
 *               type: string
 *             quantity:
 *               type: string
 */
app.post('/api/add_inventory',async (req,res) =>{
    inventory_ID = Math.floor(Math.random() * 800000000);

    let sql = "INSERT INTO inventories VALUES('"+inventory_ID+"','"+req.body.name+"','"+req.body.quantity+"');";
    await dbs.queryDatabase(sql);
    res.end();
});

/**
 *  @swagger
 * /api/update_inventory:
 *   post:
 *     description: Updates quantity of inventory item
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Inventory Item
 *         description: The Inventory item object
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - quantity
 *           properties:
 *             id:
 *               type: string
 *             quantity:
 *               type: string
 */
app.post('/api/update_inventory',async (req,res) =>{
    console.log(req.body);
    id = req.body.id;
    quantity = req.body.quantity;

    let sql = "UPDATE inventories SET inventory_quantity='"+quantity+"'WHERE inventory_id='"+id+"';"
    await dbs.queryDatabase(sql);
    res.end();

});

/**
 *  @swagger
 * /api/update_menu_price:
 *   post:
 *     description: Updates the price of a menu item in the database
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Menu Item
 *         description: The menu item object
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - price
 *           properties:
 *             id:
 *               type: string
 *             price:
 *               type: string
 */
app.post('/api/update_menu_price',async (req,res) =>{
    console.log(req.body);
    id = req.body.id;
    price = req.body.price;

    let sql = "UPDATE menu_items SET price='"+price+"'WHERE item_id='"+id+"';"
    await dbs.queryDatabase(sql);
    res.end();

});

/**
 *  @swagger
 * /api/submit_order:
 *   post:
 *     description: Submits an order to the database and updates inventory accordingly
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Order
 *         description: The order object
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - price
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             total:
 *               type: string
 *             payment_method:
 *               type: string
 *             order_items:
 *               type: string
 */
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

/**
 * @swagger
 * /api/restock_report:
 *  get:
 *      description: returns all items that need to be restocked
 *      responses:
 *          '200':
 *              description: A sucessful response
 */
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


/**
 *  @swagger
 * /api/excess_report:
 *   post:
 *     description: given a date return the item in excess since that date
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Dates
 *         description: The date to query
 *         schema:
 *           type: object
 *           required:
 *             - date
 *           properties:
 *             date:
 *               type: string
 *     responses:
 *          '200':
 *              description: returns excess report
 */
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

/**
 *  @swagger
 * /api/sales_report:
 *   post:
 *     description: given two dates api returns the sales of each menu item
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Dates
 *         description: The dates to query
 *         schema:
 *           type: object
 *           required:
 *             - start
 *             - end
 *           properties:
 *             start:
 *               type: string
 *             end:
 *               type: string
 *     responses:
 *          '200':
 *              description: returns sales for all menu items in the given range
 */
app.post('/api/sales_report', async (req,res) => {
    start = req.body.start;
    end = req.body.end;
    sql = "SELECT m.item_name,count(m.item_name) FROM order_menu o JOIN menu_items m ON o.item_id = m.item_id JOIN orders_cfa p ON o.order_id = p.order_id WHERE p.order_date BETWEEN '"+start+"' AND '"+end+"' GROUP BY m.item_name;";
    value = await dbs.queryDatabase(sql);

    const data = {sales_report:value};
    res.send(JSON.stringify(data));
});








app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
