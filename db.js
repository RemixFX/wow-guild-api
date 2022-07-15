const { Pool } = require('pg');

const pool = new Pool(
  (process.env === 'prodaction') ? {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  }
    : {
      user: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      host: 'localhost',
      port: '5432',
      database: 'discord',
    },
);

module.exports = pool;
