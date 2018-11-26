// Update with your config settings.
const path = require('path');
const pg = require('pg');
const config = require('./src/config');

require('dotenv').config();


pg.defaults.ssl = true;

const environment = process.env.NODE_ENV || 'development';

const migrations = {
  tableName: 'migrations',
  directory: path.normalize(path.join(__dirname, './src/migrations')),
}

const getConfigEnvironment = () => ({
  'development': {
    client: config.CLIENT,
    connection: config.DATABASE_URL,
    pool: {
      min: process.env.MIN_POOL_SIZE,
      max: process.env.MAX_POOL_SIZE
    },
    migrations: {...migrations}
  },
  'test': {
    client: config.CLIENT,
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {...migrations}
  }

})[ environment ];


module.exports = getConfigEnvironment();

