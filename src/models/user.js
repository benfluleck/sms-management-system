import { createTable, dropTable } from '../config/tables';

export const createUsersTable = (pool) => {
    const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          firstName VARCHAR(128) NOT NULL,
          lastName VARCHAR(128) NOT NULL,
          email VARCHAR(128) NOT NULL,
          password VARCHAR(128) NOT NULL,
          roleType INT NOT NULL,
          isAdmin BOOLEAN NOT NULL DEFAULT false,
          hasConfirmed BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMP,
          updated_at TIMESTAMP
        )`;

    createTable(queryText, pool);
};

export const dropUsersTable = (pool) => {
    const queryText = 'DROP TABLE IF EXISTS users';

    return dropTable(queryText, pool);
};

export const queries = {
    userExists: 'SELECT * FROM users WHERE email = $1',
    userInsert: `INSERT INTO
    users(id, firstName, lastName, email, password, roleType, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`,
};
