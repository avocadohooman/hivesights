import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE_URL;

export default {
    PORT,
    DATABASE,

};
