import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const {
    POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_USER_TEST, ENV,
} = process.env;



const client: Pool = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});







// const client: Pool = ENV === 'dev' ? new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
// }) : new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB_TEST,
//     user: POSTGRES_USER_TEST,
//     password: POSTGRES_PASSWORD,
// });

export default client;
