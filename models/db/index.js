require('dotenv').config();
const { Pool } = require('pg');

const database = process.env.NODE_ENV === 'test' ? process.env.DB_DEV_DATABASE_TEST : process.env.DB_DEV_DATABASE;
const pool = new Pool({
    host: process.env.DB_DEV_HOST,
    port: process.env.DB_DEV_PORT,
    user: process.env.DB_DEV_USER,
    password: process.env.DB_DEV_PASSWORD,
    database,
});

pool.connect();
    // .then( () => )
    // .catch( () => );

module.exports = pool;