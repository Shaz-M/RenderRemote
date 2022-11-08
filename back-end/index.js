const express = require('express');
const dbs = require('./dbManager.js');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
var cors = require('cors');


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
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    const data = {name: 'Mario'};
    res.render('index', data);
});

app.get('/manager', async (req, res) =>  {
    result = await dbs.queryDatabase('SELECT * FROM teammembers;');
    const data = {teammembers: result};
    res.render('manager', data);       
});

app.get('/api/menu_items', async (req,res) => {
    entrees = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Entrée';");
    sides = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Side';");
    drinks = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Drink';");
    condiments = await dbs.queryDatabase("SELECT * FROM menu_items where food_type='Condiment';");

    const data = {entrees:entrees,sides:sides,drinks:drinks,condiments:condiments};
    res.json(data);
});

app.post('/api/submit_order', async (req,res) =>{
    
    console.log("SERVER RECIEVED");
    console.log(req.body);
    res.end();

    
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
