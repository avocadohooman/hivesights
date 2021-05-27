import dotenv from 'dotenv';
dotenv.config();

let PORT = process.env.PORT;
let DATABASE = process.env.DATABASE_URL;

export default {
    PORT,
    DATABASE
};
