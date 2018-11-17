import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

import { createUsersTable } from '../models/user';

const { Pool } = pg;

let DB_NAME;

if (process.env.NODE_ENV === 'development') {
    DB_NAME = process.env.DEVELOPMENT_DB_URL;
}


const pool = new Pool({
    connectionString: DB_NAME
});

pool.on('connect', () => {
    console.log('connected to the database');
});

createUsersTable(pool);

pool.on('remove', () => {
    process.exit(0);
});

