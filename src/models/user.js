import { createTable, dropTable } from '../config/tables';

export const createUsersTable = async (pool) => {
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

  const response = await createTable(queryText, pool);
  return response
};

export const dropUsersTable = async (pool) => {
  const queryText = 'DROP TABLE IF EXISTS users';

  const response = await dropTable(queryText, pool);
  return response
};

export const queries = {
  userExists: 'SELECT * FROM users WHERE email = $1',
  createUser: `INSERT INTO
    users(id, firstName, lastName, email, password, roleType, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`,
  confirmEmail: 'UPDATE user SET hasConfirmed = true',
};
