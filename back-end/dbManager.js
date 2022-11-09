const { Pool } = require("pg");
const dotenv = require('dotenv').config();


const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

async function queryDatabase(sql){
    teammembers = []
    await pool
        .query(sql)
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                teammembers.push(query_res.rows[i]);
            }
        });
    return teammembers;
}

module.exports = {queryDatabase};