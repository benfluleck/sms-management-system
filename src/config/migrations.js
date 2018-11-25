import pool from '../config/pool'
import { createUsersTable, dropUsersTable } from '../models/user';

export const startMigrations = async () => {
  await createUsersTable(pool)
}

export const dropMigrations = async () => {
  await dropUsersTable(pool)
}

