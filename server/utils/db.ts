const Pool = require("pg").Pool;
require('dotenv').config();

const dataBaseConfig = process.env.DATABASE_URL; 

const pool = new Pool({
    connectionString:
        dataBaseConfig,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;