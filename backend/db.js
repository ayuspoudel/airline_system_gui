const { Pool } = require('pg');

const pool = new Pool({
  user: 'ayushpoudel', // Your PostgreSQL username
  host: 'localhost',   // Hostname
  database: 'airline_system', // Your database name
  password: '', // Your PostgreSQL password
  port: 5432,          // Default PostgreSQL port
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database!');
});

module.exports = pool;

