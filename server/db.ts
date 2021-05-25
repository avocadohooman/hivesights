import config from './utils/config';
require('dotenv').config();
const Pool = require("pg").Pool;


const pool = new Pool({
    connectionString:
        config.DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;