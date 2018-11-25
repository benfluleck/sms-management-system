import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();


let DB_NAME;

if (process.env.NODE_ENV === 'test') {
  DB_NAME = process.env.TEST_DB_URL;
} else {
  DB_NAME = process.env.DEVELOPMENT_DB_URL;
}

const { Pool } = pg;

const pool = new Pool({
  connectionString: DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('connected to the database');
});


pool.on('remove', () => {
  console.log('remove to the database');
  process.exit(0);
});


export default pool;
