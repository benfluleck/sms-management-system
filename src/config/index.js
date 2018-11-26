require('dotenv').config();

const env =  process.env.NODE_ENV || 'development'

const config = {
  development: {
    CLIENT: process.env.DEVELOPMENT_CLIENT,
    DATABASE_URL: process.env.DEVELOPMENT_DB_URL,
  },
  test: {
    CLIENT: process.env.TEST_CLIENT,
    FILENAME: process.env.TEST_DB_FILENAME
  },
}

module.exports = { ...config[env] }
