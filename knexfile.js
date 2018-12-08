const path = require('path');
const pg = require('pg');


require('dotenv').config();


pg.defaults.ssl = true;

const environment = process.env.NODE_ENV || 'development';

console.log('The environment is ', environment)

const migrations = {
  tableName: 'migrations',
  directory: path.normalize(path.join(__dirname, './src/migrations')),
}

const getConfigEnvironment = () => ({
  'development': {
    client: process.env.DEVELOPMENT_CLIENT,
    connection: process.env.DEVELOPMENT_DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {...migrations}
  },
  'test': {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {...migrations}
  }

})[ environment ];


module.exports = getConfigEnvironment();

