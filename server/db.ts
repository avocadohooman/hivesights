/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import config from './utils/config';
require('dotenv').config();
const Pool = require("pg").Pool;

// Here connection to DB pool with DATABASE in .env + deactivating missing SSL rejection
const pool = new Pool({
    connectionString:
        config.DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;