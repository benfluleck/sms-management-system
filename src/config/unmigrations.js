import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

import { dropUsersTable } from '../models/user';

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

dropUsersTable(pool);

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

