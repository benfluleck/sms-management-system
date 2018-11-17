import { Pool } from 'pg';

import dotenv from 'dotenv';

dotenv.config();

let DB_NAME;

if (process.env.NODE_ENV === 'development') {
    DB_NAME = process.env.DEVELOPMENT_DB_URL;
}

const pool = new Pool({
    connectionString: DB_NAME,
});

export const query = (text, params) => {

    return new Promise((resolve, reject) => {
        pool.query(text, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
